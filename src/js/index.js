//Definimos una funcion para crear un elemento perfil dado un objeto json
var crearPerfil = a => {
    //Creamos un div y  lo establecemos en la clase perfil:

    var perfil = document.createElement("div")
    perfil.setAttribute("class","perfil")

    //Armamos la imagen que va dentro del perfil
    var imagenPerfil = document.createElement("img")
    imagenPerfil.setAttribute("class","fotografia")
    imagenPerfil.setAttribute("src",a.imagen)
    imagenPerfil.setAttribute("height","100")

    //Armamos el nombre del perfil
    var nombrePerfil = document.createElement("p")
    var nombreContent = contenido = document.createTextNode(a.nombre)
    nombrePerfil.appendChild(nombreContent)

    //Armado del perfil completo
    perfil.appendChild(imagenPerfil)
    perfil.appendChild(nombrePerfil)

    //Colocamos el perfil creado como adentro de un enlace a perfil pasando la ci como parametro:
    //buscamos el idioma pasado por URLparams y colocamos el contenido del sitio:
    const urlSearchParams = new URLSearchParams(window.location.search)
    const lang = urlSearchParams.get("lang") || "es"//Usaremos este parametro para pasar el idioma ya que es el estandar
    console.log("AQUIII"+lang)
    var link = document.createElement("a")
    link.setAttribute("href",`perfil.html?ci=${a.ci}&lang=${lang}`)
    link.appendChild(perfil)
    return link;
}

//Funcion para llenar la grilla dada un arreglo de objetos:
var llenarGrilla = Arr => {
    //Seleccionamos la seccion dde la grilla
    var listadoPerfiles = document.getElementsByClassName("main")[0];
    var perfiles = Arr.map(crearPerfil)
    //Agregamos todos los perfiles armados:
    perfiles.forEach( perfil => {
        listadoPerfiles.appendChild(perfil);
    });
}
//Funcion para colocar el contenido de los elementos del sitio segun el idioma pasado por parametros
var actualizarIdioma = lang => {

    switch(lang){
        case "ES"://Idioma Español
            fetch("reto5\\conf\\configES.json")
            .then(Lectura => Lectura.json())
            .then(Contenido => {

                //Acomodamos el nombre de la materia:
                materia = document.getElementsByClassName("materia")[0]
                materia.innerHTML = `<li> ${Contenido.sitio[0]}<sub>${Contenido.sitio[1]}</sub> ${Contenido.sitio[2]}</li>`

                //Acomodamos el saludo
                saludo = document.getElementsByClassName("saludo")[0]
                liSaludo = document.createElement("li")
                liSaludo.appendChild(document.createTextNode(Contenido.saludo+" Ismael Guerrero"))
                saludo.appendChild(liSaludo)
                //Acomodamos del boton de la barra de busqueda
                botonBuscar = document.getElementById("botonBusqueda")
                botonBuscar.appendChild(document.createTextNode(Contenido.buscar))

                //Acomodamos el boton de l abarra de busqueda
                barraBusqueda = document.getElementById("barraDeBusqueda")
                barraBusqueda.setAttribute("placeholder",Contenido.nombre)
                //Acomodamos el footer
                myFooter = document.getElementById("copyRight")
                myFooter.appendChild(document.createTextNode(Contenido.copyRight))
            })
            break;
        case "EN"://Idioma ingles
            fetch("reto5\\conf\\configEN.json")
            .then(Lectura => Lectura.json())
            .then(Contenido => {

                //Acomodamos el nombre de la materia:
                materia = document.getElementsByClassName("materia")[0]
                materia.innerHTML = `<li> ${Contenido.sitio[0]}<sub>${Contenido.sitio[1]}</sub> ${Contenido.sitio[2]}</li>`

                //Acomodamos el saludo
                saludo = document.getElementsByClassName("saludo")[0]
                liSaludo = document.createElement("li")
                liSaludo.appendChild(document.createTextNode(Contenido.saludo+" Ismael Guerrero"))
                saludo.appendChild(liSaludo)
                //Acomodamos del boton de la barra de busqueda
                botonBuscar = document.getElementById("botonBusqueda")
                botonBuscar.appendChild(document.createTextNode(Contenido.buscar))

                //Acomodamos el boton de l abarra de busqueda
                barraBusqueda = document.getElementById("barraDeBusqueda")
                barraBusqueda.setAttribute("placeholder",Contenido.nombre)
                //Acomodamos el footer
                myFooter = document.getElementById("copyRight")
                myFooter.appendChild(document.createTextNode(Contenido.copyRight))
            })
            break;
        case "PT"://Idioma Portugues (Brazil)
            fetch("reto5\\conf\\configPT.json")
            .then(Lectura => Lectura.json())
            .then(Contenido => {

                //Acomodamos el nombre de la materia:
                materia = document.getElementsByClassName("materia")[0]
                materia.innerHTML = `<li> ${Contenido.sitio[0]}<sub>${Contenido.sitio[1]}</sub> ${Contenido.sitio[2]}</li>`

                //Acomodamos el saludo
                saludo = document.getElementsByClassName("saludo")[0]
                liSaludo = document.createElement("li")
                liSaludo.appendChild(document.createTextNode(Contenido.saludo+" Ismael Guerrero"))
                saludo.appendChild(liSaludo)
                //Acomodamos del boton de la barra de busqueda
                botonBuscar = document.getElementById("botonBusqueda")
                botonBuscar.appendChild(document.createTextNode(Contenido.buscar))

                //Acomodamos el boton de l abarra de busqueda
                barraBusqueda = document.getElementById("barraDeBusqueda")
                barraBusqueda.setAttribute("placeholder",Contenido.nombre)
                //Acomodamos el footer
                myFooter = document.getElementById("copyRight")
                myFooter.appendChild(document.createTextNode(Contenido.copyRight))
            })
            break;
    }
}

//Con el uso de este evento pemitimos que el codigo se ejecute despues de que el sitio haya cargado completamente
window.addEventListener('load', function() {
    //buscamos el idioma pasado por URLparams y colocamos el contenido del sitio:
    const urlSearchParams = new URLSearchParams(window.location.search)
    const lang = urlSearchParams.get("lang") || "ES"//Usaremos este parametro para pasar el idioma ya que es el estandar
    console.log("AQUIIIIIIII"+lang)
    //actualizarIdioma(lang.toUpperCase())

    //Captamos los objetos en el archivo index.json y llenamos la grilla con los objetos presentes en el:
    fetch("reto5\\datos\\index.json")
    .then(Lectura => Lectura.json())//Los convertimos en objetos
    .then( Alumnos => {
        //llenarGrilla(Alumnos)
    })
    .catch(error => console.error('Hubo un error cargando el archivo index.json', error));

    //Esta funcion se ejecuta al presionar el boton buscar
    //Esta funcion lista a todos los estudiantes cuyo nombres contienen la cadena escrita.
    //Si no se insertado nada se listaran todos los alumnos:
    busquedaBoton = () => {
        //Leemos el archivo JSON de nuevo
        fetch("reto5\\datos\\index.json")
        .then(Lectura => Lectura.json())//Los convertimos en objetos
        .then( Alumnos => {
            //Una vez con la lista completa de nuevo:
            //Eliminamos todos los nodos de la grilla "Main" para llenarlos de nuevo de forma filtrada:
            listadoPerfiles = document.getElementsByClassName("main")[0];
            while(listadoPerfiles.firstChild){
                listadoPerfiles.removeChild(listadoPerfiles.firstChild)
            }

            //Leemos el nombre insertado en la barra de busqueda:
            s = document.getElementById("barraDeBusqueda").value

            //Si la cadena no esta vacia:
            if(s.length){

                //Filtramos:
                newAlumnos = Alumnos.filter(a => a.nombre.toLowerCase().includes(s.toLowerCase()))
                //console.log(Alumnos)

                if(newAlumnos.length){
                    llenarGrilla(newAlumnos)

                }else{
                    //Si no hay coincidencias imprimimos la salida, como se solicita:
                    let textoNadie = document.createTextNode('No hay alumnos que tengan en su nombre: '+s)
                    let mensajeNadie = document.createElement("p")
                    mensajeNadie.setAttribute("id","mensajeErrorBusqueda")
                    mensajeNadie.appendChild(textoNadie)
                    listadoPerfiles.appendChild(mensajeNadie)
                }

            }else{

                //Si la cadena esta vacia, rearmamos la grilla completa:
                llenarGrilla(Alumnos)
            }
        })
    }

  });