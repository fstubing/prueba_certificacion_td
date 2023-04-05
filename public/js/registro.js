let formulario = document.getElementById("registroForm");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(formulario)
    axios.post("/usuarios/registro", formulario)
        .then(function (response) {
            if(response.data.code != 201){
                console.log(response.data.message)
                alert(response.data.message)
            }else {
                alert("Usuario creado correctamente.")
            }
        })
        .catch(function (error) {
            console.log(error)
            alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
        })
        .then(function (){
            location.reload()
         });
})
