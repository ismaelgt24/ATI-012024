#Para usar la imagen base de Ubuntu
FROM ubuntu:latest

#Actualizamos el repositorios de instalables:
RUN apt-get update

#Instalamos apache
RUN apt-get -y install apache2

#RUN apt-get install vim


#Instalamos la liberia para llenar las plantillas en python:
RUN apt-get install -y python3-jinja2

#Copiamos los archivos dentro de src a la capeta correspondiente de apache
COPY ./src/ /var/www/html/

#Exponemos el puerto 80 (interno del propio Docker)
EXPOSE 80

RUN apt install apache2 apache2-utils ssl-cert libapache2-mod-wsgi-py3 -y

RUN /etc/init.d/apache2 restart

#RUN cd /etc/apache2/conf-available/

RUN touch /etc/apache2/conf-available/mod-wsgi.conf

#El archivo myConf.conf es el mismo archivo de la configuracion de wsgi pero
#con la especificacion de los alias, hacemos esto para poder anexar esta tarea 
#en la construccion de la imagen:
COPY conf/myConf.conf /etc/apache2/conf-available/mod-wsgi.conf

#Fijamos los cambios con el nuevo Alias:
RUN a2enconf mod-wsgi.conf

#RUN service apache2 reload

#Ahora ejecutemos apache dentro del Ubuntu dentro del contenedor
CMD ["apache2ctl", "-D", "FOREGROUND"]

#Comando usado para generar la imagen:
#docker build --no-cache -t docker-reto08-ismaelguerrero .

#Comando usado para ejecutar el contenedor:
#docker build -t contenedor_ismaelguerrero_2 .
#docker run -d -p 8000:80 --name contenedor_ismaelguerrero_lab_2 contenedor_ismaelguerrero_2

#NOTA: Aveces se obtiene un Warning de apache pero se puede acceder al 
#sitio desde el navegador sin problemas