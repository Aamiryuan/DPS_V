/**
 * Created by tt on 2017/2/21.
 */
(function ($) {
    $("aside").load("../views/nav.html", function () {
        /*导航部分*/
        $("#drugs").on("mouseover",function () {
            $(".Detailed").show();
        }).on("mouseout",function () {
            $(".Detailed").hide();
        });
        /*滚动条*/
        $("#leftInfo").niceScroll({
            cursorcolor: "#4eb791",
            cursoropacitymax: 1,
            touchbehavior: false,
            cursorwidth: "5px",
            cursorborder: "0",
            cursorborderradius: "5px"
        });
        $("#rightInfo").niceScroll({
            cursorcolor: "#4eb791",
            cursoropacitymax: 1,
            touchbehavior: false,
            cursorwidth: "5px",
            cursorborder: "0",
            cursorborderradius: "5px"
        });



        /*遍历数据*/
        $.getJSON("../data/test2/list1.json", function (data) {
            var type = $(".borderSolid1 .active").find("span").text();
            var html = "";
            for (var i = 0; i < data[type].length; i++) {
                if(data[type][i]=="化学原料药-麻醉药") {
                    html += "<li class='active'><a href='#'>" + data[type][i] + "</a></li>"
                }else{
                    html += "<li><a href='#'>" + data[type][i] + "</a></li>"
                }
            }
            var currentType = "阿司匹林";
            $("#leftInfo").html(html).find("li").bind("click", function (e) {
                e.stopPropagation();
                $(this).addClass("active").siblings().removeClass("active");
                var type = $(this).find("a").text();
                var html = "",that=$(this);

                $.getJSON("../data/test2/list2.json", function (data) {
                    var page = $("html").attr("page");
                    for (var i = 0; i < data[type].length; i++) {
                        if(data[type][i]==currentType && !page) {
                            html += "<li class='current'><a href='#'>" + data[type][i] + "</a></li>"
                        }else{
                            html += "<li><a href='#'>" + data[type][i] + "</a></li>"
                        }
                    }
                    $("#rightInfo").html(html).find("li").each(function (index) {

                        $(this).on("click", function () {
                            $(this).addClass("current").siblings().removeClass("current");
                            currentType = $(this).find("a").text();

                            if($("#pageWrapper").length==1){
                                $(".minTitle").eq(0).html($("aside>ul>li.active a").find("span").html());
                                $(".minTitle").eq(1).html(that.find("a").html());
                                $(".minTitle").eq(2).html($(this).find("a").html());
                            }
                        })
                    });
                    if(page){
                        return
                    }
                    $("#rightInfo .current").click();
                });
            });
            $("#leftInfo .active").click();
        });

    });


   /* $("aside").load("../views/aa.html", function () {

    })*/
})(jQuery);