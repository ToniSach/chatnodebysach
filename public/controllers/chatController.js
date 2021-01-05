const controller = {};

controller.inicio = (req, res) => {
    res.render('login', {
        mendates: "hola"
    });
};
controller.chat = (req, res) => {
    req.getConnection((err, conn) => {
        if (err){
            res.json(err);
            console.log('No se pudo conectar con la DB');
        }
        const datas = req.body;
        console.log(datas);
        const datos = Object.values(datas);
        const correo1 = datos[0];
        const correou = correo1.toString();
        const pass1 = datos[1];
        const pass = pass1.toString();
        //const correou = "usuario12@gmail.com";
        const sntcecorreou = "aes_encrypt('"+correou+"','BraceBlack')";
        //const pass = "1234567890";
        const sntcepass = "aes_encrypt('"+pass+"','BraceBlack')"
        console.log(sntcecorreou);
        console.log(sntcepass);
        const sentencesql = "SELECT nombreUsuario, idTipoUsuario FROM `usuario` WHERE " + 
        "correoUsuario = " + sntcecorreou + "AND passwordUsuario = " + sntcepass;
        conn.query(sentencesql, (errfind, rows) => {
            console.log(rows);
            if(rows[0] != null){
                console.log(rows);
                const nam = Object.values(rows[0]);
                //console.log(nam);
                const name = nam[0];
                //console.log(name);
                const names = name.toString();
                const typea = nam[1];
                const typeas = typea.toString();
                console.log('name: ' + names +'type: '+ typea);
                try {
                    var hm = typeas;
                    if (hm == "3"){
                        hm = "Usuario";
                    }else if (hm == "2"){
                        hm = "Nutriólogo";
                    }else if (hm == "1"){
                        hm = "Administrador";
                    }
                } catch (error) {
                    console.log(error);
                }
                if (rows[0] != null){
                    res.render('chat', {
                        nombre: names,
                        typep: hm
                    });
                }
            } else {
                res.render('login', {
                    mensaje: "hay un error"
                });
            }
            
            
        });
        //aes_encrypt('usuario12@gmail.com','BraceBlack')
    });
};
/*
                    <% if(message.length > 0) {%>
                    <div class="alert alert-danger">
                        <%= message  %>
                    </div>
                    <% } %>  
*/
//<%= datoss1 %>-<%= datoss %> 
module.exports = controller;