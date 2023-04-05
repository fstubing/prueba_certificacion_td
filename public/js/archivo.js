// LOGICA PARA DESPLEGAR INFORMACIÓN DE LA BASE DE DATOS

let btnSiguiente = document.getElementById("btnSiguiente");
btnSiguiente.addEventListener("click", (event) => {
    let limitCategoria = document.getElementById('optionCategoria').value
    let limitOrden = document.getElementById('optionOrden').value

    console.log(limitCategoria, limitOrden)

    axios.get(`/buscador?categoria=${limitCategoria}&orden=${limitOrden}`)
    .then(function (response) {     
            console.log(response.data)  
           cargarTabla(response.data.noticiasRender)     
    })
    .catch(function (error) {
       alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
    });
})


function cargarTabla(data){
    console.log(data)

    let arrayNoticias = data
    
    let template = "";
    arrayNoticias.forEach(noticia => {        
        template += `
        <tr>
            <td>${noticia.titulo}</td>
            <td>${noticia.autor}</td>
            <td>${noticia.fecha_creacion}</td>
            <td>${noticia.nombre}</td>
            <td><a href="entrada/${noticia.id}" class="btn btn-success">Ver</a></td>
        </tr>
        `
    });

    document.querySelector("#receptorFilas").innerHTML= template;
}