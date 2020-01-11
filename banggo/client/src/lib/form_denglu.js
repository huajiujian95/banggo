$(() => {
    $(".t1").click(function() {
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        $("#login_type_name").text("用户名：");
        $("#login_type_pwd").text("登录密码：");
    })
    $(".t2").click(function() { 
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        $("#login_type_name").text("手机号：");
        $("#login_type_pwd").text("登录密码：");
    });
    $(".t3").click(function() {
        $(this).addClass("cstyle").siblings().removeClass("cstyle");
        $("#login_type_name").text("卡 号：");
        $("#login_type_pwd").text("卡密码：");
    });

    $("#log_btn").click(function() {
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
            password: md5(password).substr(0,10)
        }

        $.ajax({
            type: "post",
            url: "../../../server/form_denglu.php",
            data,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    window.location,href = "http://www.banggo.com"
                } else {
                    alert(response.msg);
                }
            }
        });
    })
})