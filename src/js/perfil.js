//Funcion para colocar el contenido de los elementos del sitio segun el idioma pasado por parametros
var actualizarIdioma = lang => {

    switch(lang){
        case "ES"://Idioma Español
            fetch("reto5\\conf\\configES.json")
            .then(Lectura => Lectura.json())
            .then(Contenido => {

                //Insertamos los titulos de las preserencias
                Preferencias = document.getElementById("TitulosPreferencias")
                Preferencias.innerHTML = `${Contenido.color}<br>${Contenido.libro}<br>${Contenido.musica}<br>${Contenido.video_juego}<br>${Contenido.lenguajes}<br>`

                //Acomodamos el mensaje de contacto:
                contacto = document.getElementsByClassName("micorreo")[0]
                contacto.appendChild(document.createTextNode(Contenido.email))
            })
            break;
        case "EN"://Idioma ingles
            fetch("reto5\\conf\\configEN.json")
            .then(Lectura => Lectura.json())
            .then(Contenido => {

                //Insertamos los titulos de las preserencias
                Preferencias = document.getElementById("TitulosPreferencias")
                Preferencias.innerHTML = `${Contenido.color}<br>${Contenido.libro}<br>${Contenido.musica}<br>${Contenido.video_juego}<br>${Contenido.lenguajes}<br>`

                //Acomodamos el mensaje de contacto:
                contacto = document.getElementsByClassName("micorreo")[0]
                contacto.appendChild(document.createTextNode(Contenido.email))
            })
            break;
        case "PT"://Idioma Portugues (Brazil)
            fetch("reto5\\conf\\configPT.json")
            .then(Lectura => Lectura.json())
            .then(Contenido => {

                //Insertamos los titulos de las preserencias
                Preferencias = document.getElementById("TitulosPreferencias")
                Preferencias.innerHTML = `${Contenido.color}<br>${Contenido.libro}<br>${Contenido.musica}<br>${Contenido.video_juego}<br>${Contenido.lenguajes}<br>`

                //Acomodamos el mensaje de contacto:
                contacto = document.getElementsByClassName("micorreo")[0]
                contacto.appendChild(document.createTextNode(Contenido.email))
            })
            break;
    }
}

window.addEventListener('load', function() {

    const urlSearchParams = new URLSearchParams(window.location.search)

    //buscamos el idioma pasado por URLparams y colocamos el contenido del sitio:
    const lang = urlSearchParams.get("lang") || "es"//Usaremos este parametro para pasar el idioma ya que es el estandar
    console.log(lang)
    console.log(lang)
    actualizarIdioma(lang)

    const estudianteCI = urlSearchParams.get("ci")

    console.log(estudianteCI)

    fetch(`reto5\\${estudianteCI}\\perfil.json`)
    .then(Estudiante => Estudiante.json())
    .then(Estudiante => {

        //Insertamos la imagen con la ruta de index.json
        fetch("reto5\\datos\\index.json")
        .then(Lectura => Lectura.json())
        .then( Alumnos => {
            Foto = document.getElementsByClassName("MiFoto")[0]
            urlFoto = Alumnos.find(A => A.ci==estudianteCI).imagen
            console.log(urlFoto)
            Foto.setAttribute("src",urlFoto)
        })

        //Insertamos el nombre
        Nombre = document.getElementsByClassName("miNombre")[0] 
        Nombre.appendChild(document.createTextNode(Estudiante.nombre))

        //Insertamos la descripcion
        Descripcion = document.getElementsByClassName("descripcion")[0] 
        Descripcion.appendChild(document.createTextNode(Estudiante.descripcion))

        //Insertamos las preserencias
        Preferencias = document.getElementById("ContenidoPreferencias")
        Preferencias.innerHTML = `${Estudiante.color}<br>${Estudiante.libro}<br>${Estudiante.musica}<br>${Estudiante.video_juego}<br>${Estudiante.lenguajes}<br>`

        //Insertamos en el mensaje de contacto
        //el email con su respectivo enlace
        contacto = document.getElementsByClassName("micorreo")[0]
        //console.log(contacto.innerHTML)
        contacto.innerHTML = contacto.innerHTML.replace("[email]",`<a id="CorreoContacto" href="#">${Estudiante.email}</a>`)
        //console.log(contacto.innerHTML)
    })


})