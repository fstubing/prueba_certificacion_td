const { Pool, Query }= require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const privateKey = process.env.PRIVATE_KEY || '1A2b3C4d'

moment.locale("ES");
require('dotenv').config(); 

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_DATABASE || 'test_td',
    password: process.env.DB_PASSWORD || '1234',
    port: process.env.DB_PORT || 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 1000
});


const update = {
    text:'UPDATE tabla SET campo = $1 WHERE id = $2 RETURNING *',
    values: []
};

const insertUsuario = {
    text:'INSERT INTO usuarios (nombre, apellido, email, fecha_nacimiento, genero, avatar, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values: []
};

const selectEmail = {
    text: "SELECT id, nombre, apellido, email, avatar FROM usuarios WHERE email = $1",
    values: []
};

const selectUserById = {
    text: "SELECT id, nombre, apellido, email, avatar FROM usuarios WHERE id = $1",
    values: []
};

const selectPassword = {
    text: "SELECT password FROM usuarios WHERE email = $1",
    values: []
};

const insertEntrada = {
    text:'INSERT INTO entradas (titulo, cuerpo, autor, imagen_entrada, imagen_autor, fecha_creacion, categoria_id, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: []
};

const selectAllEntradas = {
    text: "SELECT * FROM entradas ORDER BY fecha_creacion"
};

const selectEntradaById = {
    text: "select en.id, en.titulo, en.cuerpo, en.autor, en.imagen_entrada, en.imagen_autor, en.fecha_creacion, ca.nombre from entradas en join categorias ca on ca.id = en.categoria_id where en.id = $1",
    values: []
};

const insertComentario = {
    text:'INSERT INTO comentarios (contenido, fecha_creacion, entrada_id, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
    values: []
};

const selectComentariosConUsuariosData = {
    text: 'SELECT co.id, co.contenido, co.fecha_creacion, co.usuario_id, us.nombre, us.apellido, us.avatar FROM comentarios co JOIN usuarios us ON us.id = co.usuario_id WHERE co.entrada_id = $1 ORDER BY co.fecha_creacion DESC',
    values: []
}

const selectAllNoticiasAsc = {
    text: 'SELECT en.id, en.titulo, en.autor, en.fecha_creacion, ca.nombre FROM entradas en JOIN categorias ca ON ca.id = en.categoria_id ORDER BY en.fecha_creacion ASC' ,
}

const selectAllNoticiasDesc = {
    text: 'SELECT en.id, en.titulo, en.autor, en.fecha_creacion, ca.nombre FROM entradas en JOIN categorias ca ON ca.id = en.categoria_id ORDER BY en.fecha_creacion DESC' ,
}

const selectCategoriaNoticiasAsc = {
    text: 'SELECT en.id, en.titulo, en.autor, en.fecha_creacion, ca.nombre FROM entradas en JOIN categorias ca ON ca.id = en.categoria_id WHERE en.categoria_id = $1 ORDER BY en.fecha_creacion ASC' ,
    values: []
}

const selectCategoriaNoticiasDesc = {
    text: 'SELECT en.id, en.titulo, en.autor, en.fecha_creacion, ca.nombre FROM entradas en JOIN categorias ca ON ca.id = en.categoria_id WHERE en.categoria_id = $1 ORDER BY en.fecha_creacion DESC' ,
    values: []
}

const insertReacion = {
    text:'INSERT INTO reacciones (reaccion, fecha_creacion, entrada_id, usuario_id) VALUES ($1, $2, $3, $4) RETURNING *',
    values: []
};


const buscaMail = async (req, res, next) => {
    try {
        selectEmail.values= [req.body.emailRegistro]
        console.log(selectEmail)
        let email = await pool.query(selectEmail)
        if(email.rowCount == 0) {
            next()
        } else {
            return res.status(400).json({code:400, message: 'Email está registrado. Debe proporcionar otro distinto'})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No fue posible finalizar proceso de registro'})
    }
}


const addUser = async (req, res) => {
    try {

        let {nombreRegistro, apellidoRegistro, emailRegistro, nacimientoRegistro, generoRegistro, claveRegistro} = req.body;
        let nombreImgAvatar
        let foto
        if(req.files == null) {
            nombreImgAvatar = 'user_default.png'
        } else {
            foto = req.files.avatarRegistro
            let mimetype = foto.mimetype.split("/")[0];
            if(mimetype != "image") return res.status(400).json({code: 400, message: "El archivo subido no corresponde a una imagen"})

            nombreImgAvatar = `${uuidv4().slice(0,6)}-${foto.name}`
            let rutaPath = path.resolve(__dirname, "./public/img/"+nombreImgAvatar)
            foto.mv(rutaPath, function(err) {
                if (err) {
                return res.status(500).json({code: 500, message:"No se pudo guardar la imagen del avatar"});
                }
            });
        }

        const hashedPassword = await bcrypt.hash(claveRegistro, 10)

        insertUsuario.values = [nombreRegistro, apellidoRegistro, emailRegistro, nacimientoRegistro, generoRegistro, nombreImgAvatar, hashedPassword]
        let nuevoUsuario = await pool.query(insertUsuario)

        if(nuevoUsuario.name == 'Error') {
            return res.status(500).json({code:500, message: 'No se pudo crear usuario correctamente'})
        } else if(nuevoUsuario.rowCount==0){
            return res.status(400).json({code:400, message: 'No se pudo crear usuario correctamente'})
        }else {
            return res.status(201).json({code: 201, message: 'Usuario creado exitosamente'});
        }
             
    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No se pudo crear usuario correctamente'})
    }
}


const buscaUser = async (req, res, next) => {
    try {
        selectEmail.values= [req.body.loginUsuario]
        console.log(selectEmail)
        let email = await pool.query(selectEmail)
        if(email.rowCount == 0) {
            return res.status(401).json({code:401, message: 'Datos de autenticación no son correctos'})
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No fue posible finalizar proceso de autenticación'})
    }
}


const autenticador = async (req, res) => {
    try {
        let usuario = req.body.loginUsuario
        selectPassword.values =[usuario]
        let passwordHasheado = await pool.query(selectPassword)
        console.log(passwordHasheado.rows[0])
        if(await bcrypt.compare(req.body.loginPassword, passwordHasheado.rows[0].password)) {
            let tokenKey
            jwt.sign({usuario}, privateKey, (err, token) => {
                if(err){
                    res.status(500).json({code: 500, message: "Error interno del servidor"})
                }else{
                    tokenKey = token;
                    res.status(200).json({code: 200, token: tokenKey})
                }
            })
        } else {
            return res.status(401).json({code:401, message: 'Datos de autenticación no son correctos'})
          }
         
    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No fue posible finalizar proceso de autenticación'})
    }
}

const verificarToken = (req, res, next) => {

    let token;
    let tokenQuery = req.query.token;
    if(tokenQuery) token = tokenQuery;
    let tokenHeader = req.headers['authorization'];
    console.log(req.headers)
    if(tokenHeader){
        tokenHeader = tokenHeader.split(" ");
        tokenHeader = tokenHeader[1];
        token = tokenHeader;
    }
    if(token){
        jwt.verify(token, privateKey, (error, data) => {
            if(error) return res.status(401).json({code:401, message:"Token no válido"})
            req.usuario = data.usuario
            next();
        })
    }else{
        return res.status(401).json({code:401, message:"Debe proporcionar un token"})
    }
}

const publicar = async (req, res) => {
    try {
        selectEmail.values= [req.usuario]
        let usuario = await pool.query(selectEmail)
        let userRender = usuario.rows[0]
        if(usuario.rowCount == 0){
            res.status(500).render("publicacion",{
                error: "Se ha generado un error que no permite cargar los datos de la vista"
            })
        }
        res.render("publicacion",{userRender})
    } catch (error) {
        res.status(500).render("publicacion",{
            error: "Se ha generado un error que no permite cargar los datos de la vista"
        })
    }
} 

const nuevaEntrada = async (req, res) => {
    try {
        let {entradaUserId, entradaUserNombre, entradaUserAvatar, entradaCategoria, entradaTitulo, entradaCuerpo} = req.body;
        let {user} = req.query
        let userId = parseInt(user)
        selectUserById.values = [userId]
        let searchUser = await pool.query(selectUserById)
        let userData = searchUser.rows[0]
        let userName = `${userData.nombre} ${userData.apellido}`

        let fecha = new Date()

        let nombreImg
        let foto = req.files.entradaImagen
        let mimetype = foto.mimetype.split("/")[0];
        if(mimetype != "image") return res.status(400).json({code: 400, message: "El archivo subido no corresponde a una imagen"})
        nombreImg = `${uuidv4().slice(0,6)}-${foto.name}`
        let rutaPath = path.resolve(__dirname, "./public/img/"+nombreImg)
        foto.mv(rutaPath, function(err) {
            if (err) {
                return res.status(500).json({code: 500, message:"No se pudo guardar la imagen del avatar"});
            }
        });

        insertEntrada.values = [entradaTitulo, entradaCuerpo, userName, nombreImg, entradaUserAvatar, fecha, entradaCategoria, userData.id]
        let nuevaEntrada = await pool.query(insertEntrada)

        if(nuevaEntrada.name == 'Error') {
            return res.status(500).json({code:500, message: 'No se pudo crear Entrada correctamente'})
        } else if(nuevaEntrada.rowCount==0){
            return res.status(400).json({code:400, message: 'No se pudo crear Entrada correctamente'})
        }else {
            return res.status(201).json({code: 201, message: 'Entrada creada exitosamente'});
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No se pudo crear usuario correctamente'})
    }
}

const vistaHome = async (req, res) => {
    try {
        let entradas = await pool.query(selectAllEntradas)
        let entradasRender = entradas.rows
        if(entradas.rowCount == 0){
            res.status(500).render("home",{
                error: "Se ha generado un error que no permite cargar los datos de la vista"
            })
        }
        res.render("home",{
            entradasRender,
            helpers: {
                fecha(data){
                    return moment(data).format('DD/MM/YYYY')
                }
            }

        })
    } catch (error) {
        res.status(500).render("home",{
            error: "Se ha generado un error que no permite cargar los datos de la vista"
        })
    }
}

const detalleEntrada = async (req, res) => {
    try {
        selectEntradaById.values = [req.params.serie]
        let serie = await pool.query(selectEntradaById)
        let serieRender = [serie.rows[0]]
        
        if(serie.rowCount == 0){
            res.status(404).render("entrada",{
                error: "No existe la página que está intentando acceder"
            })
        }

        selectComentariosConUsuariosData.values = [req.params.serie]
        let comentarios = await pool.query(selectComentariosConUsuariosData)
        let comentariosRender = comentarios.rows

        res.render("entrada",{
            serieRender,
            comentariosRender,
            helpers: {
                fecha(data){
                    return moment(data).format('DD/MM/YYYY')
                }
            }

        })
    } catch (error) {
        res.status(500).render("entrada",{
            error: "Se ha generado un error que no permite cargar los datos de la vista"
        })
    }
}

const nuevoComentario = async (req, res) => {
    try {
        selectEmail.values= [req.usuario]
        console.log(req.usuario)
        let usuario = await pool.query(selectEmail)
        let userData = usuario.rows[0]
        if(usuario.rowCount == 0){
            res.status(500).json({code:500, message: 'Se produjo un error al buscar al usuario en la base de datos'})
        }

        let {entrada} = req.query
        let entradaId = parseInt(entrada)
        console.log(entradaId)

        let {comentarioCuerpo} = req.body;

        let fecha = new Date()

        insertComentario.values = [comentarioCuerpo, fecha, entradaId, userData.id]
        let nuevoComentario = await pool.query(insertComentario)

        if(nuevoComentario.name == 'Error') {
            return res.status(500).json({code:500, message: 'No se pudo crear comentario correctamente'})
        } else if(nuevoComentario.rowCount==0){
            return res.status(400).json({code:400, message: 'No se pudo crear comentario correctamente'})
        }else {
            return res.status(201).json({code: 201, message: 'Comentario creado exitosamente'});
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No se pudo crear comentario correctamente'})
    }
}

const filtroNoticias = async (req, res) => {
    try {
        let {categoria, orden} = req.query
        console.log(categoria)
        console.log(orden)
        let noticias
        let noticiasRender

        if(categoria == 'todo' & orden == 'desc') {
            noticias = await pool.query(selectAllNoticiasDesc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        } else if(categoria == 'todo' & orden == 'asc'){
            noticias = await pool.query(selectAllNoticiasAsc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        } else if(categoria != 'todo' & orden == 'desc') {
            selectCategoriaNoticiasDesc.values = [categoria]
            noticias = await pool.query(selectCategoriaNoticiasDesc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        } else {
            selectCategoriaNoticiasAsc.values = [categoria]
            noticias = await pool.query(selectCategoriaNoticiasAsc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No se pudo filtrar noticias correctamente'})
    }
}

const filtroNoticiasCat = (req, res) => {
    try {
        let {categoria} = req.params
        if(categoria == 'shonen' || categoria == 'seinen') {
            res.render("categoria",{
                nombre: categoria
            })
        } else {
            res.status(404).render("categoria",{
                error: "No existe la categoría buscada"
            })
        }
    } catch (error) {
        res.status(500).render("categoria",{
            error: "Se ha generado un error que no permite cargar los datos de la vista"
        })
    }
}

const filtroCategorias = async (req, res) => {
    try {
        let {categoria, orden} = req.query
        let noticias
        let noticiasRender

        if (categoria == 'shonen' & orden == 'desc') {
            selectCategoriaNoticiasDesc.values = [1]
            noticias = await pool.query(selectCategoriaNoticiasDesc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        } else if (categoria == 'shonen' & orden == 'asc') {
            selectCategoriaNoticiasAsc.values = [1]
            noticias = await pool.query(selectCategoriaNoticiasAsc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        } else if (categoria == 'seinen' & orden == 'desc') {
            selectCategoriaNoticiasDesc.values = [2]
            noticias = await pool.query(selectCategoriaNoticiasDesc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        } else {
            selectCategoriaNoticiasAsc.values = [2]
            noticias = await pool.query(selectCategoriaNoticiasAsc)
            noticiasRender = noticias.rows
            res.status(200).json({code: 200, noticiasRender})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No se pudo filtrar noticias correctamente'})
    }
}

const nuevaReaccion= async (req, res) => {
    try {
        selectEmail.values= [req.usuario]
        console.log(req.usuario)
        let usuario = await pool.query(selectEmail)
        let userData = usuario.rows[0]
        if(usuario.rowCount == 0){
            res.status(500).json({code:500, message: 'Se produjo un error al buscar al usuario en la base de datos'})
        }

        let {entrada} = req.query
        let entradaId = parseInt(entrada)

        let {like} = req.body;

        let fecha = new Date()

        insertComentario.values = [comentarioCuerpo, fecha, entradaId, userData.id]
        let nuevoComentario = await pool.query(insertComentario)

        if(nuevoComentario.name == 'Error') {
            return res.status(500).json({code:500, message: 'No se pudo crear comentario correctamente'})
        } else if(nuevoComentario.rowCount==0){
            return res.status(400).json({code:400, message: 'No se pudo crear comentario correctamente'})
        }else {
            return res.status(201).json({code: 201, message: 'Comentario creado exitosamente'});
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500, message: 'No se pudo crear comentario correctamente'})
    }
}


module.exports = {
    addUser, buscaMail, buscaUser, autenticador, verificarToken, publicar, nuevaEntrada, vistaHome, detalleEntrada, nuevoComentario, filtroNoticias, filtroNoticiasCat,
    filtroCategorias
}