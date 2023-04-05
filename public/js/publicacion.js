const textarea = document.getElementById('entradaCuerpo');
const contador = document.getElementById('cuerpoContador');

textarea.addEventListener('input', function(e) {
    const target = e.target;
    const longitudMax = target.getAttribute('maxlength');
    const longitudAct = target.value.length;
    contador.innerHTML = `${longitudAct}/${longitudMax}`;
});

let formularioEntrada = document.getElementById("form-entrada");
let entradaUserId = formularioEntrada[0].value;
let entradaUserNombre = formularioEntrada[1].value
let entradaUserAvatar = formularioEntrada[2].value
let entradaCategoria = formularioEntrada[3].value
let entradaTitulo = formularioEntrada[4].value
let entradaCuerpo = formularioEntrada[5].value

formularioEntrada.addEventListener("submit", (event) => {
    event.preventDefault();
    axios.post('/usuarios/publicar?user='+entradaUserId, formularioEntrada)
        .then(function (response) {
                console.log(response)
                alert("Nueva Entrada creada correctamente")
                formularioEntrada.reset()
        })
        .catch(function (error) {
            console.log(error)
            alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
        })
})