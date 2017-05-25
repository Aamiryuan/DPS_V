
$("#leftNav").load("../views/leftNav.html",function(){
    var url = window.location.pathname.split("/");
    url = url[url.length-1];
    var li = $("#leftNav li");
    for(var i=0;i<li.length;i++){
        if($(li[i]).find('a').attr('href')===url){
           $(li[i]).addClass('active').siblings('li').removeClass('active')
        }
    }
});