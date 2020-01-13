$(() => {

    $(".t1").click(function () {
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        $("#login_type_name").text("用户名：");
        $("#login_type_pwd").text("登录密码：");
    })
    $(".t2").click(function () {
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        $("#login_type_name").text("手机号：");
        $("#login_type_pwd").text("登录密码：");
    });
    $(".t3").click(function () {
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        $("#login_type_name").text("卡 号：");
        $("#login_type_pwd").text("卡密码：");
    });

    $("#log_btn").click(function () {
        let username = $.trim($("#username").val());
        let password = $.trim($("#password").val());

        if (username.length == 0) {
            alert("请输入用户名");
            return;
        }

        if (password.length == 0) {
            alert("请输入密码")
            return;
        }

        let data = {
            username,
            password: md5(password).substr(0, 10)
        }

        $.ajax({
            type: "post",
            url: "../../../server/form_denglu.php",
            data,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    window.location.href = "http://127.0.0.1/--banggo--/banggo/banggo/client/src/html/index111.html";
                    saveCookie();
                } else {
                    alert(response.msg);
                }
            }
        });
    })
})

function saveCookie() {
    if ($("#rememberUsername").is(":checked")) {
        $.cookie('username', $("#username").val(), {
            expires: 30
        });
        $.cookie('password', $("#password").val(), {
            expires: 30
        });
    }
}

function savePaw() {
    if (!$("#rememberUsername").is(":checked")) {
        $.cookie('username', '', {
            expires: -1
        });
        $.cookie('password', '', {
            expires: -1
        });
        $("#username").val('');
        $("#password").val('');
    }
}
