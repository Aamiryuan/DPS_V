var progressBarBox = {
    init:function (boxwidth,boxHeight,padWidth,padHeight) {
        var progressBarBox = document.createElement("p");
        progressBarBox.style.width = boxwidth?boxwidth:'100%';
        progressBarBox.style.height = boxHeight;
        progressBarBox.style.border = '1px solid #00bfe3';
        progressBarBox.style.borderRadius = '3px';
        progressBarBox.style.backgroundColor = '#000';
        progressBarBox.style.paddingRight = '2px';
        progressBarBox.style.overflow = 'hidden';
        var progressBar = document.createElement("i");
        progressBar.style.width = padWidth;
        progressBar.style.display = 'inline-block';
        progressBar.style.border = '1px solid #0086fb';
        progressBar.style.borderRadius = '0px';
        progressBar.style.background = 'linear-gradient(to right, #39c7e2 , #55fd9a,#39c7e2)';
        progressBar.style.height = padHeight;
        progressBarBox.appendChild(progressBar);
        return progressBarBox;
    }
};