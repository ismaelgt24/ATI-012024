import os
import json
from urllib.parse import parse_qs
from jinja2 import Environment, FileSystemLoader
from wsgiref.simple_server import make_server

# Ruta base del proyecto, esta es la ubicacion raiz del programa en ejecucion:
RutaActual = os.path.dirname(os.path.abspath(__file__))


def application(environ, start_response):
    # Rutas de archivos a servir para las posibles peticiones
    #en la ejecucion del codigo del sitio:
    FicherosSRC = {
        '/css/style.css': 'css/style.css',  # Hojas de estilo
        '/js/index.js': 'js/index.js',      # Script de index.js
        '/reto5/datos/index.json':'reto5/datos/index.json',# Archivo con los estudiantes de la grilla

        #imagenes presentes en index.json:
        '/reto5/28073233/28073233.jpg':'reto5/28073233/28073233.jpg',
        "/reto5/19371273/19371273.jpg":"reto5/19371273/19371273.jpg",
        "/reto5/18829705/18829705.jpg":"reto5/18829705/18829705.jpg",
        "/reto5/18819509/18819509.jpg":"reto5/18819509/18819509.jpg",
        "/reto5/14444733/14444733.jpg":"reto5/14444733/14444733.jpg",
        "/reto5/18443368/18443368.jpg":"reto5/18443368/18443368.jpg",
        "/reto5/19267152/19267152.jpg":"reto5/19267152/19267152.jpg",
        "/reto5/18487832/18487832.jpg":"reto5/18487832/18487832.jpg",
        "/reto5/20117857/20117857.PNG":"reto5/20117857/20117857.PNG",
        "/reto5/19558625/19558625.jpg":"reto5/19558625/19558625.jpg",
        "/reto5/19932730/19932730.jpg":"reto5/19932730/19932730.jpg",
        "/reto5/18009154/18009154.JPG":"reto5/18009154/18009154.JPG",
        "/reto5/18110561/18110561.jpg":"reto5/18110561/18110561.jpg",
        "/reto5/19334139/19334139.jpg":"reto5/19334139/19334139.jpg",
        "/reto5/13852255/13852255.png":"reto5/13852255/13852255.png",
        "/reto5/19499302/19499302.jpg":"reto5/19499302/19499302.jpg",
        "/reto5/19395391/19395391.png":"reto5/19395391/19395391.png",
        "/reto5/18002106/18002106.jpg":"reto5/18002106/18002106.jpg",
        "/reto5/19379860/19379860.jpg":"reto5/19379860/19379860.jpg",
        "/reto5/18938455/18938455.jpg":"reto5/18938455/18938455.jpg",
        "/reto5/18836874/18836874.jpg":"reto5/18836874/18836874.jpg"
    }

    # Obtener la ruta solicitada
    rutaSolicitudHTTP = environ.get('PATH_INFO', '/')

    # Verificar si la ruta solicitada es un archivo estático conocido
    if rutaSolicitudHTTP in FicherosSRC:
        RutaArchivoSolicitado = os.path.join(RutaActual, FicherosSRC[rutaSolicitudHTTP])

        # Verificar que el archivo exista antes de intentar leerlo
        if os.path.isfile(RutaArchivoSolicitado):
            # Abrir y leer el archivo estático
            with open(RutaArchivoSolicitado, 'rb') as file:
                content = file.read()

            # Determinar el tipo MIME basado en la extensión del archivo solicitado:
            if rutaSolicitudHTTP.endswith('.css'):
                content_type = 'text/css' 
            elif rutaSolicitudHTTP.endswith('.js'):
                content_type = 'application/javascript'
            elif rutaSolicitudHTTP.lower().endswith('.jpg'):
                content_type = 'image/jpeg'
            elif rutaSolicitudHTTP.lower().endswith('.png'):
                content_type = 'image/png'
            elif rutaSolicitudHTTP.lower().endswith('.json'):
                content_type = 'application/json'

            # Configurar encabezados de respuesta
            Estado = '200 OK'
            cabecera = [('Content-Type', content_type)]
            start_response(Estado, cabecera)

            # Devolver el contenido del archivo estático
            return [content]
        
        #Si el archivo solicitado no existe se debe retornar una respuesta con el codigo 404:
        else:
            
            Estado = '404 Not Found'
            cabecera = [('Content-Type', 'text/plain')]
            start_response(Estado, cabecera)
            return [b'Archivo no encontrado']

    # Si la ruta solicitada no es un archivo estático, servir el HTML principal de la plantilla index.html
    else:   

        #Consultemos el idioma del sitio
        URLParams = environ.get('QUERY_STRING', '')#String con los URL params
        #print(URLParams)

        #Pasamos a un diccionario:
        params = parse_qs(URLParams)
        #print(params)

        #Consultamos el lenguaje:
        lang = params.get('lang', ['es'])[0]  # Por defecto 'es' si no se proporciona
        #print(lang)

        # Leer el archivo de config de idioma:
        with open(os.path.join(RutaActual,'reto5','conf','config{0}.json'.format(lang.upper())), 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Leer el archivo index.json:
        with open(os.path.join(RutaActual,'reto5','datos','index.json'.format(lang.upper())), 'r', encoding='utf-8') as file:
            dataIndex = json.load(file)

        #Colocamos los datos de la grilla como un campo mas en los archivos de idiomas
        #para llenar todo en una sola plantilla:
        data['grilla'] = dataIndex

        # Este es un cargador de archivos para poder usar la nueva plantilla Index.html
        #Como plantilla y no como un hypertexto normal.
        plantillaLoader = Environment(loader=FileSystemLoader(RutaActual))
        #Llenamos la plantilla del index:
        template = plantillaLoader.get_template('index.html')
        response_body = template.render(data)
        
        # Retornamos una respuesta exitosa!
        Estado = '200 OK'
        cabecera = [('Content-Type', 'text/html; charset=utf-8')]
        start_response(Estado, cabecera)
        
        # La función debe devolver una lista de bytes
        return [response_body.encode('utf-8')]


#Esto es para probar el archivo fuera de Docker!!
#Se ejecuta el script y entramos a: http://localhost:8000/?lang=en
if __name__ == '__main__':
    # Crear el servidor WSGI en el puerto 8000
    with make_server('', 8000, application) as server:
        print("Sirviendo en el puerto 8000...")
        # Ejecutar el servidor indefinidamente
        server.serve_forever()