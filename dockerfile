#Para usar la imagen base de Ubuntu
FROM ubuntu:latest

#Actualizamos el repositorios de instalables:
RUN apt-get update

#Instalamos apache
RUN apt-get -y install apache2


#Copiamos los archivos dentro de src a la capeta correspondiente de apache
COPY ./src/ /var/www/html/

#Exponemos el puerto 80 (interno del propio Docker)
EXPOSE 80

#Ahora ejecutemos apache dentro del Ubuntu dentro del contenedor
CMD ["apache2ctl", "-D", "FOREGROUND"]

#Comando usado para generar la imagen:
#docker build --no-cache -t docker-reto08-ismaelguerrero .

#Comando usado para ejecutar el contenedor:
#docker run -p 4000:80 --name miapp-reto08 docker-reto08-ismaelguerrero

#NOTA: Se obtiene un Warning de apache pero se puede acceder al 
#sitio desde el navegador sin problemas
