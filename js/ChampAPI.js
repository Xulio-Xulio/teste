//const URL = 'https://dev.plataformacampeao.com.br/api';
const URL = 'http://champion-dev/api';


export const setAlert = (el, type, message, time = true) => {
    $("#message").hide();
    $("#message").removeClass('alert-*');
    $("#message").removeClass('alert');
    $("#message").addClass("alert");
    $("#message").addClass("alert-" + type);
    $("#message").html(message);
    $("#message").show(500);
    if(time){
        setTimeout(()=>{
            $("#message").hide(500);
            $("#message").removeClass('alert-*');
            $("#message").removeClass('alert');
            $("#message").html('');
        }, 5000);
    }
}


export const login = (login, password) => {
    $.ajax({
        url: URL + "/login",
        dataType: "JSON",
        type: "POST",
        data: {email: $("#email").val(),password: $("#password").val()},
        success: (resp) => {
            localStorage.setItem('token', resp.access_token);
            localStorage.setItem('token_type', resp.token_type);
            window.location.href = 'home.html';
        },
        error: (resp) => {
            localStorage.removeItem('token');
            localStorage.removeItem('token_type');
            setAlert("#message", "danger", "usuário ou senha incorretos!", false);
        }
    })
}

export const testUser = () => {
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
        },
        url: URL + "/me",
        dataType: "JSON",
        type: "POST",
        data: {email: $("#email").val(),password: $("#password").val()},
        success: (resp) => {
            localStorage.setItem('last_check', new Date().toLocaleDateString());
        },
        error: (resp) => {
            localStorage.removeItem('token');
            localStorage.removeItem('token_type');
            window.location.href = "index.html";
        }
    })
}

export const sendEmailVerificationToken = (email) => {
    return $.ajax({
        url: URL + "/send-token/" + email,
        dataType: "JSON",
        type: "POST",
    })
}


export const verifyEmailToken = (data) => {
    return $.ajax({
        url: URL + "/verify-token",
        dataType: "JSON",
        type: "POST",
        data: data,
    })
}

