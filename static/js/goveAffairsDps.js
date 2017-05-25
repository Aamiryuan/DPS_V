/**
 * Created by windowss on 2017/5/19.
 */

var G_domaint="https://github.com/Aamiryuan/DPS_V/blob/master/data/";
var paths={
    "getDataGrab":G_domaint+'data/getDataGrab.json',
    "getGrabData":G_domaint+'data/getGrabData.json',
    "getProvideData":G_domaint+'data/getProvideData.json',
    "getBigDataManage1":G_domaint+'data/getBigDataManage1.json',
    "getWarningInfo":G_domaint+'data/getWarningInfo.json',     //1.4
    "getDeveloperInfo":G_domaint+'data/getDeveloperInfo.json',                //3.2
    "getSaveProcess":G_domaint+'data/getSaveProcess.json',          //2.1
    "getDataProvide":G_domaint+'data/getDataProvide.json',
    "getDataSave":G_domaint+'data/getDataSave.json'
};







$(function () {
    postFu(paths["getDataGrab"],
        function(data){
            //console.log(data);
        },function(data){});




    $("#timeDps").html(formatTime());
    setInterval(function(){
        $("#timeDps").html(formatTime());
        },1000);

//  R1
    setInterval(function(){
        serverRunFun();
        daasRanFun();
        paasRanFun();},5000);
//  L2
    setInterval(function(){
        halfAnHour();

    },1800000);
    halfAnHour();
    function halfAnHour(){
        //1.2  警告一览
        postFu(paths["getWarningInfo"],
            function(data){
                $(".serverRunZm").html(data.zhiming);
                $(".serverRunYz").html(data.yanzhong);
                $(".serverRunJg").html(data.jinggao);
                $(".serverRunZy").html(data.zhuyao);

                var valArr=[
                    {value:data.zhiming, name:'致命'},
                    {value:data.yanzhong, name:'严重'},
                    {value:data.jinggao, name:'警告'},
                    {value:data.zhuyao, name:'主要'}
                ];
                $("#serverTotals").html(data.total);
                serverWarnFun(valArr);
            },function(data){});

        //2.1数据储存情况
        postFu(paths["getSaveProcess"],
            function(data){
                var stoData=[];
                var cleData=[];
                var desData=[];
                var arry=[];
                for(var i=0;i<data.data.ruku.length;i++){
                    var second = new Date().getTime();
                    second =second-1800000*i;
                    stoData.push(data.data.ruku[i].value*1);
                    cleData.push(data.data.qingxi[i].value*1);
                    desData.push(data.data.tuomin[i].value*1);
                    arry.push(timeChange(second));
                };
                arry=arry.reverse();
                //2.1.1入库量代码
                /*-------------   2     ---------------*/
                storageCleaDese("daasStorage",stoData,arry, "入库量(GB)");
                //2.1.2清洗量代码
                storageCleaDese("daasClean",cleData,arry, "清洗量(GB)");
                //2.13脱敏量代码
                storageCleaDese("daasDesensitization",desData,arry, "脱敏量(GB)");


            },function(data){});

        //3.2 平台开发者人数信息
        postFu(paths["getDeveloperInfo"],
            function(data){
                var arry=[],dataArr=[];
                for(var i=6;i>0;i--){

                    var second = new Date().getTime();
                    second =second-1800000*(i-1);
                    arry.push(timeChange(second));
                }
                for(var i=0;i<6;i++){
                    dataArr.push(data.list[i]);

                }
                discountFigure(arry,dataArr);
            },function(data){});

    }

    //1. 服务器运行状态
    serverRunFun();
    var spanActive=$("#servRun span"),initServer= 0,initsSers=0;
    function serverRunFun(){
        //1.服务器运行状态
        cupStatuFun(ran(0,30,60),"cpuStatu");
        cupStatuFun(ran(0,40,70),"neicunStatu");
        for(var i=0;i<4;i++){
            var datas=ran(2,45,90);
            $("#serRunFenqu li").eq(i).find("span").html(datas+"%");
            $("#serRunFenqu li").eq(i).find("i").css("width",String(datas/100*3.4)+"vw");
        };

        //1.1.3 本地连接情况
        if(ran(0,0,2)==0){
            $("#serverYc").html("接口正常");
        }else{
            $("#serverYc").html("接口异常");
        }



        //1.3  各服务器CPU利用率
        cpuUseRatioFun([ran(0,30,60),ran(0,30,60),ran(0,30,60),ran(0,30,60),ran(0,30,60)]);

        //1.4.1  服务器


        if(initsSers==1){
            spanActive.removeClass("actives");
            spanActive.eq(initServer).addClass("actives");
            if(initServer==4){initServer=0;}else{initServer+=1;}
            initsSers=0;
        }else{
            initsSers+=1;
        }


        var datas=ran(0,40,49);
        $("#cpuWendu li").eq(1).find("span").html(datas+"°");
        $("#cpuWendu li").eq(2).find("span").html(datas-4+"°");
        $("#cpuWendu li").eq(3).find("span").html(datas-1+"°");
    }

    // 1.4.2   内存利用率
    storUseRatioFun(ran(0,30,60));

    //2.Daas运行情况
    /*------------------底栏 动画-----B1----------------------*/
    var showBot = document.getElementById('canvasNav'),
        cxtBot = showBot.getContext('2d');

    function senWord(context, text, x, y,colors) {
        context.beginPath();
        context.font = "normal 24px 微软雅黑";
        context.textAlign = "left";
        context.fillStyle =colors;
        context.fillText(text, x, y);
        context.closePath();
    };

    drawGuang(0);
    function drawGuang() {
        /*drawClear(cxtBot, 1, 0, 0, 640,20);
        drawRectGradients(cxtBot, 1, 30, 9, 620,10, "#214092", "#214092");
        drawRect(cxtBot, 1, 20, 3, 15, 15, "#214092");
        drawRect(cxtBot, 1, 605,3, 15, 15, "#214092");
        drawClear(cxtBot, 1, 80, 0, 90, 20);
        drawClear(cxtBot, 1, 280, 0, 90, 20);
        drawClear(cxtBot, 1, 480, 0, 90, 20);

        senWord(cxtBot, '数据入库',100, 15,"#ffdc7a");
        senWord(cxtBot, '数据清洗量',295,15,"#0adfc1");
        senWord(cxtBot, '数据脱敏量',495,15,"#00b9f2");*/

        drawClear(cxtBot, 1, 0, 0,1280,40);
        drawRectGradients(cxtBot, 1, 60, 18,1240,20, "#214092", "#214092");
        drawRect(cxtBot, 1, 40, 6,30,30, "#214092");
        drawRect(cxtBot, 1,1210,6,30,30, "#214092");
        drawClear(cxtBot, 1,160, 0,180, 40);
        drawClear(cxtBot, 1,560, 0,180, 40);
        drawClear(cxtBot, 1,960, 0,180, 40);

        senWord(cxtBot, '数据入库',200,30,"#ffdc7a");
        senWord(cxtBot, '数据清洗量',590,30,"#0adfc1");
        senWord(cxtBot, '数据脱敏量',990,30,"#00b9f2");





    };





    daasRanFun();
    function daasRanFun(){

        //2.2  Daas占用资源情况
        postFu(paths["getBigDataManage1"],
            function(data){
                dataCluster(JSON.parse(data.data.clusterload).arr1,JSON.parse(data.data.clusterload).arr2);//
                dataCpu(JSON.parse(data.data.cpuUseNum).arr1,JSON.parse(data.data.cpuUseNum).arr2);
                dataWeb(JSON.parse(data.data.netUseNum).arr1,JSON.parse(data.data.netUseNum).arr2);//
                dataMemory(JSON.parse(data.data.romUseNum).arr1,JSON.parse(data.data.romUseNum).arr2);//
            },function(data){});

        //2.3.1 数据抓取
        postFu(paths["getDataGrab"],
            function(data){
                var captureX = [];
                var captureS = [];
                for (var i = 0; i < data.list.length; i++){
                    captureX.push(data.list[i].id);
                    captureS.push(data.list[i].num);
                }
                var maxY = (data.max * 1.12 / 100).toFixed(2) * 100;
                var minY = (data.min / 1.2 / 100).toFixed(2) * 100;
                capture(captureX, captureS, data.min, data.max, minY, maxY);
            },
            function(data){}
        );

        //2.3.3  数据供应
        postFu(paths["getDataProvide"],
            function(data){
                var arr = [],
                    arrList = [];
                for (var i = 0; i < data.length; i++) {
                    arr.push(data[i].providername + ',' + data[i].providesize);
                    var list = arr[i].split(',');
                    arrList.push(list)
                }

                drawCon(0, arrList);
            },
            function(data){}
        );

        //2.3.4
        severFn();
    }
    //2.32  数据任务
    setOneHourData();

    //3.Paas运行情况
    paasRanFun();

    function paasRanFun(){
        var tabTr=$("#tablesPass tr");
        var initArr=[1214924,714924,614924,314924,914924],
            tabArr=[initArr[0]+ran(0,0,1000),
                    initArr[1]+ran(0,0,1000),
                    initArr[2]+ran(0,0,1000),
                    initArr[3]+ran(0,0,1000),
                    initArr[4]+ran(0,0,1000)];

        for(var i=1;i<tabTr.length;i++){
            tabTr.eq(i).find("td").eq(1).html('<span>'+ran(2,5,15)+'</span>%');
            tabTr.eq(i).find("td").eq(2).html('<span>'+ran(2,10,15)+'</span>%');
            tabTr.eq(i).find("td").eq(3).html('<span>'+tabArr[i-1]+'</span>Mb');

        }

        var nameValKf=[
            {"name":"大数据统计","value":tabArr[4]},
            {"name":"安全治理","value":tabArr[3]},
            {"name":"双创服务","value":tabArr[2]},
            {"name":"指数决策","value":tabArr[1]},
            {"name":"政务治理","value":tabArr[0]}
        ];

        //各Paas开发者人数占比
        paasRunsFun(nameValKf,"paasRunKf");

    }


    //各Paas应用数占比
    var nameValYy=[
        {"name":"大数据统计","valueue":12},
        {"name":"安全治理","value":4},
        {"name":"双创服务","value":11},
        {"name":"指数决策","value":4},
        {"name":"政务治理","value":10}
    ];
    paasRunsFun(nameValYy,"paasRunYy");



    //4.Saas运行情况
    saasRanFun();
    function saasRanFun(){
        //4.1各应用使用者比例及应用服务数
        var nameVal=[
            {"name":"产业地图可视化","value":15},
            {"name":"舆情管家","value":2},
            {"name":"宏观经济监测平台","value":4},
            {"name":"军民融合指数","value":9},
            {"name":"企业全息画像","value":9},
            {"name":"数据主权区块链基础平台","value":9},
            {"name":"数据共享及创新服务平台","value":9},
            {"name":"营商指数","value":9},
            {"name":"转基因","value":9},
            {"name":"一带一路数智平台","value":9},
            {"name":"双创指数","value":9},
            {"name":"感信息管理与防泄露系统","value":16}
        ];
        fnProduct(nameVal);
        //4.2使用分布情况
        medicineMap("name");
    }
});










/*----------------------------  1 ---------------------------*/

function cupStatuFun(datas,idname){
    var myChart = echarts.init(document.getElementById(idname));
    var option = {

        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },



        series: [
            {
                name: '业务指标',
                type: 'gauge',
                radius: '125%',
                center: ['50%', '80%'],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[datas/100, '#2b96c4'],[1, '#394264']],
                        width:6
                    }
                },
                startAngle: 185,
                endAngle:-5,
                splitLine: {
                    show:false

                },
                axisTick: {
                    show:false
                },
                axisLabel: {
                    show:false,
                    interval:1,
                    distance: 5,
                    color: '#fff',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    }
                },
                pointer: {
                    show: true,
                    length: '1%',
                    width:1
                },
                itemStyle: {
                    normal: {
                        color: '#2b96c4',
                        borderWidth:0,
                        borderColor: '#f00',
                        borderType: 'solid'
                    }
                },
                detail: {formatter:'{value}%',
                    offsetCenter: [0, '-25%'],
                    textStyle: {
                        color: '#fff',
                        fontSize:14
                    }
                },
                data: [{value:datas, name: ''}]
            }
        ]
    };

    myChart.setOption(option);
}

//警告一览
function serverWarnFun(datas){
    var myChart = echarts.init(document.getElementById('serverWarn'));
    var option = {
        title: {
            text: 'CRM资源组的告警',
            textStyle:{
                color:'#fff',
                fontWeight:'normal',
                fontSize:12
            },
            right:'4%',
            top:4
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: '10',
            y:'100%',
            textStyle: {
                color: '#fff',
                fontStyle: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 12
            },
            data:['致命','严重','警告','主要']
        },
        color:['#2b96c4','#394264','#5a648a','#ffa900'],
        series: [
            {
                name:'CRM资源组的告警',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                detail: {formatter:'{value}%',
                    offsetCenter: [-5, '65%'],
                    textStyle: {
                        color: '#ffa900',
                        fontSize:22
                    }
                },
                data:datas
            }
        ]
    };
    myChart.setOption(option);
}
//各服务器CPU利用率
function cpuUseRatioFun(bangData){

    var myChart = echarts.init(document.getElementById('cpuUseRatio'));
    var option = {
        title: {
            text: '全部的CPU利用率',
            textStyle:{
                color:'#fff',
                fontWeight:'normal',
                fontSize:12
            },
            right:'4%',
            top:4
        },
        grid: {
            left: "10%",
            top: "12%",
            right: "6%",
            bottom: "15%"
        },
        tooltip: {show: false},

        xAxis: {
            nameLocation: "middle",
            nameTextStyle: {
                color: "#ffce93",
                fontSize: 12
            },
            nameGap: 26,
            splitLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            axisLine: {
                lineStyle: {
                    color: "#394264"
                }
            },
            axisLabel: {
                textStyle: {
                    color: "#fff",
                    fontSize:12
                }
            },
            data: ["服务器1","服务器2","服务器3","服务器4","服务器5"]
        },
        yAxis: {
            nameLocation: "middle",
            min: 0,
            max:100,
            nameTextStyle: {
                color: "#ffce93",
                fontSize: 12
            },
            nameGap: 5,
            splitLine:{
                show:false
            },
            axisTick:{
                show:false
            },
            axisLine: {
                lineStyle: {
                    color: "#394264"
                }
            },
            axisLabel:{
                show:true,
                margin:5,
                textStyle: {
                    color: "#fff",
                    fontSize:12
                }
            }

        },
        series: [{
            name: 'CPU利用率',
            type: 'bar',
            barWidth : 30,
            label:{
                normal: {
                    show: true,
                    position: "top",
                    formatter: "{c}%",
                    textStyle: {
                        color: "#fff",
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color:"#ffab00"
                }
            },
            data: bangData
        }]
    };
    myChart.setOption(option);
}
//    内存利用率
function storUseRatioFun(vaData){
    var myChart = echarts.init(document.getElementById('storUseRatio'));
    var option = {
        title: {
            text: '内存利用率',
            subtext: '',
            left: 'center',
            top:2,
            textStyle: {
                color: '#fff',
                fontWeight:'100',
                fontSize: 12
            }
        },
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },

        series: [
            {
                name: '业务指标',
                type: 'gauge',
                radius: '85%',
                center: ['50%', '60%'],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#9a7533'],[1, '#394264']],
                        width:16
                    }
                },
                splitLine: {
                    show: true,
                    length:15,
                    lineStyle: {
                        color:'#616c97',
                        width:3
                    }

                },
                axisTick: {
                    show: true,
                    splitNumber: 5,
                    length:4,
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color:'#616c97',
                        width:1
                    }
                },
                axisLabel: {
                    show: true,
                    interval:1,
                    distance: 5,
                    color: '#fff',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12
                    }
                },
                pointer: {
                    show: true,
                    length: '60%',
                    width:4
                },
                itemStyle: {
                    normal: {
                        color: '#2b96c4',
                        borderWidth:0,
                        borderColor: '#f00',
                        borderType: 'solid'
                    }
                },
                detail: {formatter:'{value}%',
                    offsetCenter: [0, '65%'],
                    textStyle: {
                        color: '#ffa900',
                        fontSize:22
                    }
                },
                data: [{value:vaData, name: ''}]
            }
        ]
    };
    myChart.setOption(option);
    setInterval(function () {
        option.series[0].data[0].value =ran(0,20,60);
        myChart.setOption(option, true);
    },5000);
}


function timeChange(cellval){
    var date = new Date(cellval);
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() >= 30 ? "30" : "00";
    return hour + ":" + minute;
};

/*-------------  2 ---------R1-------------*/

function storageCleaDese(idName, stoData, dataX, nameX) {
    var maxs=0;
    for(var i=0;i<stoData.length;i++){
        maxs<stoData[i]? maxs=stoData[i]:"";
    }


    var myChartA = echarts.init(document.getElementById(idName));
    // 指定图表的配置项和数据
    var optionA = {
        /*tooltip : {
         trigger: 'axis'
         },*/
        grid: {
            left: '9%',
            right: '7.5%',
            bottom: '3%',
            top: '20%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    //interval: '0',
                    textStyle: {
                        color: '#9ea3ab'
                    }
                },
                splitLine: {
                    show: true,
                    interval: '0',
                    lineStyle: {
                        color: '#272c34'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#272c34'
                    }
                },
                //data : ['22:00','22:30','23:00','23:30','00:00','00:30']
                data: dataX
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: nameX,
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#50e8ff',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'sans-serif',
                    fontSize: 10
                },
                nameGap: 8,
                min: 0,
                max:maxs,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea3ab'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#272c34'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#272c34'
                    }
                }
            }
        ],
        series: [
            {
                name: '入库量',
                type: 'line',
                stack: '总量',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ["#50acfe"];
                            return colorList[params.dataIndex]
                        },
                        lineStyle: {
                            color: '#50acfe'
                        }
                    },
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(3, 23,83,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(3, 23,83,1)'
                        }]),
                    }
                },
                //data:[200,800,600,900,700,1000]
                data: stoData,
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartA.setOption(optionA);
};


/*2.2.1集群负载*/
var myChartWL = echarts.init(document.getElementById('dataLoad'));
function dataCluster(load1,load2){
    // 指定图表的配置项和数据
    var optionWL = {
        /* tooltip : {
         trigger: 'axis'
         },*/
        grid: {
            left:'-15%',
            right:'4%',
            bottom:'-30%',
            top:'25%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六'],
                axisLine:{
                    lineStyle:{
                        color:'#677196'
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#4d5573'
                    },
                    interval:'0'
                },

            }
        ],
        yAxis : [
            {
                type : 'value',
                min:0,
                max:64,
                splitNumber :10,
                splitLine:{
                    lineStyle:{
                        color:['#4d5573','#4d5573','#4d5573','#4d5573','#ff9719','#4d5573','#4d5573','#4d5573','#4d5573','#ff9719']
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color:'#677196'
                    }
                },
            }
        ],
        series : [
            {
                name:'集群1',
                type:'line',
                stack: '总量',
                symbol:'none',
                smooth :true,
                lineStyle: {
                    normal: {
                        color:'#375e9c'
                    }
                },
                //data:[120, 132, 101, 134, 90, 230]
                data:load1
            },
            {
                name:'集群2',
                type:'line',
                stack: '总量',
                symbol:'none',
                smooth :true,
                lineStyle: {
                    normal: {
                        color:'#ff9719'
                    }
                },
                //data:[220, 182, 191, 234, 290, 330]
                data:load2
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartWL.setOption(optionWL);
    /*var time=null;
     time=setInterval(function(){
     myChartWL.setOption(optionWL);
     },60000);*/
};

/*2.22CPU使用量*/
var myChartW = echarts.init(document.getElementById('dataCpu'));
function dataCpu(cpu1,cpu2){
    // 指定图表的配置项和数据
    var optionW = {
        /*tooltip : {
         trigger: 'axis'
         },*/
        grid: {
            left:'-20%',
            right:'4%',
            bottom:'-30%',
            top:'25%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六'],
                axisLine:{
                    lineStyle:{
                        color:'#677196'
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#4d5573'
                    },
                    interval:'0'
                },

            }
        ],
        yAxis : [
            {
                type : 'value',
                min:0,
                max:200,
                splitNumber :10,
                splitLine:{
                    lineStyle:{
                        color:['#4d5573','#4d5573','#4d5573','#4d5573','#40ce42','#4d5573','#4d5573','#4d5573','#4d5573','#40ce42']
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color:'#677196'
                    }
                },
            }
        ],
        series : [
            {
                name:'CPU使用量1',
                type:'line',
                stack: '总量',
                symbol:'none',
                smooth :true,
                /*markPoint: {
                 data: [
                 {
                 type:'max',
                 name: '最大值',*/
                /*x:'30',
                 y:'50',*/
                /*symbolSize :'0'
                 },
                 {

                 name: '最小值',
                 x:'50',
                 y:'70',
                 }
                 ]
                 },*/
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#375e9c'
                        }, {
                            offset: 1,
                            color: '#375e9c'
                        }])
                    }
                },
                lineStyle: {
                    normal: {
                        color:'#356bc1'
                    }
                },
                //data:[120, 132, 101, 134, 90, 230]
                data:cpu1
            },
            {
                name:'CPU使用量2',
                type:'line',
                stack: '总量',
                symbol:'none',
                smooth :true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#264375'
                        }, {
                            offset: 1,
                            color: '#264375'
                        }])
                    }
                },
                lineStyle: {
                    normal: {
                        color:'#40ce42'
                    }
                },
                //data:[220, 182, 191, 234, 290, 330]
                data:cpu2
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartW.setOption(optionW);
    /*var time=null;
     time=setInterval(function(){
     myChartW.setOption(optionW);
     },60000);*/
};
/*2.2.3内存使用量*/
var myChartM = echarts.init(document.getElementById('dataMemory'));
function dataMemory(romUse1,romUse2){
    // 指定图表的配置项和数据
    var optionM = {
        /*tooltip: {
         trigger: 'axis'
         },*/
        grid: {
            left: '-28%',
            right: '-16%',
            bottom: '-29%',
            top:'9%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            interval :'0',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick:{
                show:false,
            },
            axisLabel:{
                show:false,
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#4d5573',
                },
            },
            axisLine:{
                lineStyle:{
                    color:'#1f7df7',
                },
            },
        },
        yAxis: [{
            type: 'value',
            axisTick:{
                show:false,
            },
            axisLabel:{
                show:false,
            },
            splitLine:{
                show:false,
            },
            axisLine:{
                lineStyle:{
                    color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 1, color: '#1f7df7' // 0% 处的颜色
                    }, {
                        offset: 0.5, color: '#fd9913' // 100% 处的颜色
                    },{
                        offset: 0, color: '#0cc100' // 100% 处的颜色
                    }], false)
                },
            },
        },
            {
                type: 'value',
                axisTick:{
                    show:false,
                },
                axisLabel:{
                    show:false,
                },
                splitLine:{
                    show:false,
                },
                axisLine:{
                    lineStyle:{
                        color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1, color: '#1f7df7' // 0% 处的颜色
                        }, {
                            offset: 0.5, color: '#fd9913' // 100% 处的颜色
                        },{
                            offset: 0, color: '#0cc100' // 100% 处的颜色
                        }], false)
                    },
                },
            }],
        series: [
            {
                name:'内存使用量1',
                type:'line',
                step: 'start',
                //data:[80, 80, 80, 80, 90, 80, 80],
                data:romUse1,
                symbol:'none',
                lineStyle: {
                    normal: {
                        color:'#35d27e'
                    }
                },
            },
            {
                name:'内存使用量2',
                type:'line',
                step: 'middle',
                //data:[120, 120, 120, 120, 130, 120, 120],
                data:romUse2,
                symbol:'none',
                lineStyle: {
                    normal: {
                        color:'#ff9719'
                    }
                },
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartM.setOption(optionM);
    /*var time=null;
     time=setInterval(function(){
     myChartM.setOption(optionM);
     },60000);*/
};
/*2.2.4网络使用量*/
var myChartWB = echarts.init(document.getElementById('dataWeb'));
function dataWeb(use1,use2){
    // 指定图表的配置项和数据
    var optionWB = {
        /*tooltip : {
         trigger: 'axis'
         },*/
        grid: {
            left:'-20%',
            right:'4%',
            bottom:'-30%',
            top:'25%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六'],
                axisLine:{
                    lineStyle:{
                        color:'#677196'
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:'#4d5573'
                    },
                    interval:'0'
                },

            }
        ],
        yAxis : [
            {
                type : 'value',
                splitNumber :10,
                splitLine:{
                    lineStyle:{
                        color:['#4d5573','#4d5573','#4d5573','#4d5573','#9a724e','#4d5573','#4d5573','#4d5573','#4d5573','#9a724e']
                    }
                },
                axisLabel:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLine:{
                    lineStyle:{
                        color:'#677196'
                    }
                },
            }
        ],
        series : [
            {
                name:'网络使用量1',
                type:'line',
                stack: '总量',
                symbol:'none',
                smooth :true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#375e9c'
                        }, {
                            offset: 1,
                            color: '#375e9c'
                        }])
                    }
                },
                lineStyle: {
                    normal: {
                        color:'#375e9c'
                    }
                },
                //data:[120, 132, 101, 134, 90, 230]
                data:use1
            },
            {
                name:'网络使用量2',
                type:'line',
                stack: '总量',
                symbol:'none',
                smooth :true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#9a724e'
                        }, {
                            offset: 1,
                            color: '#9a724e'
                        }])
                    }
                },
                lineStyle: {
                    normal: {
                        color:'#9a724e'
                    }
                },
                //data:[220, 182, 191, 234, 290, 330]
                data:use2
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartWB.setOption(optionWB);
    /*var time=null;
     time=setInterval(function(){
     myChartWB.setOption(optionWB);
     },60000);*/
};


function capture(captureX, captureS, min, max, minY, maxY) {
    var myChart = echarts.init(document.getElementById("showSwoop"));
    var option = {
        title: {
            text: '数据抓取',
            textStyle: {
                color: '#fff',
                fontSize:11

            },
            top:0,
            left: 10
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: '{c}' + 'MB'
        },
        grid: {
            top:'30%',
            left: '5%',
            right: '20%',
            bottom: '0',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#394264'
                }

            },
            interval: 0,
            //data: ['周一','周二','周三','周四','周五','周六','周日']
            data: captureX
        },
        yAxis: {
            // position:'left',
            type: 'value',
            name: '数据/MB',
            nameGap:8,
            min: parseInt(minY),
            max: parseInt(maxY),
            splitNumber: 4,
            nameTextStyle: {
                color: '#fff',
                fontSize: 12
            },
            axisLine: {
                show:true,
                lineStyle: {
                    color: '#394264'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#00b9f2',
                    fontSize: 12
                }
            },
            splitLine: {
                show: false
            }
        },
        visualMap: {
            type: 'continuous',
            dimension: 1,
            text: ['Max', 'Min'],
            textStyle: {
                color: '#fff'
            },
            itemHeight: 60,
            itemWidth: 5,
            // inverse: true,
            calculable: true,
            min: min,
            max: max,
            top: '15%',
            right: 0,
            inRange: {
                colorLightness: [0.4, 0.8]
            },
            outOfRange: {
                color: '#faa238'
            },
            controller: {
                inRange: {
                    color: '#faa238'
                }
            }
        },
        series: [{
            name: '实时的抓取数据情况',
            type: 'line',
            //stack: '总量',
            showAllSymbol: true,
            itemStyle: {
                normal: {
                    color: '#00b9f2',
                    borderWidth:2,
                    lineStyle: {
                        color: '#faa238',
                        width: 2
                    }
                }
            },
            //data:[120, 132, 101, 134, 90, 230, 210]
            data: captureS
        }]
    }
    myChart.setOption(option);
};

//2.3.2 最近一小时处理数据任务

var Supply = document.getElementById('showDataSupply'),
    cxtSu = Supply.getContext('2d');
var SuStatic = document.createElement("canvas"),
    cxtSuStatic = SuStatic.getContext("2d");
    SuStatic.width = 400;
    SuStatic.height = 215;
var SuStaticCon = document.createElement("canvas"),
    cxtSuStaticCon = SuStaticCon.getContext("2d");
SuStaticCon.width = 350;
SuStaticCon.height = 142;

//var conArray = [["易源接口",600], ["族谱科技",200], ["易源接口",800], ["中科慧信",300], ["禧泰房产",100], ["数联寻英",100], ["八友、天玑",100]];
function drawCon(conTop, conArray) {
    //drawRect(cxtSuStaticCon,1,0,0,330,142,"#9EA8FA");
    drawClear(cxtSu, 1, 0, 0,400,215);
    drawClear(cxtSuStaticCon, 1, 0, 0, 350, 142);
    var conMax = 0;
    for (var j = 0; j < conArray.length; j++) {
        conMax = conArray[j][1] > conMax ? conArray[j][1] : conMax;
    }
    var conSl = 155 / conMax;
    // SuStatic.height = 300;
    SuStaticCon.height = 200;
    // drawLeftBgs()
    for (var i = 0; i < conArray.length; i++) {
        var width = conArray[i][1] * conSl / 5;
        drawRectGradients(cxtSuStaticCon, 1, 0, conTop + 20 * (i + 1), 340, conTop + 20 * (i + 1), "rgb(14, 40, 79)", "#049ACD");
        drawText(cxtSuStaticCon, 1, conArray[i][0], 100, conTop + 20 * (i + 1) - 1, 14, 700, "right", "#fff");
        //drawText(cxtSuStaticCon,1,conArray[i][1]+"GB",292,conTop+20*(i+1)-1,14,700,"left","#00b9f2");
        drawText(cxtSuStaticCon, 1, i + 1, 5, conTop + 20 * (i + 1) - 1, 14, 700, "left", "#fff");
        drawRect(cxtSuStaticCon, 1, 125, conTop + 20 * (i + 1) - 11, width < 5 ? 5 : width, 10, "#faa238");
        //drawRect(cxtSuStaticCon, 1, 125, conTop + 18 * (i + 1) - 11, 100, 10, "#f00")
    }
    drawRectGradients(cxtSuStaticCon, 1, 25, 0, 25, 140, "rgb(14, 40, 79)", "#049ACD");
    //drawRectGradients(cxtSuStaticCon,1,290,0,290,140,"rgb(14, 40, 79)","#f00");
    cxtSu.drawImage(SuStaticCon, 25, 48);
}




function setOneHourData() {

    $('#supply1').attr('data-size', 'hehheh');
    supplyFn1('1', '社交网络', '500');
    supplyFn2('1', '酒店数据', '500');
    getNumFn1('1', '汽车数据', '500');
    getNumFn2('1', '气象数据', '500');


    function supplyAjax1() {
        postFu(paths["getGrabData"],
            function(data){
                var dataName1, dataSizeNum1,timerClear=null;
                dataName1 = data[0].dataname;
                dataSizeNum1 = data[0].showsize;
                var setTimer=dataSizeNum1;
                if(setTimer>0 && setTimer<=100){
                    setTimer=400;
                }else if(setTimer>100 && setTimer<=400){
                    setTimer=600;
                }else if(setTimer>400 && setTimer<=800){
                    setTimer=800;
                }else if(setTimer>800 && setTimer<=3000){
                    setTimer=dataSizeNum1
                }else{
                    setTimer=3000;
                }
                $('#supply1').attr('data-name', dataName1.substr(0, 4));
                $('#supply1').attr('data-num', dataSizeNum1);
                $('#supply1').attr('data-timer', (dataSizeNum1).toFixed(0));

                var romNum = 0, romNum1 = 0, romNum2 = 1, timer = 1000;
                timerClear=setInterval(function () {
                    function getRandomInt(min, max) {
                        romNum = Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    romNum1 = romNum2;
                    romNum2 = romNum + romNum1;
                    supplyctx1.clearRect(0, 0, 100, 190);
                    supplyFn1(romNum2 >= 100 ? 100 : romNum2, $('#supply1').attr('data-name'), ((romNum2 >= 100 ? 100 : romNum2) / 100 * $('#supply1').attr('data-num')).toFixed(0));
                    if (romNum2 >= 100) {
                        clearInterval(timerClear);
                        supplyAjax1();
                        romNum = 0;
                        romNum1 = 0;
                        romNum2 = 1;
                    }
                    getRandomInt(1, 5);
                }, setTimer);
            },
            function(data){}
        );
    }

    supplyAjax1();


    function supplyAjax2(){
        postFu(paths["getProvideData"],
            function(data){
                var dataName1, dataSizeNum1,timerClear=null;
                dataName1 = data[0].dataname;
                dataSizeNum1 = data[0].showsize;
                var setTimer=dataSizeNum1;
                if(setTimer>0 && setTimer<=100){
                    setTimer=400;
                }else if(setTimer>100 && setTimer<=400){
                    setTimer=600;
                }else if(setTimer>400 && setTimer<=800){
                    setTimer=800;
                }else if(setTimer>800 && setTimer<=3000){
                    setTimer=dataSizeNum1
                }else{
                    setTimer=3000;
                }
                $('#supply2').attr('data-name', dataName1.substr(0, 4));
                $('#supply2').attr('data-num', dataSizeNum1);
                $('#supply2').attr('data-timer', (dataSizeNum1).toFixed(0));

                var romNumt = 0, romNumt1 = 0, romNumt2 = 1, timerT = 1000;
                timerClear=setInterval(function () {
                    function getRandomInt(min, max) {
                        romNumt = Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    romNumt1 = romNumt2;
                    romNumt2 = romNumt + romNumt1;
                    supplyctx2.clearRect(0, 0, 100, 190);
                    supplyFn2(romNumt2 >= 100 ? 100 : romNumt2, $('#supply2').attr('data-name'), ((romNumt2 >= 100 ? 100 : romNumt2) / 100 * $('#supply2').attr('data-num')).toFixed(0));
                    if (romNumt2 >= 100) {
                        clearInterval(timerClear);
                        supplyAjax2();
                        romNumt = 0;
                        romNumt1 = 0;
                        romNumt2 = 1;
                    }
                    //console.log(parseInt($('#supply2').attr('data-timer')))
                    getRandomInt(1, 5);
                }, setTimer);
            },
            function(data){}
        );
    }
    supplyAjax2();



    function getNumAjax1(){
        postFu(paths["getGrabData"],
            function(data){
                var dataName1, dataSizeNum1,timerClear;
                dataName1 = data[0].dataname;
                dataSizeNum1 = data[0].showsize;
                var setTimer=dataSizeNum1;
                if(setTimer>0 && setTimer<=100){
                    setTimer=400;
                }else if(setTimer>100 && setTimer<=400){
                    setTimer=600;
                }else if(setTimer>400 && setTimer<=800){
                    setTimer=800;
                }else if(setTimer>800 && setTimer<=3000){
                    setTimer=dataSizeNum1
                }else{
                    setTimer=3000;
                }
                $('#getNum1').attr('data-name', dataName1.substr(0, 4));
                $('#getNum1').attr('data-num', dataSizeNum1);
                $('#getNum1').attr('data-timer', (dataSizeNum1).toFixed(0));

                var romGNum = 0, romGNum1 = 0, romGNum2 = 1, timerG = 1000;//
                timerClear=setInterval(function () {
                    function getRandomInt(min, max) {
                        romGNum = Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    romGNum1 = romGNum2;
                    romGNum2 = romGNum + romGNum1;
                    getNumctx1.clearRect(0, 0, 100, 190);
                    getNumFn1(romGNum2 >= 100 ? 100 : romGNum2, $('#getNum1').attr('data-name'), ((romGNum2 >= 100 ? 100 : romGNum2) / 100 * $('#getNum1').attr('data-num')).toFixed(0));
                    if (romGNum2 >= 100) {
                        clearInterval(timerClear);
                        getNumAjax1();
                        romGNum = 0;
                        romGNum1 = 0;
                        romGNum2 = 1;
                    }
                    // console.log(parseInt($('#getNum1').attr('data-timer')))
                    getRandomInt(1, 5);
                }, setTimer);
            },
            function(data){}
        );
    }
    getNumAjax1();

    function getNumAjax2(){
        postFu(paths["getProvideData"],
            function(data){
                var dataName1, dataSizeNum1,timerClear;
                dataName1 = data[0].dataname;
                dataSizeNum1 = data[0].showsize;
                var setTimer=dataSizeNum1;
                if(setTimer>0 && setTimer<=100){
                    setTimer=400;
                }else if(setTimer>100 && setTimer<=400){
                    setTimer=600;
                }else if(setTimer>400 && setTimer<=800){
                    setTimer=800;
                }else if(setTimer>800 && setTimer<=3000){
                    setTimer=dataSizeNum1
                }else{
                    setTimer=3000;
                }
                $('#getNum2').attr('data-name', dataName1.substr(0,4));
                $('#getNum2').attr('data-num', dataSizeNum1);
                $('#getNum2').attr('data-timer', (dataSizeNum1).toFixed(0));

                var romGTNum = 0, romGTNum1 = 0, romGTNum2 = 1, timerGT = 1000;
                timerClear=setInterval(function () {
                    function getRandomInt(min, max) {
                        romGTNum = Math.floor(Math.random() * (max - min + 1)) + min;
                    }

                    romGTNum1 = romGTNum2;
                    romGTNum2 = romGTNum + romGTNum1;
                    getNumctx2.clearRect(0, 0, 100, 190);
                    getNumFn2(romGTNum2 >= 100 ? 100 : romGTNum2, $('#getNum2').attr('data-name'), ((romGTNum2 >= 100 ? 100 : romGTNum2) / 100 * $('#getNum2').attr('data-num')).toFixed(0));
                    if (romGTNum2 >= 100) {
                        clearInterval(timerClear);
                        getNumAjax2();
                        romGTNum = 0;
                        romGTNum1 = 0;
                        romGTNum2 = 1;
                    }
                    // console.log(parseInt($('#getNum2').attr('data-timer')))
                    getRandomInt(1, 5);
                }, setTimer);
            },
            function(data){}
        );
    }
    getNumAjax2();


}


var supply1 = document.getElementById('supply1'),
    supplyctx1 = supply1.getContext("2d");
var supply2 = document.getElementById('supply2'),
    supplyctx2 = supply2.getContext("2d");
var getNum1 = document.getElementById('getNum1'),
    getNumctx1 = getNum1.getContext("2d");
var getNum2 = document.getElementById('getNum2'),
    getNumctx2 = getNum2.getContext("2d");

function supplyFn(ctx,value, dataName, valueNum) {
    //(ctx, x, y, r, color, num, bool, w)

    var ctxArr=["supplyctx1","supplyctx2","getNumctx1","getNumctx1"];

    drawClear(ctx,1, 0,0,208,135) ;
    ring(ctx,70,70, 56, '#ffd8a9', 100, false, 6);
    ring(ctx,70,70, 56, '#faa238', value, false, 12);
    //(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors)
    drawText(ctx, 1, '数据抓取', 70, 70, 20, 100, "center", "#fff");
    drawText(ctx, 1, value + '%', 70, 96,24, 100, "center", "#faa238");
    drawText(ctx, 1, dataName, 208,120,20, 100, "right", "#fff");

    drawText(ctx, 1, valueNum,170, 40,24, 100, "right", "#faa238");
    drawText(ctx, 1, 'MB',200,40,20, 100, "right", "#fff");
}


function supplyFn1(value, dataName, valueNum) {
    //(ctx, x, y, r, color, num, bool, w)
    //ring(supplyctx1, 50, 85, 35, '#ffd8a9', 100, false, 5);
    //ring(supplyctx1, 50, 85, 35, '#faa238', value, false, 10);
    /*    ring(supplyctx1,40,35, 3, '#ffd8a9', 100, false, 5);
     ring(supplyctx1,40,30, 35, '#faa238', value, false, 10);
     drawText(supplyctx1, 1, '数据抓取', 50, 80, 12, 100, "center", "#fff");
     drawText(supplyctx1, 1, value + '%', 50, 100, 15, 100, "center", "#faa238");
     drawText(supplyctx1, 1, dataName, 50, 145, 12, 100, "center", "#fff");
     drawText(supplyctx1, 1, valueNum, 65, 170, 20, 100, "right", "#faa238");
     drawText(supplyctx1, 1, 'MB', 85, 170, 12, 100, "right", "#fff");*/



    drawClear(supplyctx1,1, 0,0,208,135) ;
    ring(supplyctx1,70,70, 50, '#ffd8a9', 100, false, 6);
    ring(supplyctx1,70,70, 50, '#faa238', value, false, 12);
    //(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors)
    drawText(supplyctx1, 1, '数据抓取', 70, 70, 20, 100, "center", "#fff");
    drawText(supplyctx1, 1, value + '%', 70, 96,24, 100, "center", "#faa238");
    drawText(supplyctx1, 1, dataName, 208,120,20, 100, "right", "#fff");

    drawText(supplyctx1, 1, valueNum,170, 40,24, 100, "right", "#faa238");
    drawText(supplyctx1, 1, 'MB',200,40,20, 100, "right", "#fff");
}
function supplyFn2(value, dataName, valueNum) {
    /*   ring(supplyctx2, 50, 85, 35, '#ffd8a9', 100, false, 5);
     ring(supplyctx2, 50, 85, 35, '#faa238', value, false, 10);
     drawText(supplyctx2, 1, '数据抓取', 50, 80, 12, 100, "center", "#fff");
     drawText(supplyctx2, 1, value + '%', 50, 100, 15, 100, "center", "#faa238");
     drawText(supplyctx2, 1, dataName, 50, 145, 12, 100, "center", "#fff");
     drawText(supplyctx2, 1, valueNum, 65, 170, 20, 100, "right", "#faa238");
     drawText(supplyctx2, 1, 'MB', 85, 170, 12, 100, "right", "#fff");*/

    drawClear(supplyctx2,1, 0,0,208,135) ;
    ring(supplyctx2,70,70, 50, '#ffd8a9', 100, false, 6);
    ring(supplyctx2,70,70, 50, '#faa238', value, false, 12);
    //(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors)
    drawText(supplyctx2, 1, '数据抓取', 70, 70, 20, 100, "center", "#fff");
    drawText(supplyctx2, 1, value + '%', 70, 96,24, 100, "center", "#faa238");
    drawText(supplyctx2, 1, dataName, 208,120,20, 100, "right", "#fff");

    drawText(supplyctx2, 1, valueNum,170, 40,24, 100, "right", "#faa238");
    drawText(supplyctx2, 1, 'MB',200,40,20, 100, "right", "#fff");
}
function getNumFn1(value, dataName, valueNum) {
    /*    ring(getNumctx1, 50, 85, 35, '#aaeafe', 100, false, 5);
     ring(getNumctx1, 50, 85, 35, '#00b8f1', value, false, 10);
     drawText(getNumctx1, 1, '数据供应', 50, 80, 12, 100, "center", "#fff");
     drawText(getNumctx1, 1, value + '%', 50, 100, 15, 100, "center", "#faa238");
     drawText(getNumctx1, 1, dataName, 50, 145, 12, 100, "center", "#fff");
     drawText(getNumctx1, 1, valueNum, 65, 170, 20, 100, "right", "#faa238");
     drawText(getNumctx1, 1, 'MB', 85, 170, 12, 100, "right", "#fff");*/

    drawClear(getNumctx1,1, 0,0,208,135) ;
    ring(getNumctx1,70,70, 50, '#aaeafe', 100, false, 6);
    ring(getNumctx1,70,70, 50, '#00b8f1', value, false, 12);
    //(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors)
    drawText(getNumctx1, 1, '数据供应', 70, 70, 20, 100, "center", "#fff");
    drawText(getNumctx1, 1, value + '%', 70, 96,24, 100, "center", "#faa238");
    drawText(getNumctx1, 1, dataName, 208,120,20, 100, "right", "#fff");

    drawText(getNumctx1, 1, valueNum,170, 40,24, 100, "right", "#faa238");
    drawText(getNumctx1, 1, 'MB',200,40,20, 100, "right", "#fff");
}
function getNumFn2(value, dataName, valueNum) {
    /*ring(getNumctx2, 50, 85, 35, '#aaeafe', 100, false, 5);
     ring(getNumctx2, 50, 85, 35, '#00b8f1', value, false, 10);
     drawText(getNumctx2, 1, '数据供应', 50, 80, 12, 100, "center", "#fff");
     drawText(getNumctx2, 1, value + '%', 50, 100, 15, 100, "center", "#faa238");
     drawText(getNumctx2, 1, dataName, 50, 145, 12, 100, "center", "#fff");
     drawText(getNumctx2, 1, valueNum, 65, 170, 20, 100, "right", "#faa238");
     drawText(getNumctx2, 1, 'MB', 85, 170, 12, 100, "right", "#fff");*/


    drawClear(getNumctx2,1, 0,0,208,135) ;
    ring(getNumctx2,70,70, 50, '#aaeafe', 100, false, 6);
    ring(getNumctx2,70,70, 50,'#00b8f1', value, false, 12);
    //(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors)
    drawText(getNumctx2, 1, '数据供应', 70, 70, 20, 100, "center", "#fff");
    drawText(getNumctx2, 1, value + '%', 70, 96,24, 100, "center", "#faa238");
    drawText(getNumctx2, 1, dataName, 208,120,20, 100, "right", "#fff");

    drawText(getNumctx2, 1, valueNum,170, 40,24, 100, "right", "#faa238");
    drawText(getNumctx2, 1, 'MB',200,40,20, 100, "right", "#fff");
}



//2.3.4

var Storage = document.getElementById('showDataStorage'),
    cxtSt = Storage.getContext('2d');
var StStatic = document.createElement("canvas"),
    cxtStStatic = StStatic.getContext("2d");
StStatic.width = 500;
StStatic.height = 400;
var StStaticTwo = document.createElement("canvas"),
    cxtStStaticTwo = StStaticTwo.getContext("2d");
StStaticTwo.width = 454;
StStaticTwo.height = 360;


/*数据*/
function drawSud(suTop, memory, useRatio, title) {
    //console.log(suTop, memory, useRatio, title);

    var progress = null;
    //drawClear(cxtStStaticTwo,1,0,0,354,320)

    drawClear(cxtStStaticTwo,1,0, 0 + suTop, 454, 100);
    suTop=suTop-10;
    //drawRect(cxtStStaticTwo, 1, 0, 0 + suTop, 354, 100, "rgba(7, 33, 67, 0.6)");
    drawText(cxtStStaticTwo, 1, title, 12, 40 + suTop, 18, 400, "left", "#fff");
    progress = Math.ceil(memory * 21 / 100);
    for (var s = 0; s < 21; s++) {
        if (s < progress) {
            drawRect(cxtStStaticTwo, 1, 12 + 7 * s, 57 + suTop, 4, 17, "#E8A22E");
            drawRect(cxtStStaticTwo, 1, 12 + 7 * s, 77 + suTop, 4, 17, "#E8A22E");
        } else {
            drawRect(cxtStStaticTwo, 1, 12 + 7 * s, 57 + suTop, 4, 17, "#0B4389");
            drawRect(cxtStStaticTwo, 1, 12 + 7 * s, 77 + suTop, 4, 17, "#0B4389");
        }
    }


    //指针
    drawDirection(cxtStStaticTwo, 1, 352, 92 + suTop, 54, 3, 0, 180, true, "#0c84e9");
    drawDirection(cxtStStaticTwo, 1, 352, 84 + suTop, 9, 0, 0, 360, true, "#8EC4F9");
    drawDirection(cxtStStaticTwo, 1, 352, 84 + suTop, 6, 0, 0, 360, true, "#0F86F3");
    cxtStStaticTwo.save();
    cxtStStaticTwo.translate(352, 84 + suTop);
    cxtStStaticTwo.rotate(useRatio * Math.PI / 100 - Math.PI / 2);
    cxtStStaticTwo.translate(-352, -84 - suTop);

    drawDirection(cxtStStaticTwo, 1, 352, 54 + suTop, 15, 30, 78, 102, false, "#0f87ff");
    cxtStStaticTwo.restore();
    var angleLen = 6,
        anAVG = Math.PI / (angleLen - 1),
        shAVG = Math.ceil(100 / (angleLen - 1));
    cxtStStaticTwo.save();
    cxtStStaticTwo.scale(0.5, 0.5);
    drawText(cxtStStaticTwo, 1, "存储能力:", 78 * 2, (115 + suTop) * 2, 28, 400, "right", "#fff");
    drawText(cxtStStaticTwo, 1, memory + "%", 78 * 2, (115 + suTop) * 2, 40, 400, "left", "#E8A22E");
    drawText(cxtStStaticTwo, 1, "吞吐能力:", 405 * 2, (24 + suTop) * 2,40, 400, "right", "#fff");
    drawText(cxtStStaticTwo, 1, useRatio + "%", 415 * 2, (24 + suTop) * 2,40, 400, "left", "#E8A22E");
    for (var al = 0; al < angleLen; al++) {
        if (al == 0) {
            drawText(cxtStStaticTwo, 1, "0", 306 * 2, (90 + suTop) * 2, 15, 400, "center", "#91c7fd");
        } else {
            drawText(cxtStStaticTwo, 1, shAVG * al + "%", (352 - Math.cos(anAVG * al) * 42) * 2, (90 + suTop - Math.sin(anAVG * al) * 42) * 2, 15, 400, "center", "#91c7fd");
        }
    }
    cxtStStaticTwo.restore();
}

function severFn() {
    postFu(paths["getDataSave"],
        function(data){
            drawClear(cxtSt,1,0,0,500,400);
            for (var l = 0; l < data.length; l++) {
                //console.log(data[l].serverrate);
                drawSud(0 + 110 * l, data[l].serverram, data[l].serverrate, data[l].servername);

            }


            //gaugeFn('gaugeChart1', data[0].serverrate);
            //gaugeFn('gaugeChart2', data[1].serverrate);
            //gaugeFn('gaugeChart3', data[2].serverrate);
            cxtSt.drawImage(StStaticTwo, 17, 50);
        },
        function(data){})
}
function gaugeFn(id, data) {
    var myChart = echarts.init(document.getElementById(id));
    var option = {
        tooltip: {
            show: false,
            formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
            {
                name: '',
                type: 'gauge',
                radius: '100%',
                splitNumber: 5,
                startAngle: 180,
                endAngle: 0,
                axisLine: {
                    lineStyle: {
                        color: [[1, '#0f86fb'], [1, '#0f86fb'], [1, '#0f86fb']],
                        width: 4
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    distance: -26,
                    formatter: '{value}%',
                    textStyle: {
                        color: '#91c7fd'
                    }
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        fontSize: 12,
                        color: '#f00'
                    }
                },
                pointer: {
                    length: '50%',
                    width: 5
                },
                animation: false,
                detail: {show: false, formatter: '{value}%'},
                data: [{value: data, name: ''}]
            }
        ]
    };
    myChart.setOption(option);
}



/*--------------- 3 --------L2---------*/
//3.2  平台开发者人数信息
function discountFigure(datax,datay) {
    var maxs=0;
    for(var i=0;i<datay.length;i++){
        maxs<datay[i]*1?maxs=datay[i]*1:"";
    }

    var myChartA = echarts.init(document.getElementById('theDevelopers'));
    // 指定图表的配置项和数据
    var optionA = {
        /*tooltip : {
         trigger: 'axis'
         },*/
        grid: {
            left: '4%',
            right: '5%',
            bottom: '6%',
            top: '16%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea3ab'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#272c34'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#272c34'
                    }
                },
                data:datax
                //data : data1
            }
        ],
        yAxis: [
            {
                type: 'value',
                //name:'入库量(GB/Min)',
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#fff'
                },
                nameGap: 8,
                min: 0,
                max:maxs,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ea3ab'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#272c34'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#272c34'
                    }
                }
            }
        ],
        series: [
            {
                name: '入库量',
                type: 'line',
                stack: '总量',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ["#50acfe"];
                            return colorList[params.dataIndex]
                        },
                        lineStyle: {
                            color: '#50acfe'
                        }
                    },
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(3, 23,83,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(3, 23,83,1)'
                        }])
                    }
                },
                data:datay
                //data:stoData,
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartA.setOption(optionA);
};
//3.3 各应用使用者比例及应用服务数
function fnProduct(dataVal) {
    var myChartPro = echarts.init(document.getElementById('saasRunSerData'));
    optionPro = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#b57d39','#2b96c4','#4eb6e3','#00b9f2','#2457ca','#5082f1','#616c97','#394264'],
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data:dataVal,
                labelLine: {
                    normal: {
                        length:5,
                        length2:6
                    }

                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChartPro.setOption(optionPro);
}

//各Paas数占比
function paasRunsFun(nameVal,idNames) {

    var myChartPro = echarts.init(document.getElementById(idNames));
    optionPro = {
        tooltip: {
            trigger: 'item',
            //formatter: "{a} <br/>{b} : {c} ({d}%)"
            formatter: "{b} : {c} ({d}%)"
        },

        calculable: true,

        series: [
            {
                //name:'面积模式',
                type: 'pie',
                radius: '60%',
                startAngle: 90,
                //clockwise: false,
                center: ['50%', '50%'],
                roseType: 'radius',
                label: {
                    normal: {
                        formatter: function (parmas) {
                            //return parmas.name + ':' + parmas.percent.toFixed(0) + '%';
                            return parmas.name;
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length:5,
                        length2:6
                    }

                },
                color:["#0adfc1","#2b96c4","#366fef","#d89545","#ffaf4f"],
                data:nameVal
            }
        ]
    };


    myChartPro.setOption(optionPro);
}
/*---------------  4 ----- R2 --------------*/
//地图
function medicineMapss(names){
    var myChartMap = echarts.init(document.getElementById('saasRunMap'));


    var option = {
        animation:true,
        dataRange: {
            min: 0,
            max:1000,
            //x: '75%',
            //y: '35%',

            right: '100%',
            top: '4%',
            text:['高','低'],
            textStyle : {
                color: '#fff'
            },
            calculable :false,
            color:['#07193e', '#054170', '#229bdd']
        },
        series : [
            {
                type: 'map',
                mapType: 'china',
                roam: false,
                zoom:1.1,
                selectedMode:'single',
                itemStyle:{
                    normal:{label:{show:false,textStyle: {
                        color: "#fff"
                    }}},
                    emphasis:{label:{show:false}}
                },
                //data:datas
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '重庆',value: Math.round(Math.random()*1000)},
                    {name: '河北',value: Math.round(Math.random()*1000)},
                    {name: '河南',value: Math.round(Math.random()*1000)},
                    {name: '云南',value: Math.round(Math.random()*1000)},
                    {name: '辽宁',value: Math.round(Math.random()*1000)},
                    {name: '黑龙江',value: Math.round(Math.random()*1000)},
                    {name: '湖南',value: Math.round(Math.random()*1000)},
                    {name: '安徽',value: Math.round(Math.random()*1000)},
                    {name: '山东',value: Math.round(Math.random()*1000)},
                    {name: '新疆',value: Math.round(Math.random()*1000)},
                    {name: '江苏',value: Math.round(Math.random()*1000)},
                    {name: '浙江',value: Math.round(Math.random()*1000)},
                    {name: '江西',value: Math.round(Math.random()*1000)},
                    {name: '湖北',value: Math.round(Math.random()*1000)},
                    {name: '广西',value: Math.round(Math.random()*1000)},
                    {name: '甘肃',value: Math.round(Math.random()*1000)},
                    {name: '山西',value: Math.round(Math.random()*1000)},
                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    {name: '陕西',value: Math.round(Math.random()*1000)},
                    {name: '吉林',value: Math.round(Math.random()*1000)},
                    {name: '福建',value: Math.round(Math.random()*1000)},
                    {name: '贵州',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    {name: '青海',value: Math.round(Math.random()*1000)},
                    {name: '西藏',value: Math.round(Math.random()*1000)},
                    {name: '四川',value: Math.round(Math.random()*1000)},
                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                    {name: '海南',value: Math.round(Math.random()*1000)},
                    {name: '台湾',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            }
        ]
    };


    myChartMap.setOption(option);

}

function medicineMap(names){
    var myChartMap = echarts.init(document.getElementById('saasRunMap'));


    var geoCoordMap = {
        "海门":[121.15,31.89],
        "鄂尔多斯":[109.781327,39.608266],
        "招远":[120.38,37.35],
        "舟山":[122.207216,29.985295],
        "齐齐哈尔":[123.97,47.33],
        "盐城":[120.13,33.38],
        "赤峰":[118.87,42.28],
        "青岛":[120.33,36.07],
        "乳山":[121.52,36.89],
        "金昌":[102.188043,38.520089],
        "泉州":[118.58,24.93],
        "莱西":[120.53,36.86],
        "日照":[119.46,35.42],
        "胶南":[119.97,35.88],
        "南通":[121.05,32.08],
        "拉萨":[91.11,29.97],
        "云浮":[112.02,22.93],
        "梅州":[116.1,24.55],
        "文登":[122.05,37.2],
        "上海":[121.48,31.22],
        "攀枝花":[101.718637,26.582347],
        "威海":[122.1,37.5],
        "承德":[117.93,40.97],
        "厦门":[118.1,24.46],
        "汕尾":[115.375279,22.786211],
        "潮州":[116.63,23.68],
        "丹东":[124.37,40.13],
        "太仓":[121.1,31.45],
        "曲靖":[103.79,25.51],
        "烟台":[121.39,37.52],
        "福州":[119.3,26.08],
        "瓦房店":[121.979603,39.627114],
        "即墨":[120.45,36.38],
        "抚顺":[123.97,41.97],
        "玉溪":[102.52,24.35],
        "张家口":[114.87,40.82],
        "阳泉":[113.57,37.85],
        "莱州":[119.942327,37.177017],
        "湖州":[120.1,30.86],
        "汕头":[116.69,23.39],
        "昆山":[120.95,31.39],
        "宁波":[121.56,29.86],
        "湛江":[110.359377,21.270708],
        "揭阳":[116.35,23.55],
        "荣成":[122.41,37.16],
        "连云港":[119.16,34.59],
        "葫芦岛":[120.836932,40.711052],
        "常熟":[120.74,31.64],
        "东莞":[113.75,23.04],
        "河源":[114.68,23.73],
        "淮安":[119.15,33.5],
        "泰州":[119.9,32.49],
        "南宁":[108.33,22.84],
        "营口":[122.18,40.65],
        "惠州":[114.4,23.09],
        "江阴":[120.26,31.91],
        "蓬莱":[120.75,37.8],
        "韶关":[113.62,24.84],
        "嘉峪关":[98.289152,39.77313],
        "广州":[113.23,23.16],
        "延安":[109.47,36.6],
        "太原":[112.53,37.87],
        "清远":[113.01,23.7],
        "中山":[113.38,22.52],
        "昆明":[102.73,25.04],
        "寿光":[118.73,36.86],
        "盘锦":[122.070714,41.119997],
        "长治":[113.08,36.18],
        "深圳":[114.07,22.62],
        "珠海":[113.52,22.3],
        "宿迁":[118.3,33.96],
        "咸阳":[108.72,34.36],
        "铜川":[109.11,35.09],
        "平度":[119.97,36.77],
        "佛山":[113.11,23.05],
        "海口":[110.35,20.02],
        "江门":[113.06,22.61],
        "章丘":[117.53,36.72],
        "肇庆":[112.44,23.05],
        "大连":[121.62,38.92],
        "临汾":[111.5,36.08],
        "吴江":[120.63,31.16],
        "石嘴山":[106.39,39.04],
        "沈阳":[123.38,41.8],
        "苏州":[120.62,31.32],
        "茂名":[110.88,21.68],
        "嘉兴":[120.76,30.77],
        "长春":[125.35,43.88],
        "胶州":[120.03336,36.264622],
        "银川":[106.27,38.47],
        "张家港":[120.555821,31.875428],
        "三门峡":[111.19,34.76],
        "锦州":[121.15,41.13],
        "南昌":[115.89,28.68],
        "柳州":[109.4,24.33],
        "三亚":[109.511909,18.252847],
        "自贡":[104.778442,29.33903],
        "吉林":[126.57,43.87],
        "阳江":[111.95,21.85],
        "泸州":[105.39,28.91],
        "西宁":[101.74,36.56],
        "宜宾":[104.56,29.77],
        "呼和浩特":[111.65,40.82],
        "成都":[104.06,30.67],
        "大同":[113.3,40.12],
        "镇江":[119.44,32.2],
        "桂林":[110.28,25.29],
        "张家界":[110.479191,29.117096],
        "宜兴":[119.82,31.36],
        "北海":[109.12,21.49],
        "西安":[108.95,34.27],
        "金坛":[119.56,31.74],
        "东营":[118.49,37.46],
        "牡丹江":[129.58,44.6],
        "遵义":[106.9,27.7],
        "绍兴":[120.58,30.01],
        "扬州":[119.42,32.39],
        "常州":[119.95,31.79],
        "潍坊":[119.1,36.62],
        "重庆":[106.54,29.59],
        "台州":[121.420757,28.656386],
        "南京":[118.78,32.04],
        "滨州":[118.03,37.36],
        "贵阳":[106.71,26.57],
        "无锡":[120.29,31.59],
        "本溪":[123.73,41.3],
        "克拉玛依":[84.77,45.59],
        "渭南":[109.5,34.52],
        "马鞍山":[118.48,31.56],
        "宝鸡":[107.15,34.38],
        "焦作":[113.21,35.24],
        "句容":[119.16,31.95],
        "北京":[116.46,39.92],
        "徐州":[117.2,34.26],
        "衡水":[115.72,37.72],
        "包头":[110,40.58],
        "绵阳":[104.73,31.48],
        "乌鲁木齐":[87.68,43.77],
        "枣庄":[117.57,34.86],
        "杭州":[120.19,30.26],
        "淄博":[118.05,36.78],
        "鞍山":[122.85,41.12],
        "溧阳":[119.48,31.43],
        "库尔勒":[86.06,41.68],
        "安阳":[114.35,36.1],
        "开封":[114.35,34.79],
        "济南":[117,36.65],
        "德阳":[104.37,31.13],
        "温州":[120.65,28.01],
        "九江":[115.97,29.71],
        "邯郸":[114.47,36.6],
        "临安":[119.72,30.23],
        "兰州":[103.73,36.03],
        "沧州":[116.83,38.33],
        "临沂":[118.35,35.05],
        "南充":[106.110698,30.837793],
        "天津":[117.2,39.13],
        "富阳":[119.95,30.07],
        "泰安":[117.13,36.18],
        "诸暨":[120.23,29.71],
        "郑州":[113.65,34.76],
        "哈尔滨":[126.63,45.75],
        "聊城":[115.97,36.45],
        "芜湖":[118.38,31.33],
        "唐山":[118.02,39.63],
        "平顶山":[113.29,33.75],
        "邢台":[114.48,37.05],
        "德州":[116.29,37.45],
        "济宁":[116.59,35.38],
        "荆州":[112.239741,30.335165],
        "宜昌":[111.3,30.7],
        "义乌":[120.06,29.32],
        "丽水":[119.92,28.45],
        "洛阳":[112.44,34.7],
        "秦皇岛":[119.57,39.95],
        "株洲":[113.16,27.83],
        "石家庄":[114.48,38.03],
        "莱芜":[117.67,36.19],
        "常德":[111.69,29.05],
        "保定":[115.48,38.85],
        "湘潭":[112.91,27.87],
        "金华":[119.64,29.12],
        "岳阳":[113.09,29.37],
        "长沙":[113,28.21],
        "衢州":[118.88,28.97],
        "廊坊":[116.7,39.53],
        "菏泽":[115.480656,35.23375],
        "合肥":[117.27,31.86],
        "武汉":[114.31,30.52],
        "大庆":[125.03,46.58]
    };

    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    option = {
        //backgroundColor: '#404a59',
        visualMap: {
            min: 0,
            max: 200,
            right: '100%',
            calculable: true,
            inRange: {
                color: ['#50a3ba', '#eac736', '#d94e5d']
            },
            textStyle: {
                color: '#fff'
            }
        },
     /*   dataRange: {
            min: 0,
            max:1000,
            //x: '75%',
            //y: '35%',

            right: '100%',
            top: '4%',
            text:['高','低'],
            textStyle : {
                color: '#fff'
            },
            calculable :false,
            color:['#07193e', '#054170', '#229bdd']
        },*/
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [
            /*{
                type: 'map',
                mapType: 'china',
                roam: false,
                zoom:1.1,
                selectedMode:'single',
                itemStyle:{
                    normal:{label:{show:false,textStyle: {
                        color: "#fff"
                    }}},
                    emphasis:{label:{show:false}}
                },
                //data:datas
                data:[
                    {name: '北京',value: Math.round(Math.random()*1000)},
                    {name: '天津',value: Math.round(Math.random()*1000)},
                    {name: '上海',value: Math.round(Math.random()*1000)},
                    {name: '重庆',value: Math.round(Math.random()*1000)},
                    {name: '河北',value: Math.round(Math.random()*1000)},
                    {name: '河南',value: Math.round(Math.random()*1000)},
                    {name: '云南',value: Math.round(Math.random()*1000)},
                    {name: '辽宁',value: Math.round(Math.random()*1000)},
                    {name: '黑龙江',value: Math.round(Math.random()*1000)},
                    {name: '湖南',value: Math.round(Math.random()*1000)},
                    {name: '安徽',value: Math.round(Math.random()*1000)},
                    {name: '山东',value: Math.round(Math.random()*1000)},
                    {name: '新疆',value: Math.round(Math.random()*1000)},
                    {name: '江苏',value: Math.round(Math.random()*1000)},
                    {name: '浙江',value: Math.round(Math.random()*1000)},
                    {name: '江西',value: Math.round(Math.random()*1000)},
                    {name: '湖北',value: Math.round(Math.random()*1000)},
                    {name: '广西',value: Math.round(Math.random()*1000)},
                    {name: '甘肃',value: Math.round(Math.random()*1000)},
                    {name: '山西',value: Math.round(Math.random()*1000)},
                    {name: '内蒙古',value: Math.round(Math.random()*1000)},
                    {name: '陕西',value: Math.round(Math.random()*1000)},
                    {name: '吉林',value: Math.round(Math.random()*1000)},
                    {name: '福建',value: Math.round(Math.random()*1000)},
                    {name: '贵州',value: Math.round(Math.random()*1000)},
                    {name: '广东',value: Math.round(Math.random()*1000)},
                    {name: '青海',value: Math.round(Math.random()*1000)},
                    {name: '西藏',value: Math.round(Math.random()*1000)},
                    {name: '四川',value: Math.round(Math.random()*1000)},
                    {name: '宁夏',value: Math.round(Math.random()*1000)},
                    {name: '海南',value: Math.round(Math.random()*1000)},
                    {name: '台湾',value: Math.round(Math.random()*1000)},
                    {name: '香港',value: Math.round(Math.random()*1000)},
                    {name: '澳门',value: Math.round(Math.random()*1000)}
                ]
            },*/
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'geo',
                zoom:1.2,
                data: convertData([
                    {name: "海门", value: 9},
                    {name: "鄂尔多斯", value: 12},
                    {name: "招远", value: 12},
                    {name: "舟山", value: 12},
                    {name: "齐齐哈尔", value: 14},
                    {name: "盐城", value: 15},
                    {name: "赤峰", value: 16},
                    {name: "青岛", value: 18},
                    {name: "乳山", value: 18},
                    {name: "金昌", value: 19},
                    {name: "泉州", value: 21},
                    {name: "莱西", value: 21},
                    {name: "日照", value: 21},
                    {name: "胶南", value: 22},
                    {name: "南通", value: 23},
                    {name: "拉萨", value: 24},
                    {name: "云浮", value: 24},
                    {name: "梅州", value: 25},
                    {name: "文登", value: 25},
                    {name: "上海", value: 25},
                    {name: "攀枝花", value: 25},
                    {name: "威海", value: 25},
                    {name: "承德", value: 25},
                    {name: "厦门", value: 26},
                    {name: "汕尾", value: 26},
                    {name: "潮州", value: 26},
                    {name: "丹东", value: 27},
                    {name: "太仓", value: 27},
                    {name: "曲靖", value: 27},
                    {name: "烟台", value: 28},
                    {name: "福州", value: 29},
                    {name: "瓦房店", value: 30},
                    {name: "即墨", value: 30},
                    {name: "抚顺", value: 31},
                    {name: "玉溪", value: 31},
                    {name: "张家口", value: 31},
                    {name: "阳泉", value: 31},
                    {name: "莱州", value: 32},
                    {name: "湖州", value: 32},
                    {name: "汕头", value: 32},
                    {name: "昆山", value: 33},
                    {name: "宁波", value: 33},
                    {name: "湛江", value: 33},
                    {name: "揭阳", value: 34},
                    {name: "荣成", value: 34},
                    {name: "连云港", value: 35},
                    {name: "葫芦岛", value: 35},
                    {name: "常熟", value: 36},
                    {name: "东莞", value: 36},
                    {name: "河源", value: 36},
                    {name: "淮安", value: 36},
                    {name: "泰州", value: 36},
                    {name: "南宁", value: 37},
                    {name: "营口", value: 37},
                    {name: "惠州", value: 37},
                    {name: "江阴", value: 37},
                    {name: "蓬莱", value: 37},
                    {name: "韶关", value: 38},
                    {name: "嘉峪关", value: 38},
                    {name: "广州", value: 38},
                    {name: "延安", value: 38},
                    {name: "太原", value: 39},
                    {name: "清远", value: 39},
                    {name: "中山", value: 39},
                    {name: "昆明", value: 39},
                    {name: "寿光", value: 40},
                    {name: "盘锦", value: 40},
                    {name: "长治", value: 41},
                    {name: "深圳", value: 41},
                    {name: "珠海", value: 42},
                    {name: "宿迁", value: 43},
                    {name: "咸阳", value: 43},
                    {name: "铜川", value: 44},
                    {name: "平度", value: 44},
                    {name: "佛山", value: 44},
                    {name: "海口", value: 44},
                    {name: "江门", value: 45},
                    {name: "章丘", value: 45},
                    {name: "肇庆", value: 46},
                    {name: "大连", value: 47},
                    {name: "临汾", value: 47},
                    {name: "吴江", value: 47},
                    {name: "石嘴山", value: 49},
                    {name: "沈阳", value: 50},
                    {name: "苏州", value: 50},
                    {name: "茂名", value: 50},
                    {name: "嘉兴", value: 51},
                    {name: "长春", value: 51},
                    {name: "胶州", value: 52},
                    {name: "银川", value: 52},
                    {name: "张家港", value: 52},
                    {name: "三门峡", value: 53},
                    {name: "锦州", value: 54},
                    {name: "南昌", value: 54},
                    {name: "柳州", value: 54},
                    {name: "三亚", value: 54},
                    {name: "自贡", value: 56},
                    {name: "吉林", value: 56},
                    {name: "阳江", value: 57},
                    {name: "泸州", value: 57},
                    {name: "西宁", value: 57},
                    {name: "宜宾", value: 58},
                    {name: "呼和浩特", value: 58},
                    {name: "成都", value: 58},
                    {name: "大同", value: 58},
                    {name: "镇江", value: 59},
                    {name: "桂林", value: 59},
                    {name: "张家界", value: 59},
                    {name: "宜兴", value: 59},
                    {name: "北海", value: 60},
                    {name: "西安", value: 61},
                    {name: "金坛", value: 62},
                    {name: "东营", value: 62},
                    {name: "牡丹江", value: 63},
                    {name: "遵义", value: 63},
                    {name: "绍兴", value: 63},
                    {name: "扬州", value: 64},
                    {name: "常州", value: 64},
                    {name: "潍坊", value: 65},
                    {name: "重庆", value: 66},
                    {name: "台州", value: 67},
                    {name: "南京", value: 67},
                    {name: "滨州", value: 70},
                    {name: "贵阳", value: 71},
                    {name: "无锡", value: 71},
                    {name: "本溪", value: 71},
                    {name: "克拉玛依", value: 72},
                    {name: "渭南", value: 72},
                    {name: "马鞍山", value: 72},
                    {name: "宝鸡", value: 72},
                    {name: "焦作", value: 75},
                    {name: "句容", value: 75},
                    {name: "北京", value: 79},
                    {name: "徐州", value: 79},
                    {name: "衡水", value: 80},
                    {name: "包头", value: 80},
                    {name: "绵阳", value: 80},
                    {name: "乌鲁木齐", value: 84},
                    {name: "枣庄", value: 84},
                    {name: "杭州", value: 84},
                    {name: "淄博", value: 85},
                    {name: "鞍山", value: 86},
                    {name: "溧阳", value: 86},
                    {name: "库尔勒", value: 86},
                    {name: "安阳", value: 90},
                    {name: "开封", value: 90},
                    {name: "济南", value: 92},
                    {name: "德阳", value: 93},
                    {name: "温州", value: 95},
                    {name: "九江", value: 96},
                    {name: "邯郸", value: 98},
                    {name: "临安", value: 99},
                    {name: "兰州", value: 99},
                    {name: "沧州", value: 100},
                    {name: "临沂", value: 103},
                    {name: "南充", value: 104},
                    {name: "天津", value: 105},
                    {name: "富阳", value: 106},
                    {name: "泰安", value: 112},
                    {name: "诸暨", value: 112},
                    {name: "郑州", value: 113},
                    {name: "哈尔滨", value: 114},
                    {name: "聊城", value: 116},
                    {name: "芜湖", value: 117},
                    {name: "唐山", value: 119},
                    {name: "平顶山", value: 119},
                    {name: "邢台", value: 119},
                    {name: "德州", value: 120},
                    {name: "济宁", value: 120},
                    {name: "荆州", value: 127},
                    {name: "宜昌", value: 130},
                    {name: "义乌", value: 132},
                    {name: "丽水", value: 133},
                    {name: "洛阳", value: 134},
                    {name: "秦皇岛", value: 136},
                    {name: "株洲", value: 143},
                    {name: "石家庄", value: 147},
                    {name: "莱芜", value: 148},
                    {name: "常德", value: 152},
                    {name: "保定", value: 153},
                    {name: "湘潭", value: 154},
                    {name: "金华", value: 157},
                    {name: "岳阳", value: 169},
                    {name: "长沙", value: 175},
                    {name: "衢州", value: 177},
                    {name: "廊坊", value: 193},
                    {name: "菏泽", value: 194},
                    {name: "合肥", value: 229},
                    {name: "武汉", value: 273},
                    {name: "大庆", value: 279}
                ]),
                symbolSize:4,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            }
        ]
    }

    myChartMap.setOption(option);

}



/*----------   公共     -------------*/

function formatTime() {
    var formattimes=new Date();
    var  newtimes = (formattimes.getHours() > 9 ? formattimes.getHours() : '0' + formattimes.getHours()) + ":";
    newtimes += (formattimes.getMinutes() > 9 ? formattimes.getMinutes() : '0' + formattimes.getMinutes()) + ":";
    newtimes += (formattimes.getSeconds() > 9 ? formattimes.getSeconds() : '0' + formattimes.getSeconds());
    return newtimes;
}


var postFu=function(urls,suFun,errFun){
    var option={
        type: "POST",
        url:urls,
        dataType: "json",
        success:suFun,
        error:errFun
    };
    $.ajax(option);
};
var ran=function(w,be,en){
    //return (Math.random()*(en-be)).toFixed(w)*1+be;
    //return rans.substr(0,rans.indexOf(".")+w+1)*1+be;
    var rans=String(Math.floor(Math.random()*(en-be)+be));
    var ranxs=String( Math.floor(Math.random()*89+10));
    if(w==0){
        return rans*1
    }else if(w==2){
        return (rans+'.'+ranxs)*1
    }
};


function ring(ctx, x, y, r, color, num, bool, w) {
    var angl = 2 * Math.PI / 100;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, angl * num, bool);
    ctx.lineWidth = w;
    ctx.strokeStyle = color;
    ctx.stroke(); //画空心圆
    ctx.closePath();
};
/*文本*/
function drawTexts(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors, teLine) {
    var ms = 0,
        cs = 0;
    context.beginPath();
    context.font = '' + widths + ' ' + foSize * scales + 'px Microsoft Yahei';
    context.textAlign = textAl;
    context.fillStyle = colors;
    if (!texts) {
        console.log('not network')
        return;
    }
    for (var n = 0; n < texts.length; n++) {
        if (context.measureText(texts.substring(ms, n)).width > teLine) {
            context.fillText(texts.substring(ms, n), axisx * scales, (axisy + 20 * cs) * scales);
            cs = cs + 1;
            ms = n + 1;
            n = n + 40;
            //console.log(cs);
        }
    }
    context.closePath();
    allLine = cs;
}
//背景
function drawRectBackground(context, scales, axisX, axisY, widths, heights, height01, radius) {
    var sl = 0.5;
    context.save();
    context.scale(1, sl);
    var gradient = context.createRadialGradient(200, height01 / sl, 10, 200, height01 / sl, radius);
    gradient.addColorStop(0, "rgba(11, 84, 131, 0.1)");
    gradient.addColorStop(0.5, "rgba(11, 84, 131, 0.3)");
    gradient.addColorStop(1, "rgba(11, 84, 131, 0.6)");
    context.beginPath();
    context.fillStyle = gradient;
    context.fillRect(axisX * scales, axisY * scales, widths, heights / sl);
    context.closePath();
    context.restore();
}
//渐变
function drawRectGradients(context, scales, axisX, axisY, axisXl, axisYl, colorsSe, colorsMi) {
    var widths = axisXl - axisX == 0 ? 1 : Math.abs(axisXl - axisX),
        gradient = context.createLinearGradient(axisX, axisY, axisXl, axisYl);
    if (axisXl - axisX < 500) {
        var heights = axisYl - axisY == 0 ? 1 : Math.abs(axisYl - axisY);
    } else {
        var heights =6;
    }
    gradient.addColorStop(0, colorsSe);
    gradient.addColorStop(0.5, colorsMi);
    gradient.addColorStop(1, colorsSe);
    context.save();
    context.beginPath();
    context.fillStyle = gradient;
    context.fillRect(axisX * scales, axisY * scales, widths, heights);
    context.closePath();
    context.restore();
}
//拐角
function drawLineDomeLian(context, scales, xm, ym, xl, yl, xl01, yl01, lineWidths, lineJoins, colors) {
    context.beginPath();
    context.moveTo(xm * scales, ym * scales);
    context.lineTo(xl * scales, yl * scales);
    context.lineTo(xl01 * scales, yl01 * scales);
    context.lineWidth = lineWidths;
    context.lineJoin = lineJoins;
    context.strokeStyle = colors;
    context.stroke();
    context.closePath();
}
//折线
function drawPline(context, scales, axisArray, lineWidths, lineJoins, colors) {
    var sl = 150 / 120;
    var dLen = 280 / axisArray.length - 1;
    context.beginPath();
    context.moveTo(40 * scales, 250 - axisArray[0] * scales * sl);
    for (var i = 1; i < axisArray.length; i++) {
        context.lineTo((40 + dLen * i) * scales, 250 - axisArray[i] * scales * sl);
    }
    context.lineWidth = lineWidths;
    context.lineJoin = lineJoins;
    context.strokeStyle = colors;
    context.stroke();
    context.closePath();
    for (var j = 1; j < axisArray.length; j++) {
        drawCircle(context, scales, (40 + dLen * j) * scales, 250 - axisArray[j] * scales * sl);
    }
}
//多段
function drawPlines(context, scales, axisArrays, lineWidths, lineJoins, colors) {
    context.beginPath();
    context.moveTo(axisArrays[0][0] * scales, axisArrays[0][1] * scales);
    for (var i = 1; i < axisArrays.length; i++) {
        context.lineTo(axisArrays[i][0] * scales, axisArrays[i][1] * scales);
    }
    context.lineWidth = lineWidths;
    context.lineJoin = lineJoins;
    context.strokeStyle = colors;
    context.stroke();
    context.closePath();
}
/*线段*/
function drawLines(context, scales, Xm, Ym, Xl, Yl, lineWidths, lineCap, colors) {
    context.beginPath();
    context.moveTo(Xm * scales, Ym * scales);
    context.lineTo(Xl * scales, Yl * scales);
    context.lineWidth = lineWidths;
    context.lineCap = lineCap;
    context.strokeStyle = colors;
    context.stroke();
    context.closePath();
}
/*文字*/
function drawText(context, scales, texts, axisx, axisy, foSize, widths, textAl, colors) {
    context.beginPath();
    //context.font = "Bold 14px Arial";
    context.font = '' + widths + ' ' + foSize * scales + 'px Microsoft Yahei';
    context.textAlign = textAl;
    context.fillStyle = colors;
    context.fillText(texts, axisx * scales, axisy * scales);
    context.closePath();
}


//圆
function drawCircle(context, scales, axisX, axisY) {
    context.beginPath();
    context.arc(axisX * scales, axisY * scales, 4, 0, Math.PI * 2, true);
    context.lineWidth = 2;
    context.fillStyle = "#02B9F2";
    context.strokeStyle = "#041E3E";
    context.fill();
    context.stroke();
    context.closePath();
}
/*扇形*/
function drawDirection(context, scales, axisX, axisY, radius, widths, star, end, dir, colors) {
    star = Math.PI * star / 180;
    end = Math.PI * end / 180;
    context.beginPath();
    context.arc(axisX * scales, axisY * scales, radius * scales, star, end, dir);
    if (widths == 0) {
        context.fillStyle = colors;
        context.fill();
    } else {
        context.lineWidth = widths * scales;
        context.strokeStyle = colors;
        context.stroke();
    }
    context.closePath();
}
/*矩形*/
function drawRect(context, scales, axisX, axisY, widths, heights, colors) {
    context.beginPath();
    context.fillStyle = colors;
    context.fillRect(axisX * scales, axisY * scales, widths, heights);
    context.closePath();
}
/*清除*/
function drawClear(context, scales, axisX, axisY, w, h) {
    context.clearRect(axisX * scales, axisY * scales, w * scales, h * scales);
}



