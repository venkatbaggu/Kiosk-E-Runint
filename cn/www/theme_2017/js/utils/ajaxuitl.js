jQuery.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var href = window.location.href;//window.location.search
        var hashes = href.slice(href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name] ? $.getUrlVars()[name] : "";
    },
});

var ajaxuitl = {
    url_root: function () {
        return "http://www.e-runint.com/";
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
                        ajaxuitl.showError(msg);
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

var api = {

    //广告横幅
    getSlide: function (callback) {
        var me = this;
        var success = function (resultData) {
            $.each(resultData.rows, function (i, obj) {
                obj["img"] = ajaxuitl.url_root() + obj["img"];
            });
            if (callback && typeof (callback) === "function") {
                callback(resultData.rows);
            }
        };

        ajaxuitl.sendRequest({
            "url": "getslide",
            "async": true,
            "success": success
        });
    },

    //根据商品 关键字 或 类型 ，排序方式，页数，获取商品列表
    getProductList: function (wordstr, typeid, selectorder, pagesize, index, callback) {
        //sale
        //sale_toggle
        //cpoint
        //cpoint_toggle
        //price
        //price_toggle
        //new
        //new_toggle
        var params = {
            word: wordstr,
            cat: typeid,
            order: selectorder,
            pagesize: pagesize,
        };
        var success = function (resultData) {

            if (resultData === null || resultData === undefined) {
                return;
            }
            var goodsList = resultData.pro_list.goodsList;
            resultData["total_page"] = resultData.pro_list.page_info.total_page;

            $.each(goodsList, function (i, item) {

                item["img"] = ajaxuitl.url_root() + item["img"];
                item["market_price"] = accounting.formatMoney(item["market_price"]);
                //item["market_price"] = accounting.formatMoney(item["market_price"], {
                //    symbol: "￥",
                //    format: "%s%v",
                //    // object:
                //    // see below)
                //    decimal: ".",
                //    thousand: ",",
                //    precision: 0

                //});
                item["sell_price"] = accounting.formatMoney(item["sell_price"]);
                //item["sell_price"] = accounting.formatMoney(item["sell_price"], {
                //    symbol: "￥",
                //    format: "%s%v",
                //    // object:
                //    // see below)
                //    decimal: ".",
                //    thousand: ",",
                //    precision: 0

                //});
            });


            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };
        ajaxuitl.sendRequest({

            "url": "pro_list/page/" + index,
            "params": params,
            "async": true,
            "success": success
        });

    },

    //获取商品类型列表
    getCategoryList: function (callback) {

        var success = function (resultData) {
            if (callback && typeof (callback) === "function") {
                callback(resultData.category);
            }
        };
        ajaxuitl.sendRequest({

            "url": "getCategoryList",
            "async": true,
            "success": success
        });

    },

    //获取商品详细信息
    getProductinfo: function (goods_id, callback) {


        var success = function (resultData) {

            if (resultData.flag && resultData.flag == "fail") {
                ajaxuitl.messageuitl("没有该商品！");
                setTimeout(function () { window.history.back(); }, 500);
                return;

            }
            var info = resultData.goods_info;//商品详细
            var spec_array = info.spec_array;//商品分类字符串
            resultData["spec_data"] = [];//转换分类字符串为json数据
            if (spec_array === undefined || spec_array === null || spec_array === "") {
            } else {
                var tmp = $.parseJSON(spec_array);

                resultData["spec_data"].push();
                $.each(tmp, function (i, obj) {
                    var values = obj.value.split(",");
                    $.each(values, function (i1, v) {
                        resultData["spec_data"].push({
                            "id": obj.id,
                            "name": obj.name,
                            "type": obj.type,
                            "value": v

                        });

                    });
                });
            }

            var regexp2 = new RegExp("src=\"/upload", "g");//判断 src 正则表达式
            info["content"] = info["content"].replace(regexp2, "src=\"" + ajaxuitl.url_root() + "upload"); //修改商品详细介绍的，图片路径
            info["sell_price"] = accounting.formatMoney(info["sell_price"]);//修改价格为货币显示模式
            info["market_price"] = accounting.formatMoney(info["market_price"]);//修改价格为货币显示模式

            $.each(info.photo, function (i, item) {//循环修改商品详细的图片路径
                item["img"] = ajaxuitl.url_root() + item["img"];
            });

            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        }
        ajaxuitl.sendRequest({

            "url": "products/id/" + goods_id,
            "async": true,
            "success": success
        });
    },


    //商品详细中选中分类的价格计算
    getProduct: function (goods_id, specJSON, callback) {
        var params = {
            "goods_id": goods_id,
            "specJSON": specJSON,
            "random": Math.random()
        };
        var success = function (resultData) {
            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };

        ajaxuitl.sendRequest({

            "url": "getProduct",
            "params": params,
            "async": true,
            "success": success
        });
    },
    // 商户详细 设计师店铺
    getStoreHome: function (id, callback) {
        //TODO:0 设计师店铺
        //商户详情，设计师店铺都用此接口，主要增加几个字段
        //sellerCertPhoto，证书图片列表
        //sellerStyleData，擅长风格
        //sellerBusAreaData，经营地区

        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
      //tno = "88800003";


        var success = function (resultData) {
           
            if (resultData == undefined) return;
            if (resultData.big_ad_img) {
                resultData.big_ad_img = ajaxuitl.url_root() + resultData.big_ad_img;
            } else {
                resultData.big_ad_img = "images/nologo.jpg";
            }
            if (resultData.big_logo_img) {
                resultData.big_logo_img = ajaxuitl.url_root() + resultData.big_logo_img;
            } else {
                resultData.big_logo_img = "images/nologo.jpg";
            }
            if (resultData.logo_img) {
                resultData.logo_img = ajaxuitl.url_root() + resultData.logo_img;
            } else {
                resultData.logo_img = "images/nologo.jpg";
            }
            if (resultData.paper_img) {
                resultData.paper_img = ajaxuitl.url_root() + resultData.paper_img;
            } else {
                resultData.paper_img = "images/nologo.jpg";
            }
            var regexp2 = new RegExp("src=\"/upload", "g");//判断 src 正则表达式
            if (resultData["content"] != null && resultData["content"].length > 0) {
                resultData["content"] = resultData["content"].replace(regexp2, "width='100%' src=\"" + ajaxuitl.url_root() + "upload");
            } if (resultData["zizhiblock"] != null && resultData["zizhiblock"].length > 0) {
                resultData["zizhiblock"] = resultData["zizhiblock"].replace(regexp2, "width='100%' src=\"" + ajaxuitl.url_root() + "upload");
            } if (resultData["anliblock"] != null && resultData["anliblock"].length > 0) {
                resultData["anliblock"] = resultData["anliblock"].replace(regexp2, "width='100%' src=\"" + ajaxuitl.url_root() + "upload");
            }
            $.each(resultData.productList, function (i, item) {
                if (item.img) {
                    item.img = ajaxuitl.url_root() + item.img;
                }
            });
            $.each(resultData.sellerCertPhoto, function (i, item) {
                if (item.img) {
                    item.img = ajaxuitl.url_root() + item.img;
                }

            });
            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };
        ajaxuitl.sendRequest({
            "url": "getStoreHome/id/" + id + "/terminal_no/" + tno,
            "async": true,
            "success": success
        });
    },

    //获取设计列表
    getHomeSchemeList: function (callback) {
        var success = function (datas) {
            var list_tmp = datas.data;
            $.each(list_tmp, function (i, item) {
                item.img = ajaxuitl.url_root() + item.img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": "scheme_list_ajax/type/1/pagesize/12",
            "async": true,
            "success": success
        });


    },
    //获取设计列表
    getHomeSchemeListByKiosk: function (callback) {
        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        //tno = "88800003";
        var success = function (datas) {
            if (datas == undefined) {
                if (callback && typeof (callback) === "function") {
                    callback(datas);
                }
                return;
            } else {
                var list_tmp = datas.data;
                $.each(list_tmp, function (i, item) {
                    item.img = ajaxuitl.url_root() + item.img;
                });
                if (callback && typeof (callback) === "function") {
                    callback(datas);
                }
            }
        };

        ajaxuitl.sendRequest({
            "url": "scheme_list_ajax/type/1/pagesize/12/terminal_no/" + tno,
            "async": true,
            "success": success
        });


    },
    //设计师列表
    getHomeSellerList: function (callback) {
        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        //tno = "88800003";


        var success = function (datas) {

            var tmlList = datas.data;
            $.each(tmlList, function (i, item) {
                item.big_ad_img = ajaxuitl.url_root() + item.big_ad_img;
                item.big_logo_img = ajaxuitl.url_root() + item.big_logo_img;
                item.logo_img = ajaxuitl.url_root() + item.logo_img;

            });

            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };
        ajaxuitl.sendRequest({
            "url": "seller_ajax/type/1/pagesize/2/terminal_no/" + tno,
            "async": true,
            "success": success
        });
    },
    //风格列表
    getSchemeStyle: function (callback) {
        var success = function (datas) {
            $.each(datas, function (i, item) {
                item.img = ajaxuitl.url_root() + item.img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };
        ajaxuitl.sendRequest({
            "url": "scheme_style",
            "async": true,
            "success": success
        });
    },
    //设计方案
    getDesignList: function (house_id, min_mj, max_mj, style_id, sort_by, page, pagesize, callback) {

        var url = "scheme_list_ajax/type/1/pagesize/" + pagesize + "/page/" + page + "/";

        if (sort_by == 2) {
            url += "sort_by/2/";
        }
        if (style_id.length > 0) {
            url += "style_id/" + style_id + "/";
        }
        if (min_mj.length > 0 && max_mj.length > 0) {
            url += "min_mj/" + min_mj + "/max_mj/" + max_mj + "/";
        }
        if (house_id > 0) {
            url += "house_id/" + house_id + "/";
        }

        //设计方案列表增加过滤条件，结果返回过滤房型，面积，sort_by=2时热度倒序，不传时顺序

        var success = function (datas) {
            var list_tmp = datas.data;
            $.each(list_tmp, function (i, item) {
                item.img = ajaxuitl.url_root() + item.img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": url,
            "async": true,
            "success": success
        });

    },

    //方案详情
    getSchemeDetail: function (id, callback) {
        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        //tno = "88800003";


        var success = function (datas) {
            datas.img = ajaxuitl.url_root() + datas.img;
            datas.cost = accounting.formatMoney(datas.cost);

            var photoList = [];
            $.each(datas.schemeContentCatList, function (i, itemA) {
                itemA.img = ajaxuitl.url_root() + itemA.img;
                $.each(itemA.photoList, function (i, itemB) {
                    itemB.img = ajaxuitl.url_root() + itemB.img;
                    photoList.push({
                        cat_text: itemA.cat_text,
                        img: itemB.img
                    });
                });

            });
            datas["photoList"] = photoList;
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };
        ajaxuitl.sendRequest({
            "url": "scheme_detail/id/" + id + "/terminal_no/" + tno,
            "async": true,
            "success": success
        });
    },




    //设计师列表
    getSellerList: function (qstr,page, pagesize, sort_by, callback) {

        var aegs = "pagesize/" + pagesize + "/page/" + page;
        if (sort_by == 2) {

            aegs += "/sort_by/2";
        }
        if (qstr.length > 0)
        {
            aegs += "/word/" + qstr;
        }
        var success = function (datas) {
            $.each(datas.data, function (i, item) {
                item.big_ad_img = ajaxuitl.url_root() + item.big_ad_img;
                item.big_logo_img = ajaxuitl.url_root() + item.big_logo_img;
                item.logo_img = ajaxuitl.url_root() + item.logo_img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": "seller_ajax/type/1/" + aegs,
            "async": true,
            "success": success
        });

    },
    getSchemeListBySeller: function (sellerId, page, pagesize, callback) {
        var url = "scheme_list_ajax/type/1/pagesize/" + pagesize + "/page/" + page + "/seller_id/" + sellerId;
      
        var success = function (datas) {
            var list_tmp = datas.data;
            $.each(list_tmp, function (i, item) {
                item.img = ajaxuitl.url_root() + item.img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": url,
            "async": true,
            "success": success
        });

    },

    //获取首页的设计列表
    getHomeDecorateList: function (callback) {
        var success = function (datas) {
            var list_tmp = datas.data;
            $.each(list_tmp, function (i, item) {
                item.img = ajaxuitl.url_root() + item.img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": "scheme_list_ajax/type/2/pagesize/9",
            "async": true,
            "success": success
        });


    },
    getHomeDecorateListByKiosk: function (callback) {
        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        //tno = "88800003";
        var success = function (datas) {

            if (datas == undefined) {
                if (callback && typeof (callback) === "function") {
                    callback(datas);
                }
                return;
            } else {
                var list_tmp = datas.data;
                $.each(list_tmp, function (i, item) {
                    item.img = ajaxuitl.url_root() + item.img;
                });
                if (callback && typeof (callback) === "function") {
                    callback(datas);
                }
            }
        };

        ajaxuitl.sendRequest({
            "url": "scheme_list_ajax/type/2/pagesize/9/terminal_no/" + tno,
            "async": true,
            "success": success
        });


    },

    //获取设计列表
    getDecorateList: function (house_id, sort_by, page, pagesize, callback) {

        var ages = "pagesize/" + pagesize + "/page/" + page;
        if (sort_by == 2) {
            ages += "/sort_by/2/";
        }
        if (house_id > 0) {
            ages += '/house_id/' + house_id;
        }

        var success = function (datas) {
            var list_tmp = datas.data;
            $.each(list_tmp, function (i, item) {
                item.img = ajaxuitl.url_root() + item.img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": "scheme_list_ajax/type/2/" + ages,
            "async": true,
            "success": success
        });


    },

    //服务列表
    getSellerCatList: function (id, callback) {

        var success = function (datas) {

            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };

        ajaxuitl.sendRequest({
            "url": "getSellerCatList/id/" + id,
            "async": true,
            "success": success
        });

    },

    //获取设计列表
    getZhuangXiuList: function (page, pagesize, callback) {
        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        //tno = "88800003";
        var ages = "pagesize/" + pagesize + "/page/" + page + "/terminal_no/" + tno;

        var success = function (datas) {
            var list_tmp = datas.data;
            $.each(list_tmp, function (i, item) {

                item.big_ad_img = ajaxuitl.url_root() + item.big_ad_img;
                item.big_logo_img = ajaxuitl.url_root() + item.big_logo_img;
                //item.img = ajaxuitl.url_root() + item.img;
                item.paper_img = ajaxuitl.url_root() + item.paper_img;
            });
            if (callback && typeof (callback) === "function") {
                callback(datas);
            }
        };
        ajaxuitl.sendRequest({
            "url": "seller_ajax/type/3/" + ages,
            "async": true,
            "success": success
        });
    },


    //装修方案列表增加过滤条件，结果返回过滤房型，面积，sort_by=2时热度倒序，不传时顺序
    //http://www.e-runint.com/appinf/scheme_list_ajax/type/2/pagesize/2/house_id/1/min_mj/10/max_mj/120//style_id/1,2,3/sort_by/2/page/1

    //安装服务
    //http://www.e-runint.com/appinf/getSellerCatList/id/14
    //http://www.e-runint.com/appinf/getSellerCatList/id/16




    //我的设计列表
    getMydesign: function (page, pagesize, callback) {
        terminalNo = "kios_demo";

        if (typeof (formJs) == "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            terminalNo = "kios_demo"
        } else {
            terminalNo = formJs.getkiosnum();
        }
        //terminalNo = "88800003";

        var url = "mydesign/page/" + page + "/pagesize/" + pagesize + "/terminalNo/" + terminalNo;

        var success = function (resultData) {
            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };

        ajaxuitl.sendRequest({
            "url": url,
            "async": true,
            "success": success
        });
    },

    //我的户型列表
    getMyfloorplan: function (page, pagesize, callback) {
        terminalNo = "kios_demo";
        if (typeof (formJs) == "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            terminalNo = "kios_demo"
        } else {
            terminalNo = formJs.getkiosnum();
        }
        //terminalNo = "88800003";
        var url = "myfloorplan/page/" + page + "/pagesize/" + pagesize + "/terminalNo/" + terminalNo;

        var success = function (resultData) {
            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };

        ajaxuitl.sendRequest({
            "url": url,
            "async": true,
            "success": success
        });
    },

    //获取3D设计
    getTerminal3d: function (type, id, callback) {

        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        // tno = "88800003";
        var url = "terminal3d/terminalNo/" + tno;

        switch (type) {
            case "1":
                url = url + "/planid/" + id;
                break;
            case "2":
                url = url + "/designid/" + id;
                break;
            default:
                break;
        }

        var success = function (resultData) {
            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };
        ajaxuitl.sendRequest({
            "url": url,
            "async": false,
            "success": success
        });
    },
    getRecomCatGoodsByTerminal: function (callback) {
        var tno = "kios_demo";
        if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
            tno = "kios_demo";
        } else {
            tno = formJs.getkiosnum();
        }
        //tno = "88800003";
        var url = "getRecomCatGoodsByTerminalNo/terminal_no/" + tno
        var success = function (resultData) {
           
            $.each(resultData, function (i, items) {
                $.each(items.goods_list, function (y, itemA) {
                    itemA["img"] = ajaxuitl.url_root() + itemA["img"];
                    itemA["market_price"] = accounting.formatMoney(itemA["market_price"]);
                    //itemA["market_price"] = accounting.formatMoney(itemA["market_price"], {
                    //    symbol: "￥",
                    //    format: "%s%v",
                    //    // object:
                    //    // see below)
                    //    decimal: ".",
                    //    thousand: ",",
                    //    precision: 0

                    //});
                    itemA["sell_price"] = accounting.formatMoney(itemA["sell_price"]);
                    
                    //itemA["sell_price"] = accounting.formatMoney(itemA["sell_price"], {
                    //    symbol: "￥",
                    //    format: "%s%v",
                    //    // object:
                    //    // see below)
                    //    decimal: ".",
                    //    thousand: ",",
                    //    precision: 0

                    //});
                });
            });

            if (callback && typeof (callback) === "function") {
                callback(resultData);
            }
        };
        ajaxuitl.sendRequest({
            "url": url,
            "async": false,
            "success": success
        });

    },
    getFootsAd1: function (callback) {
        var success = function (resultData) {

            $.each(resultData.result, function (i, item) {
                item["content"] = ajaxuitl.url_root() + item["content"]
            });

            if (callback && typeof (callback) === "function") {
                callback(resultData.result);
            }
        };
        ajaxuitl.sendRequest({
            "url": "getAd?position=" + encodeURIComponent("自助终端底部部广告图左355*270"),
            "async": true,
            "success": success
        });

    },
    getFootsAd2: function (callback) {
        var success = function (resultData) {

            $.each(resultData.result, function (i, item) {
                item["content"] = ajaxuitl.url_root() + item["content"]
            });

            if (callback && typeof (callback) === "function") {
                callback(resultData.result);
            }
        };
        ajaxuitl.sendRequest({
            "url": "getAd?position=" + encodeURIComponent("自助终端底部部广告图中355*270"),
            "async": true,
            "success": success
        });

    },
    getFootsAd3: function (callback) {
        var success = function (resultData) {

            $.each(resultData.result, function (i, item) {
                item["content"] = ajaxuitl.url_root() + item["content"]
            });

            if (callback && typeof (callback) === "function") {
                callback(resultData.result);
            }
        };
        ajaxuitl.sendRequest({
            "url": "getAd?position=" + encodeURIComponent("自助终端底部部广告图右355*270"),
            "async": true,
            "success": success
        });

    },
};