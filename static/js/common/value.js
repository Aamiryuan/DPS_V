
var valueBox = {
	init:function (value,opt,title){
	        value = value.split("");
	        var valueBox = document.createElement("div");
	        valueBox.style.padding ="0 5%";
			var box = document.createElement("span");
	        for(var i=0;i<value.length;i++){
	            var item = document.createElement("span");
	            item.style.marginLeft = opt.marginLeft||'2.5%';
	            item.style.display='inline-block';
	            item.style.width = opt.width||"auto";
	            item.style.height = opt.height||'auto';
	           	item.style.padding = opt.padding||'1.25%';
	            item.style.fontSize = opt.fontSize||"14px";
	            item.style.color = "#faa238";
	            /*item.style.lineHeight = opt.lineHeight||"32px";*/
	            item.style.textAlign = "center";
	            item.style.border = '1px solid #00849f';
	            item.style.borderRadius = "1px";
	            item.innerText = value[i];
	            $(box).append($(item));
	        }
       		$(valueBox).append($(box));
	        var valueTitle = document.createElement("span");
	        valueTitle.innerText=title+":";
        	valueTitle.style.width="25%";
	     /*   valueTitle.style.padding = opt.padding||'3px';*/
        	valueTitle.style.display='inline-block';
	        $(valueBox).prepend($(valueTitle));
	        //var valueImg = document.createElement("img");
	        //valueImg.style.float='right';
	        //valueImg.setAttribute("src","../static/img/ss_jt.png");
	         //$(valueBox).append($(valueImg));
	        return valueBox;
	}
};
