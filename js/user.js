$("#btn-ingreso").click(function(){
    let userEmail = $.trim($("#input-email").val());                //el .trim hace que quite espacios vacios
    let userPass = $.trim($("#input-pass").val());
    let regEx = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,10})$/;  // Valida que el correo se ingrese con sus caracteres especiales "correo@ejemplo.com"

    if(userEmail == "" || userPass == ""){                          //validar campos vacios
        alert("POR FAVOR INGRESE UN CORREO Y UNA CONTRASEÑA");
    }else if (!regEx.exec(userEmail)){                                  // valida que el ingreso del correo sea correcto correo@example.com
        alert("CORREO NO VALIDO");
    }else {let datos = {                                            // valida los datos para ingresar
            email: userEmail,
            password: userPass
        }
        $.ajax({
            url:"http://129.151.115.61:8080/api/user/" + datos.email + "/" + datos.password,
            method: "GET",
            dataType: "json",
            success:function(response){                             //el success es el código 200
                $("#formulario1").trigger("reset");
                if(response.id != null ){
                    alert(`BIENVENIDO:  ${response.name}`);
                }
                else {
                    alert("EL USUARIO NO EXISTE, ¡REGISTRATE!");
                }
            }
        });
    }
});