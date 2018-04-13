define(function (require) {
    var $ = require("jquery");

    var ajaxuitl = {
        url_root: function () {
            //return "http://www.e-runint.com/";
            return "http://www.unellinc.hk/";
            //return "http://192.168.1.130:8080/";
        },
        url_api: function () {
            return ajaxuitl.url_root() + "appinf/";
        },

        sendRequest: function (options) {
            $.support.cors = true;
            window.LoadingBarDisable = false;

            if (options.LoadingBarDisable) {
                window.LoadingBarDisable = true;
            }
            var url = ajaxuitl.url_api() + options.url;
            $.ajax({
                "timeout": 30000,
                "type": "post",
                "async": options.async ? options.async : false,
                "dataType": "json",
                "url": ajaxuitl.url_api() + options.url,
                "data": options.params,
                "beforeSend": function (xhr) {
                    if (options.beforesend) {
                        options.beforesend.call(this, xhr);
                    }
                },
                "complete": function (xhr, status) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        if (options.success) {
                            options.success.call(this, xhr.responseJSON, xhr);
                        }
                    } else {
                        var msg = ajaxuitl.getErrorMsg(xhr);
                        if (options.error) {
                            options.error.call(this, msg, xhr);
                        } else {
                            //ajaxuitl.showError(msg);
                        }
                    }
                },
            });
        },


        sendRequestForJsonp: function (options) {
            window.LoadingBarDisable = false;

            if (options.LoadingBarDisable) {
                window.LoadingBarDisable = true;
            }
            var url = ajaxuitl.url_api() + options.url;
            $.ajax({
                "timeout": 30000,
                "async": options.async ? options.async : false,
                "dataType": "jsonp",
                "url": ajaxuitl.url_api() + options.url,
                "jsonp": 'jsoncallback',
                "data": options.params,
                "beforeSend": function (xhr) {
                    if (options.beforesend) {
                        options.beforesend.call(this, xhr);
                    }
                },
                "complete": function (xhr, status) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        if (options.success) {
                            options.success.call(this, xhr.responseJSON, xhr);
                        }
                    } else {
                        var msg = ajaxuitl.getErrorMsg(xhr);
                        if (options.error) {
                            options.error.call(this, msg, xhr);
                        } else {
                            // ajaxuitl.showError(msg);
                        }
                    }
                },
            });
        },



        getErrorMsg: function (xhr) {
            return $(xhr.responseText).filter("h1:first").text() || xhr.statusText;
        },
        showError: function (msg) {
            alert(msg);
        },


        messageuitl: function (message) {
            var alertmessage = $("#alertmessage");
            if (alertmessage.length < 1) {
                var alertmessagehtml = "<div id='alertmessage'></div>"
                $('body').append(alertmessagehtml);
                alertmessage = $("#alertmessage");
                alertmessage.addClass("aler-message");
            }
            alertmessage.addClass("aler-message");
            alertmessage.html(message.toString());
            alertmessage.slideDown('fast', "linear", function () {
                setTimeout(function () {
                    $("#alertmessage:visible").fadeOut();
                }, 2500);
            });
        }


    };
    return ajaxuitl;

});