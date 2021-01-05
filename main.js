var express = require('express');  
var app = express();  
const morgan = require('morgan');
var server = require('http').Server(app);  
var io = require('socket.io')(server);
var PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const chatRoutes = require('./public/routes/Chat');
const myConnection = require('express-myconnection');
const mysql = require('mysql');

var messages = [{  
  id: 1,
  author: "Administración",
  text: "Bienvenidos al chat, por favor sean respetuosos.",
}];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//plantillas ejs
app.set('view engine','ejs');
//ajustamos la direccion para los views
app.set('views', path.join(__dirname, '/public/views'));

//

app.use(express.static(path.join(__dirname, '/public')));

//conexion con la db

app.use(myConnection(mysql, {
  host : 'bjiyr3qhqrxvdbp2qftw-mysql.services.clever-cloud.com',
  user: 'u6r2gyppbzxnzhki',
  password: '7yklTzVUXIZ7esGxA4YV',
  port: 3306,
  database: 'bjiyr3qhqrxvdbp2qftw'
}, 'single'));

app.use('/',chatRoutes);

app.use(morgan('dev'));

// el socket escuchar� el evento new-message y los traera
// en data con el m�todo push
// para notificar a los clientes
// para conectar en privado socket.emit
// pero como es una sala de chat entonces
//io.sockets.emit 
io.on('connection', function(socket) {  
  console.log('Alguien se ha conectado ');
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

server.listen(PORT, function() {  
  console.log("Servidor corriendo");
});

/*

SELECT idUsuario, nombreUsuario, appatUsuario, apmatUsuario, sexoUsuario, fechaUsuario, aes_decrypt(correoUsuario, 'BraceBlack'),
 aes_decrypt(userUsuario, 'BraceBlack'), aes_decrypt(passwordUsuario, 'BraceBlack'), idTipoUsuario,
 idTest  FROM `db_healthknife`.`usuario` WHERE idUsuario =

*/

/*

controller.chat = (req, res) => {
    app.post('/login', (req, res) => {

        const datas = req.body;
        console.log(datas);
        const datos = Object.values(datas);
        const correo1 = datos[0];
        const correo2 = correo1.toString();
        const pass1 = datos[1];
        const pass2 = pass1.toString();
        console.log('email: ', correo2, 'pass: ', pass2);
        req.getConnection((err,conn) => {
            if (err){
                res.json(err);
                console.log('hay un error');
            }
            conn.query('SELECT * FROM usuario WHERE Correo = ?', [correo2], (errcor, rowws, next) => {
                
                if (errcor)
                    res.json(errcor);
                
                //obtenemos los datos registrados en la db con el correo ingresado
                const datoscadena = Object.values(rowws[0]);
                //obtenemos solo la contraseña desde la db
                const password1 = datoscadena[3];
                console.log(password1);
                const password2 = password1.toString();
                //obtenemos el nombre
                const nombre1 = datoscadena[1];
                const nombre2 = nombre1.toString();
                //obtenemos el nutri
                const nutri1 = datoscadena[4];
                const nutri2 = nutri1.toString();
                const tipo = "";
                const suma = 3 + 5;
                if (password2 === pass2)
                    //console.log('pass1: ', pass2,'passdb: ', password2);
                    if(nutri2 === 'Yes'){
                        const hola = "Nutriologo";
                        console.log('si es un nutriologo');
                        res.render('inicio', {
                            data: nombre2,
                            data2: hola 
                        });
                        //tipo =  suma;
                    } else if (nutri2 === 'No') {
                        const hola = "Usuario";
                        console.log('no es un nutriologo'); 
                        res.render('inicio', {
                            data: nombre2,
                            data2: hola 
                        });
                    } 
                        //tipo = 'Usuario'; 
                    console.log('hasta aqui todo bien');
                 /*else if (password2 != pass2) {
                    res.render('login', {
                        message: 'Contraseña incorrecta'
                    });
                }
                console.log('datos obtenidos: ', rowws);
            });
            /*conn.query('SELECT Nombre FROM usuarios', (err, rows) => {
                console.log(rows);
                
                

            });
        });
    });
};

*/