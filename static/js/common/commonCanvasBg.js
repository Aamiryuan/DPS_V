/**
 * Created by pc on 2017/3/20.
 */
var commonCanvas = {
    //背景
    commonCanvasBg: function (contextId, wds, hgs) {
        var conCanvas = document.getElementById(contextId),
            context = conCanvas.getContext("2d");
        conCanvas.width = wds;
        conCanvas.height = hgs;
        context.clearRect(0, 0, wds, hgs);
        this.drawRectGradients(context, 0, 4, wds, 4, "rgba(11, 84, 131, 0.6)", "#01BDE2");
        this.drawRectGradients(context, 4, 0, 4, hgs, "rgba(11, 84, 131, 0.6)", "#01BDE2");
        this.drawRectGradients(context, 4, hgs - 4, wds - 4, hgs - 4, "rgba(11, 84, 131, 0.6)", "#01BDE2");
        this.drawRectGradients(context, wds - 4, 4, wds - 4, hgs, "rgba(11, 84, 131, 0.6)", "#01BDE2");
        this.drawRectBackground(context, 3, 4, wds - 7, hgs - 7, 180, 250);  //背景
        /*drawLineDomeLian(context, 4, 32, 4, 4, 32, 4, 8, "round", "#1781EC");
         drawLineDomeLian(context, wds-32, 4, wds-4, 4,wds-4, 32, 8, "round", "#1781EC");
         drawLineDomeLian(context, 4,hgs-32, 4, hgs-5, 32,hgs-5, 8, "round", "#1781EC");
         drawLineDomeLian(context,wds-32,hgs-3,wds-4,hgs-3,wds-4,hgs-32, 8, "round", "#1781EC");*/
    },

//背景颜色
    drawRectBackground: function (context, axisX, axisY, widths, heights, height01, radius) {
        var sl = 0.5;
        context.save();
        context.scale(1, sl);
        var gradient = context.createRadialGradient(200, height01 / sl, 10, 200, height01 / sl, radius);
        gradient.addColorStop(0, "rgba(11, 84, 131, 0.01)");
        gradient.addColorStop(0.5, "rgba(11, 84, 131, 0.1)");
        gradient.addColorStop(1, "rgba(11, 84, 131, 0.2)");
        context.beginPath();
        context.fillStyle = gradient;
        context.fillRect(axisX, axisY, widths, heights / sl);
        context.closePath();
        context.restore();
    },

//拐角
    drawLineDomeLian: function (context, xm, ym, xl, yl, xl01, yl01, lineWidths, lineJoins, colors) {
        context.beginPath();
        context.moveTo(xm, ym);
        context.lineTo(xl, yl);
        context.lineTo(xl01, yl01);
        context.lineWidth = lineWidths;
        context.lineJoin = lineJoins;
        context.strokeStyle = colors;
        context.stroke();
        context.closePath();
    },
//渐变
    drawRectGradients: function (context, axisX, axisY, axisXl, axisYl, colorsSe, colorsMi) {
        var widths = axisXl - axisX == 0 ? 1 : Math.abs(axisXl - axisX),
            gradient = context.createLinearGradient(axisX, axisY, axisXl, axisYl);
        var heights = axisYl - axisY == 0 ? 1 : Math.abs(axisYl - axisY);
        gradient.addColorStop(0, colorsSe);
        gradient.addColorStop(0.5, colorsMi);
        gradient.addColorStop(1, colorsSe);
        context.save();
        context.beginPath();
        context.fillStyle = gradient;
        context.fillRect(axisX, axisY, widths, heights);
        context.closePath();
        context.restore();
    }
};
