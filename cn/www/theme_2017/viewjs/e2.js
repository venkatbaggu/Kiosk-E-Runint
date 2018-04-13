var id;
var type;

var loadDIY = function () {

    api.getTerminal3d(type, id, function (data) {

        if (data && data.errorCode == 0 && data.iframeurl && data.iframeurl.length > 1) {
            $("#if3d").attr("src", data.iframeurl);
        }
    });

    if (window.postMessage) {
        var callback = function (ev) {
            //alert(ev.data);
            if (ev.origin === 'http://www.kujiale.com' ||
                ev.origin === 'http://yun.kujiale.com' ||
                ev.origin === 'https://www.kujiale.com' ||
                ev.origin === 'https://yun.kujiale.com') {
                // handle message in ev ...

                if (typeof (ev.data) != "string") {
                    return;
                }
                var data = JSON.parse(ev.data)
                if (data.action === 'kjl_rendered') {
                    if (data.imgtype == 'quanjing') {
                        $('#if3d').attr('src', data.pano);
                    }
                }

                if (data.action === 'kjl_completed') {

                    window.location = 'e1.html'
                }
            }
        };
        if ('addEventListener' in document) {
            window.addEventListener('message', callback, false);
        } else if ('attachEvent' in document) {
            window.attachEvent('onmessage', callback);
        }
    } else {
        // 如果不支持postMessage， 则使用ie6/7的window共有属性navigator进行hack
        window.navigator.listenKJL = function (msg) {
            alert(msg)
            // var data = JSON.parse(ev.data)
        };
    }
};

$(function () {
    id = $.getUrlVar("id");
    type = $.getUrlVar("type");
    if (type == "") {
        type = 0;
        id = "";
    }


    loadDIY();

});