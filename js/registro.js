$("#registrarUsuario").click(function(){
    let name = $.trim($("#registrarNombre").val());
    let email = $.trim($("#registrarCorreo").val());
    let password = $.trim($("#passRegistro").val());
    let password2 = $.trim($("#passRegistro2").val());
    let regEx = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{3,10})$/;

    if(name == "" || email == "" || password == "" || password2 == "") {
        alert("POR FAVOR LLENE TODOS LOS CAMPOS");
    }else if (!regEx.exec(email)){
        alert("CORREO NO VALIDO");
    }else {
        if($("#passRegistro").val() == $("#passRegistro2").val()){
            let datos = {
                email:$("#registrarCorreo").val(),
                name:$("#registrarNombre").val(),
                password:$("#passRegistro").val(),
            }
            console.log(datos);

            $.ajax({
                url:`http://129.151.115.61:8080/api/user/${email}`,
                type:"GET",
                success: function (result) {
                  if (result == true) {
                    alert("YA TIENES UNA CUENTA CON ESTE CORREO ELECTRONICO");
                    $("#formulario2").trigger("reset");
                    return false;
                  }else{
                    $.ajax({
                        url:"http://129.151.115.61:8080/api/user/new",
                        method:"POST",
                        data:JSON.stringify(datos),
                        contentType:"application/json; charset=utf-8",
                        dataType:"json",
                        Headers:{
                            "Content-Type":"application/json"
                        },
                        statusCode: {
                            201: function(response){
                                $("#formulario2").trigger("reset");
                                console.log(response);
                                alert("CUENTA CREADA CORRECTAMENTE");
                            }
                        }
                    });
                  }
                },
              });
        }else{
            alert("LAS CONTRASEÑAS NO COINCIDEN");
        }
    }
});