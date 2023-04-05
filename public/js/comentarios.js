const textarea = document.getElementById('comentarioCuerpo');
const contador = document.getElementById('cuerpoContador');

textarea.addEventListener('input', function(e) {
    const target = e.target;
    const longitudMax = target.getAttribute('maxlength');
    const longitudAct = target.value.length;
    contador.innerHTML = `${longitudAct}/${longitudMax}`;
});

let idEntrada = document.getElementById('idEntrada').textContent
let formularioComentario = document.getElementById('comentarioForm')

formularioComentario.addEventListener("submit", (event) => {
    event.preventDefault();
    axios.post('/usuarios/comentar?entrada='+idEntrada+'&token='+token, formularioComentario)
        .then(function (response) {
                console.log(response)
                alert("Nuevo comentario ingresado correctamente")
                formularioComentario.reset()
        })
        .catch(function (error) {
            console.log(error)
            alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
        })
})

let comentarios = document.getElementsByClassName('comentarios')
document.getElementById('contadorComentarios').innerText = comentarios.length



let btn1 = document.querySelector('#green');
let btn2 = document.querySelector('#red');
let react

btn1.addEventListener('click', function() {

    react={obs: "like"}

    if (btn2.classList.contains('red')) {
        btn2.classList.remove('red');
    } 
    this.classList.toggle('green');

    axios.post('/usuarios/reaccion?entrada='+idEntrada+'&token='+token, react)
        .then(function (response) {
                console.log(response)
                alert("Hemos registrado tu reaccion")
        })
        .catch(function (error) {
            console.log(error)
            alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
        })
    
});


btn2.addEventListener('click', function() {
  
    react={obs: "dislike"}

    if (btn1.classList.contains('green')) {
        btn1.classList.remove('green');
    } 
    this.classList.toggle('red');

    axios.post('/usuarios/reaccion?entrada='+idEntrada+'&token='+token, react)
        .then(function (response) {
                console.log(response)
                alert("Hemos registrado tu reaccion")
        })
        .catch(function (error) {
            console.log(error)
            alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
        })
    
});


/* axios.get('/reacciones?entrada='+idEntrada)
    .then(function (response) {     
          console.log(response)     
    })
    .catch(function (error) {
       alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
    });

function cargarTabla(data){

} */