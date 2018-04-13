require(["jquery"], function ($) {
    $.virtualkeyboard.init();
    $("#username_input").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("username_input");  
    });
    $("#password_input").click(function (e) {
        $.virtualkeyboard.keyboardShowForId("password_input");
    });

});
function userlogin() {
    require(["jquery", "jsuitl/yirunapi"], function ($, API) {
        var username = $("#username_input").val();
        var paw = $("#password_input").val();
        API.login(username, paw, function (resultData) {
            if (resultData.return_code != "00") {
                API.messageuitl(resultData.return_message);
            } else {
                API.messageuitl("Log in successfully！");

                setTimeout(function () { window.history.back(); }, 1200);

            }
        });
    });
}