$(() => {
    $("#mobileusername").val("huajiujian");
    $("#mobileNumber").val("13912345678");
    $("#passwordA,#passwordB").val("1234");

    $("#mobileusername").blur(function() {
        let val = $.trim($(this).val());
        if (/^[\u4e00-\u9fa5a-zA-Z]{4,10}$/.test(val)) {
            $(this).next().css("color","green").text("用户名可以使用");
            $(this).parents(".item").removeClass("Lc");
        } else {
            $(this).next().css("color","red").text("用户名不规范，请重新输入!");
            $(this).parents(".item").addClass("Lc");
        }
    });

    $("#mobileNumber").blur(function() {
        let val = $.trim($(this).val());
        if (/^1[3-9]\d{9}$/.test(val)) {
            $(this).next().css("color","green").text("正确的手机号码");
            $(this).parents(".item").removeClass("Lc");
        } else {
            $(this).next().css("color","red").text("手机号码不正确，请重新输入！");
            $(this).parents(".item").addClass("Lc");
        }
    });

    $("#passwordA").blur(function() {
        let val = $.trim($(this).val());
        if (/^[0-9a-zA-Z]{4,6}$/.test(val)) {
            $(this).next().text("");
            $(this).parents(".item").removeClass("Lc");
        } else {
            $(this).next().css("color","red").text("密码不规范！");
            $(this).parents(".item").addClass("Lc");
        }
    });

    $("#passwordB").blur(function() {
        let val = $.trim($("#passwordA").val());
        if ($.trim($(this).val()) == val) {
            $(this).next().text("");
            $(this).parents(".item").removeClass("Lc");
        } else {
            $(this).next().css("color","red").text("两次输入的密码不一致！");
            $(this).parents(".item").addClass("Lc");
        }
    });

    
    /* 图形验证码 */
    /* [1] 先下载和引用插件 */
    /* [2] 在页面中指定的位置提供canvas标签 */
    /* [3] 在js代码中调用插件中提供的构造函数创建实例对象，并且调用draw方法 */
    let imgCodeTarget;
    let captcha = new Captcha({ lineNum: 10, dotNum: 3, fontSize: 24, length: 4, content: "0123456789" });
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarget = r;
        // console.log(r, '验证码1');
        /* 当用户点击图形变化验证码的时候需要重新校验 */
        $("#img2Code").trigger("blur");
    });


    /* 图形验证码校验 */
    $("#img2Code").blur(function() {
        let val = $.trim($(this).val());
        if (imgCodeTarget == val) {
            $(this).next().next().text("");
            $(this).parents(".item").removeClass("Lc")
        } else {
            $(this).next().next().css("color","red").text("输入的验证码不正确！");
            $(this).parents(".item").addClass("Lc")
        }
    })


    /* 注册按钮的点击事件 */
    $("#registerBtn").click(function() {
        /* 001-检查用户是否输入了正确的信息并且通过验证，如果没有通过那么就返回 */
        $("#mobileusername,#mobileNumber,#img2Code,#passwordB,#passwordA").trigger("blur");
        if ($(".Lc").length != 0) {
            return;
        }

        /* 002-检查用户是否勾选了用户协议*/
        if (!$("#protocol").is(":checked")) {
            alert("请阅读并同意用户协议！");
            return;
        }

        /* 003-发送网络请求把注册相关的信息提交给服务器 */
        let data = {
            username: $.trim($("#mobileusername").val()),
            password: md5($.trim($("#passwordA").val())).substr(0, 10),
            phone: $.trim($("#mobileNumber").val())
        }

        $.ajax({
            data,
            type: "get",
            dataType: "json",
            url: "../../../server/form_zhuce.php",
            success(response) {
                // console.log(response);
                /* 如果注册成功，那么就先提示用户然后再跳转 */
                if (response.status == "success") {
                    alert(response.msg);
                    window.location.href = "http://www.banggo.com";
                } else {
                    alert(response.msg);
                }
            }
        })

    })
})