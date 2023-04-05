let formularioLogin = document.getElementById("form-login");

formularioLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(formularioLogin)
    axios.post("/usuarios/login", formularioLogin)
        .then(function (response) {
                console.log(response)
                alert("Usuario autenticado correctamente")
                localStorage.setItem("jwt", response.data.token)
                location.href = "/";
        })
        .catch(function (error) {
            console.log(error)
            alert(`Código: ${error.response.data.code} \nMensaje: ${error.response.data.message}`);
        })
})



    let token = localStorage.getItem('jwt');


    let btnIniciarSesion = document.getElementById('btnIniciarSesion')
    let btnCerrarSesion = document.getElementById('btnCerrarSesion')
    let entrada = document.getElementById('entrada')
    let linkPublicacion = document.getElementById('linkPublicar')
    
    if(token){

        btnIniciarSesion.classList.add('d-none')
        btnCerrarSesion.classList.remove('d-none')
        entrada.classList.remove('d-none')
    }else{
        btnIniciarSesion.classList.remove('d-none')
        btnCerrarSesion.classList.add('d-none')
        entrada.classList.add('d-none')

    }



    btnCerrarSesion.addEventListener("click", (event) => {
        alert('Ha cerrado cesión correctamente')
        localStorage.clear();
        location.href = "/";
    })
  

    linkPublicacion.addEventListener("click", (event) => {
        event.preventDefault();
        if(token){
            location.href = "/publicacion?token="+token
        }else{
            alert("Debe iniciar cesión para poder añadir una entrada al blog")
        }
    })
