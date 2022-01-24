import { setAlert, sendEmailVerificationToken, verifyEmailToken } from "../ChampAPI.js";

$(document).ready(() => {
    $("#code").mask('0-0-0-0')

    function submitHanddle(){
        $( "form" ).on( "submit", false );
        if($("#password").val() !== $("#confirm_password").val()){
            setAlert("#message", "danger", "Senha e Confirmação de senha não conferem!", true);
        }else{
            sendEmailVerificationToken($("#email").val())
                .success(() => {
                    $(".code-class").show(1000)
                })
                .error((resp) => setAlert("#message", "danger", "Não foi possível enviar o e-email"))
        }
    }

    $("#submit").click(() => { submitHanddle() })
    $("#code").keyup(function (e) {
        if($(this).val().length === 7){
            verifyEmailToken({
                code:  $("#code").val(),
                name:  $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val()
            }).success((e) => {
                console.warn(e)
            }).error(() => { console.error(e)})
        }
    });
})
