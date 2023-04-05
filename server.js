const express = require('express');
const cors = require('cors');
const {create} = require('express-handlebars');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

require('dotenv').config();
const {addUser, buscaMail, buscaUser, autenticador, verificarToken, publicar, nuevaEntrada, vistaHome, detalleEntrada, nuevoComentario, 
    filtroNoticias, filtroNoticiasCat, filtroCategorias} = require('./db')

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "La imágen que está subiendo sobrepasa los 5mb permitidos."
}));
app.use(cors());
app.use('/public', express.static('public'));

//configuracion de handlebars

const hbs = create({
	partialsDir: [
		"views/partials/",
	],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`ESCUCHANDO EN PUERTO: ${PORT}`));


app.get('/', vistaHome, (req, res)=> {});

app.get('/entrada/:serie', detalleEntrada, (req, res)=> {});

app.get('/registro', (req, res)=> {
    res.render("registro");
});

app.get('/archivo', (req, res)=> {
    res.render("archivo");
});

app.get('/publicacion', verificarToken, publicar, (req, res)=> {});

app.post('/usuarios/registro', buscaMail, addUser, (req, res) => {})
  
app.post('/usuarios/login', buscaUser, autenticador, (req, res) => {})

app.post('/usuarios/publicar', nuevaEntrada, (req, res) => {})

app.post('/usuarios/comentar', verificarToken, nuevoComentario, (req, res) => {})

app.get('/buscador', filtroNoticias, (req, res)=> {});

app.get('/archivo/:categoria', filtroNoticiasCat, (req, res)=> {});

app.get('/buscador/categorias', filtroCategorias, (req, res)=> {});

app.post('/usuarios/reaccion', verificarToken, nuevoComentario, (req, res) => {})

app.all("*", (req, res) => {
    res.status(404).send("<p>Ruta no existe <a href='/'>Volver al Home</a></p>")
})