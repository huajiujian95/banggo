$(() => {
    $("#headID").load("./header.html");
    $("#footID").load("./footer.html");
})

// -------渲染商品列表-------
$(() => {

    let type = "default";

    $.ajax({
        type: "get",
        url: "../../../server/list-page.php",
        dataType: "json",
        success: function (response) {
            
            let count = response.count;
            let html = "";
            for (let i = 0; i < count; i++) {
                html += ` <a href="javascript:;">${i + 1}</a>`;
            }
            $(".mbshop_publicPagination").html(html);
            getPage(1, type);
            // console.log(html);
        }
    });

    $(".mbshop_publicPagination").on("click", "a", function () {
        // console.log(`success`);
        
        let index = $(this).index();
        getPage(index + 1, type);
    });

    $(".mbshop_pdFilterItem").on("click","a", function () {

    });


    function getPage(index, type) {
        $.ajax({
            type: "get",
            url: "../../../server/list.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (response) {
                // console.log(response);
                renderUI(response, index);
            }
        })
    };

    function renderUI(_data, index) {

        let html = _data.map((item) => {

            return ` <li class="mbshop_listPdCon">
            <a href="" class="mbshop_listPdImg" id="mbshop_listPdImg" target="_blank">
            
                <img src=${item.src} style="display: block;">
            <div class="rigth_bottom product_tag_layout">
            <img src="https://img.banggo.com/sources/cms/banggo2017/PC/bq191820_5.png" alt="通栏">
            <div class="active-price-box">
            <span class="active-price"><label></label></span>
                        </div>
                    </div>
                                
            </a>
            <span class="mbshop_listPdText fl goodlist_brandname">
            ${item.storeName}
                    
                    </span> 
            <span class="mbshop_listPdText fl">
            ${item.title}</span> 
            <span class="mbshop_listPdText">
                    <b>${item.price}</b>
                    
                    </span>
            
            
            
        </li>`
        }).join("");
        $(".mbshop_listPdBox").html(html);

        $(".mbshop_publicPagination").children("a").eq(index - 1).addClass("currentPage").siblings().removeClass("currentPage");
    };

})