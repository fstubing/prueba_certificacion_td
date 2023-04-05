// LOGICA PARA DESPLEGAR INFORMACIÓN DE LA BASE DE DATOS

let btnSiguiente = document.getElementById("btnSiguiente");
btnSiguiente.addEventListener("click", (event) => {
    let categoria = document.getElementById('categoriaNombre').textContent
    let limitOrden = document.getElementById('optionOrden').value

    axios.get(`/buscador/categorias?categoria=${categoria}&orden=${limitOrden}`)
    .then(function (response) {     
           cargarTabla(response.data.noticiasRender)     
    })
    .catch(function (error) {
       alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
    });
})


function cargarTabla(data){

    let arrayNoticias = data
    
    let template = "";
    arrayNoticias.forEach(noticia => {        
        template += `
        <tr>
            <td>${noticia.titulo}</td>
            <td>${noticia.autor}</td>
            <td>${noticia.fecha_creacion.slice(0,10)}</td>
            <td>${noticia.nombre}</td>
            <td><a href="/entrada/${noticia.id}" class="btn btn-success">Ver</a></td>
        </tr>
        `
    });

    document.querySelector("#receptorFilas").innerHTML= template;
}