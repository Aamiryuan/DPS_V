var map = {
    mapMain:echarts.init(document.getElementById('map')),
    initMap:function (opt) {
        var maxDatas=0;
        for(var i=0;i<opt.data.length;i++){maxDatas <opt.data[i].value ? maxDatas= opt.data[i].value:"";}
        maxDatas=(String(maxDatas).substr(0,1)*1+1)*Math.pow(10,String(maxDatas).length-1);
        var option = {
            title: {
                show: true,
                text: opt.name || "建筑工程资源分布图",
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            textStyle: {
                color: '#ffffff',
                fontSize: "46px"
            },
            legend: {
                show: false,
                orient: 'vertical',
                x: 'left',
                data: ['管理机构', '执行机构', '企事业单位']
            },
            visualMap: {
                show: opt.isShow || false,
                min: 0,
                max: maxDatas,
                right: '18%',
                top: 'center',
                text: ['高', '低'],           // 文本，默认为数值文本
                calculable: true,
                color: ['#07193e', '#054170', '#229bdd'],
                colorAlpha: .5,
                textStyle: {
                    color: "#fff"
                }

            },
            series: [
                {
                    name: $('.xl_cd_con .current').text(),
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    zoom: 1.2,
                    left: opt.left || '14%',
                    selectedMode: 'single',
                    label: {
                        normal: {
                            orient: 'vertical',
                            textStyle: {
                                color: "#ffffff"
                            },
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        normal: {
                            opacity: .5,
                            borderColor: "#56cff2"
                        },
                        emphasis: {
                            color: '#000'
                        }
                    },
                    data: opt.data
                }
            ]
        };
        this.mapMain.setOption(option);
    }
}