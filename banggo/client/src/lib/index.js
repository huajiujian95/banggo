
// ------------------导航二级菜单事件--------------------
$(() => {
    $(function () {
        $('[class=textAdvert]').click(function () {
            if ($(this).attr('textlink'))
                var url = encodeURI($(this).attr('textlink'));
            window.location.href = url;
        });
        // 点击效果出现，隐藏
        $('.mbshop_home_Veo_classify_shopping').mouseenter(function (event) {
            $('.mbshop_home_page_V_sub_nav_box1').show();
        });
        $('.mbshop_home_Veo_classify_shopping').mouseleave(function (event) {
            $('.mbshop_home_page_V_sub_nav_box1').hide();
        });
    });

    // 菜单栏小li的划上效果
    ; (function () {
        $.fn.mbshop_home_page_V_sub_nav = function (options) {
            // 菜单选项栏
            var sub_nav_menuli = options.sub_nav_menuli;
            // 弹框盒子名称
            var sub_nav_pop = options.sub_nav_pop;
            // 显示等待时间
            var sub_nav_wait = options.sub_nav_wait;
            // 右移时间
            var sub_nav_Rmove = options.sub_nav_Rmove;
            // 左移时间
            var sub_nav_Lmove = options.sub_nav_Lmove;
            // 隐藏时间
            var sub_nav_hide = options.sub_nav_hide;

            sub_nav_menuli.mouseenter(function (event) {
                var sub_nav_menu = $(this).find(sub_nav_pop);

                sub_nav_menu.stop().animate({ 'opacity': '0', 'z-index': '120' }, sub_nav_wait, function () {
                    sub_nav_menu.show();
                    sub_nav_menu.css('opacity', '1');
                    $(sub_nav_menu).find('img').each(function () {
                        $(this).attr('src', $(this).data('original'));
                    });
                });
            });
            // 菜单栏小li的离开效果
            sub_nav_menuli.mouseleave(function (event) {
                var sub_nav_menu = $(this).find(sub_nav_pop);
                sub_nav_menu.stop().animate({ 'opacity': '0', 'z-index': '1' }, sub_nav_hide, function () {
                    sub_nav_menu.css('display', 'none');
                });
            });

        }
    })(jQuery)
    /*banner_left开始*/
    $('.mbshop_home_new_classify').mbshop_home_page_V_sub_nav({
        // 菜单选项栏
        sub_nav_menuli: $('.new_category_list li'),
        // 弹框盒子名称
        sub_nav_pop: '.category_hover_wrap',
        // 显示等待时间
        sub_nav_wait: 30,
        // 右移时间
        sub_nav_Rmove: 300,
        // 左移时间
        sub_nav_Lmove: 100,
        // 隐藏时间
        sub_nav_hide: 200
    });
    /*banner_left结束*/
})

// ------------------轮播图--------------------
$(() => {
    class Lunbotu {
        constructor() {
            this.index = 0;
            this.timer = null;
            this.len = 5;
        }

        init() {
            this.getMouseenter();
            this.autoPlayer();
            this.eventMouseHandler();
        }

        getMouseenter() {
            $(".mbshop_home_page_new_banner_pic_nav li").mouseenter(function () {
                $(this).addClass("mbshop_home_page_new_banner_nav_click").siblings().removeClass("mbshop_home_page_new_banner_nav_click");
                let index = $(this).index();
                // console.log(index);
                $(".mbshop_home_page_V_banner_pic li").eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
            })
        }

        autoPlayer() {
            this.timer = setInterval(() => this.next(), 1500);

        }

        next() {
            this.index++
            // console.log(this.index);
            if (this.index == this.len) {
                this.index = 0;
            }
            $(".mbshop_home_page_new_banner_pic_nav li").eq(this.index).addClass("mbshop_home_page_new_banner_nav_click").siblings().removeClass("mbshop_home_page_new_banner_nav_click");

            $(".mbshop_home_page_V_banner_pic li").eq(this.index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        }

        eventMouseHandler() {
            $(".mbshop_home_page_new_banner_pic_nav li,.mbshop_home_page_V_banner_pic li").mouseenter(() => {
                // console.log("+++",this.timer);
                clearInterval(this.timer)
            });
            $(".mbshop_home_page_new_banner_pic_nav li,.mbshop_home_page_V_banner_pic li").mouseleave(() => {
                this.autoPlayer(this.index = this.index - 1);
            });
        }
    }

    let lunbo = new Lunbotu();
    lunbo.init();
})