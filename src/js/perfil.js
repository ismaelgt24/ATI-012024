window.addEventListener('load', function() {
    const urlSearchParams = new URLSearchParams(window.location.search)
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

        //Insertamos el email con su respectivo enlace
        Email = document.getElementById("CorreoContacto")
        Email.appendChild(document.createTextNode(Estudiante.email))

    })


})