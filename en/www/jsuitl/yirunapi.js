define(function (require) {
    var $ = require("jquery");
    var ajaxuitl = require("ajaxuitl");
    var accounting = require("accounting");

    var yirunapi = {
        //格式化货币形式
        formatMoney: function (money) {

            return accounting.formatMoney(money, {
                symbol: "$", // 默认的货币符号 '$'
                format: "%s%v", // 输出控制: %s = 符号, %v = 值或数字 (can be
                // object:
                // see below)
                decimal: ".", // 小数点分隔符
                thousand: ",", // 千位分隔符
                precision: 2   // 默认小数位数 2

            });
        },
        //图片路径转换判断的正则表达式
        imgRe: function () {
            return new RegExp("/", "g");
        },
        //图片路径替换方式
        imgReFag: function () {
            return "@_@";
        },
        //图片路径
        imgproducturl_root: function () {
            return ajaxuitl.url_root() + "pic/thumb/img/";
        },
        //图片大小 80
        size80: function () {
            return "/w/80/h/80";
        },
        //图片大小 80
        size120: function () {
            return "/w/120/h/120";
        },
        //图片大小 175
        size175: function () {
            return "/w/175/h/175";
        },
        //图片大小 350
        size350: function () {
            return "/w/350/h/350";

        },

        messageuitl: function (message) {
            ajaxuitl.messageuitl(message);
        },

        /*----------------------- 首页位置开始 -----------------------*/

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

        //推荐商品1       
        getHomePic1: function (callback) {

            var success = function (resultData) {

                $.each(resultData.result, function (i, item) {
                    item["content"] = ajaxuitl.url_root() + item["content"]
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData.result);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getAd?position=" + encodeURIComponent("自助终端首页商品推荐1-315*200"),
                "async": true,
                "success": success
            });
        },
        //推荐商品2
        getHomePic2: function (callback) {

            var success = function (resultData) {

                $.each(resultData.result, function (i, item) {
                    item["content"] = ajaxuitl.url_root() + item["content"]
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData.result);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getAd?position=" + encodeURIComponent("自助终端首页商品推荐2-315*200"),
                "async": true,
                "success": success
            });
        },
        //推荐商品3
        getHomePic3: function (callback) {

            var success = function (resultData) {

                $.each(resultData.result, function (i, item) {
                    item["content"] = ajaxuitl.url_root() + item["content"]
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData.result);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getAd?position=" + encodeURIComponent("自助终端首页商品推荐3-315*200"),
                "async": true,
                "success": success
            });
        },
        //推荐商品4
        getHomePic4: function (callback) {

            var success = function (resultData) {

                $.each(resultData.result, function (i, item) {
                    item["content"] = ajaxuitl.url_root() + item["content"]
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData.result);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getAd?position=" + encodeURIComponent("自助终端首页商品推荐4-315*200"),
                "async": true,
                "success": success
            });
        },
        /*----------------------- 首页位置结束 -----------------------*/


        /*----------------------- 亿润商城---商品信息位置开始 -----------------------*/
        /*-----------------------商品分类 , 商品列表 , 搜索商品列表 , 商品详细，商品详细中选中分类的价格计算-----------------------------*/
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
        //根据商品 关键字 或 类型 ，排序方式，页数，获取商品列表
        getProductList: function (wordstr, typeid, selectorder, pagesize, index, callback) {

            var me = this;
            var params = {
                word: wordstr,
                cat: typeid,
                order: selectorder,
                "pagesize": pagesize
            };
            var success = function (resultData) {

                if (resultData === null || resultData === undefined) {
                    return;
                }
                var goodsList = resultData.pro_list.goodsList;
                resultData["total_page"] = resultData.pro_list.page_info.total_page;

                $.each(goodsList, function (i, item) {

                    item["img"] = ajaxuitl.url_root() + item["img"];

                    item["market_price"] = me.formatMoney(item["market_price"]);
                    item["sell_price"] = me.formatMoney((item["sell_price"]));
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
        //获取商品详细信息
        getProductinfo: function (goods_id, callback) {

            var me = this;
            var success = function (resultData) {
                if (resultData.flag && resultData.flag == "fail") {
                    ajaxuitl.messageuitl("Without the goods!");
                    setTimeout(function () { window.history.back(); }, 500);

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
                info["sell_price"] = me.formatMoney(info["sell_price"]);//修改价格为货币显示模式
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

        /*----------------------- 亿润商城---商品信息位置结束 -----------------------*/

        /*----------------------- 购物车流程开始 -----------------------*/

        //添加商品到购物车
        joinCart: function (id, num, type, callback) {

            var url = 'joinCart?goods_id=' + id + '&goods_num=' + num + '&type=' + type;
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };

            ajaxuitl.sendRequestForJsonp({
                "url": url,
                "async": true,
                "success": success
            });
        },
        // 获取购物车
        getCart: function (callback) {
            var me = this;
            var success = function (resultData) {
                resultData.card.final_sum = me.formatMoney(resultData.card.final_sum);
                resultData.card.sum = me.formatMoney(resultData.card.sum);
                $.each(resultData.card.goodsList, function (i, item) {
                    item.sell_price = me.formatMoney(item.sell_price);
                    item.img = ajaxuitl.url_root() + item.img;
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData.card);
                }
            }
            ajaxuitl.sendRequestForJsonp({
                "url": "cart",
                "async": true,
                "success": success
            });
        },

        //购物车删除一个商品
        removeCart: function (goods_id, product_id, callback) {
            var params = {
                "goods_id": product_id > 0 ? product_id : goods_id,
                // "goods_num" : num,
                "type": product_id > 0 ? "product" : "goods"
            };
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({
                "url": "removeCart",
                "params": params,
                "async": true,
                "success": success
            });
        },


        //清空购物车
        clearCart: function (callback) {
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({
                "url": "clearCart",
                "async": true,
                "success": success
            });
        },

        /*----------------------- 购物车流程结束 -----------------------*/

        /*----------------------- 订单流程开始 -----------------------*/

        //获取送货地址
        getAddress: function (callback) {

            var success = function (resultData) {
                if (resultData) {
                    var addressarray = resultData.address;
                    var addr_areas = resultData.areas;
                    if (addr_areas && addressarray)
                        $.each(addressarray, function (i, item) {
                            item["province_name"] = "";
                            item["city_name"] = "";
                            item["area_name"] = "";
                            if (addr_areas !== null && addr_areas !== "") {
                                if (item.province !== "") {
                                    item["province_name"] = addr_areas[item.province];
                                }
                                if (item.city !== "") {
                                    item["city_name"] = addr_areas[item.city];
                                }
                                if (item.area !== "") {
                                    item["area_name"] = addr_areas[item.area];
                                }
                            }
                        });
                    if (callback && typeof (callback) === "function") {
                        callback(resultData.address);
                    }
                } else {
                    if (callback && typeof (callback) === "function") {
                        callback(resultData);
                    }
                }
            };
            ajaxuitl.sendRequestForJsonp({
                "url": "address",
                "async": true,
                "success": success
            });
        },

        getAreas: function (aid, callback) {
            var id = aid ? "aid/" + aid : "";
            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };

            ajaxuitl.sendRequest({

                "url": "area_child/" + id,
                "async": true,
                "success": success
            });

        },


        getDeliveryPaymentList: function (callback) {
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({

                "url": "getDeliveryPaymentList",
                "async": true,
                "success": success
            });
        },

        //获取订单
        getOrderInfo: function (callback) {
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({

                "url": "cart2",
                "async": true,
                "success": success
            });
        },
        //获取订单
        getOrderInfo2: function (callback) {
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({

                "url": "cart2",
                "async": false,
                "success": success
            });
        },


        //获取服务商类型列表
        getUnionTypeList: function (callback) {

            var success = function (resultData) {

                $.each(resultData.unionCatlist, function (i, item) {
                    item["rad_name"] = 'service_' + item["id"];
                });


                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getUnionTypeList",
                "async": true,
                "success": success
            });
        },

        // 获取服务商列表   
        getUnionList: function (cat_id, city_id, callback) {
            if (city_id === "") {
                return;
            }
            var params = {
                "cat_id": cat_id,
                "city_id": city_id

            };
            var success = function (resultData) {

                $.each(resultData.unionlist, function (i, item) {
                    item["logo_img"] = ajaxuitl.url_root() + item["logo_img"];
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({

                "url": "getUnionList",
                "async": false,
                "params": params,
                "success": success
            });
        },


        // 提交订单
        addOrder: function (params, callback) {
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({
                "url": "cart3",
                "async": true,
                "params": params,
                "success": success
            });
        },


        /*----------------------- 订单流程结束 -----------------------*/


        /*----------------------- 联盟商列表，联盟商详细，制造商列表，制造商详细 开始 -----------------------*/

        //获取联盟商列表
        getUnionCatList: function (callback) {

            var success = function (resultData) {

                $.each(resultData.unionCatlist, function (i, item) {
                    $.each(item, function (k, v) {
                        if (k == "logo_img") {
                            item["logo_img"] = (!v) ? "images/nologo.jpg" : ajaxuitl.url_root() + v;
                        }
                    });
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getUnionCatList",
                "async": true,
                "success": success
            });
        },

        // 制造商列表		
        getBrandCatList: function (callback) {

            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getBrandCatList",
                "async": true,
                "success": success
            });
        },



        // 商户详细
        getStoreHome: function (id, callback) {
            var success = function (resultData) {
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
                var regexp2 = new RegExp("src=\"/upload", "g");//判断 src 正则表达式
                resultData["content"] = resultData["content"].replace(regexp2, "src=\"" + ajaxuitl.url_root() + "upload");
                resultData["zizhiblock"] = resultData["zizhiblock"].replace(regexp2, "src=\"" + ajaxuitl.url_root() + "upload");
                resultData["anliblock"] = resultData["anliblock"].replace(regexp2, "src=\"" + ajaxuitl.url_root() + "upload");

                $.each(resultData.productList, function (i, item) {
                    if (item.img) {
                        item.img = ajaxuitl.url_root() + item.img;
                    }

                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({
                "url": "getStoreHome/id/" + id,
                "async": true,
                "success": success
            });
        },


        /*----------------------- 联盟商列表，联盟商详细，制造商列表，制造商详细 结束 -----------------------*/


        /*----------------------- 用户注册，登陆，登出 开始 -----------------------*/
        //登陆
        login: function (username, paw, callback) {
            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            var params = {
                "login_info": username,
                "password": paw
            };
            ajaxuitl.sendRequestForJsonp({

                "url": "login",
                "params": params,
                "async": true,
                "success": success
            });
        },
        //用户注册
        regUser: function (mail, name, paw, rpaw, callback) {
            var params = {
                'email': mail,
                'username': name,
                'password': paw,
                'repassword': rpaw
            };

            var success = function (resultData) {
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequest({

                "url": "reg_act",
                "params": params,
                "async": true,
                "success": success
            });
        },

        //用户登出
        logout: function (callback) {

            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({
                "url": "logout",
                "async": true,
                "success": success
            });
        },


        getUserInfo: function (callback) {
            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }

            };
            ajaxuitl.sendRequestForJsonp({
                "url": "getUserInfo",
                "async": false,
                "success": success
            });

        },

        /*----------------------- 用户注册，登陆，登出 结束 -----------------------*/

        /*----------------------- 查询订单 开始 -----------------------*/

        //查询订单
        getOrderList: function (page, pageMaxCount, mobile, callback) {

            var params = {
                "page": page,
                "pagesize": pageMaxCount,
                "mobile": mobile
            };
            var me = this;
            var success = function (resultData) {

                if (resultData.return_code) {
                    return;
                }
                $.each(resultData.rows, function (i, orderitem) {
                    orderitem.order_amount = me.formatMoney(orderitem.order_amount);
                    $.each(orderitem.goods, function (y, goodsitem) {
                        resultData.rows[i].goods[y].img = (goodsitem.img && goodsitem.img.length > 0) ? ajaxuitl.url_root() + goodsitem.img : "images/nologo.jpg";
                    });
                });

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }

            };
            ajaxuitl.sendRequestForJsonp({
                "url": "getOrderList",
                "params": params,
                "async": true,
                "success": success
            });
        },
        /**
		 * 订单明细
		 */
        getOrderDetail: function (orderid, callback) {
            var me = this;
            if (orderid < 0)
                return;

            var success = function (resultData) {
                if (!resultData) { return; }
                resultData.order_info["freight_name"] = "";
                resultData.order_info["delivery_code"] = "";
                if (resultData.order_info.freight) {
                    resultData.order_info["freight_name"] = resultData.order_info.freight["freight_name"];
                    resultData.order_info["delivery_code"] = resultData.order_info.freight["delivery_code"];
                }
                resultData.order_info["real_freight"] = me.formatMoney(resultData.order_info["real_freight"]);
                resultData.order_info["payable_amount"] = me.formatMoney(resultData.order_info["payable_amount"]);
                resultData.order_info["order_amount"] = me.formatMoney(resultData.order_info["order_amount"]);
                resultData.order_info["discount"] = me.formatMoney(resultData.order_info["discount"]);
                $.each(resultData.order_goods, function (i, item) {
                    item["img"] = ajaxuitl.url_root() + item["img"];

                    item["goods_price"] = me.formatMoney(item["goods_price"]);
                    item["real_price"] = me.formatMoney(item["real_price"]);

                    var goods_json = $.parseJSON(item["goods_array"]);
                    item["goodsno"] = goods_json["goodsno"];
                    item["goodsname"] = goods_json["name"];
                    item["goodsvalue"] = goods_json["value"];

                });
                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };

            ajaxuitl.sendRequest({

                "url": "getOrderDetail/id/" + orderid,
                "async": true,
                "success": success
            });

        },

        /**
         * 取消订单
         */
        cancelOrder: function (orderid, callback) {
            // var me = this;
            if (orderid < 0)
                return;

            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };

            ajaxuitl.sendRequestForJsonp({
                "url": "orderStatus/op/cancel/order_id/" + orderid,
                "async": false,
                "success": success
            });
        },
        /**
         * 微信支付的二维码
         */
        weixinpay: function (orderid, callback) {
            if (orderid < 0)
                return;
            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };

            ajaxuitl.sendRequestForJsonp({

                "url": "weixinpay/order_id/" + orderid,
                "async": true,
                "success": success
            });

        },
        /**
         * 检查微信支付是否成功
         */
        weixinpaycheck: function (orderNo, callback) {

            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };
            ajaxuitl.sendRequestForJsonp({
                "url": "getOrderPayStatus/orderNo/" + orderNo,
                "LoadingBarDisable": true,
                "async": true,
                "success": success

            });
        },
        /**
         * 计算运费
         */
        order_delivery: function (province, delivery, goodsIds, productIds, nums, callback) {

            var params = {
                "province": province,
                "distribution": delivery,
                "goodsId": JSON.stringify(goodsIds),
                "productId": JSON.stringify(productIds),
                "num": JSON.stringify(nums)
            };

            var success = function (resultData) {

                if (callback && typeof (callback) === "function") {
                    callback(resultData);
                }
            };

            ajaxuitl.sendRequest({

                "url": "order_delivery",
                "async": false,
                "params": params,
                "success": success
            });

        },

        /*----------------------- 查询订单 结束 -----------------------*/


        /*----------------------- 3D效果接口 开始 -----------------------*/

        //我的设计列表
        getMydesign: function (page, pagesize, callback) {
            terminalNo = "kios_demo";
            if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum()) === "undefined") {
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
            if (typeof (formJs) === "undefined" || typeof (formJs.getkiosnum) === "undefined") {
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
                case 1:
                    url = url + "/planid/" + id;
                    break;
                case 2:
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

        /*----------------------- 3D效果接口 结束 -----------------------*/
    };
    return yirunapi;

});