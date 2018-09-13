var chart = {
    /**
     * @description 统计图表宽度自适应，若是大于最大宽度，则出现滚动条
     */
    autoWidth: function() {
        var wWidth = $(window).width();
        var leftDistance = 360;
        var rightDistance = 20;

        var $chartBox = $('#chartBox');
        var $chartItem = $chartBox.find('.chart-item');

        var boxWidth = wWidth - leftDistance - rightDistance;
        $chartBox.css('width', boxWidth);
        $chartItem.css('width', Math.floor((boxWidth - 20) / 3));

    },
    /**
     * 绘制能耗分析柱形图
     * @param id 容器id
     */
    drawBarChart: function(id) {
        var myChart = echarts.init(document.getElementById(id));

        var option = {
            title: {
                show: false
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                },
                formatter: function(params) { //数据单位格式化
                    var relVal = params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                        if (params[i].value) {
                            relVal += '<br/> ' + params[i].seriesName + ' : ' + params[i].value + 'Kw.h';
                        }
                    }

                    return relVal;
                }
            },
            grid: {
                top: '12%',
                bottom: '20%',
                left: '10%',
                containLabel: false
            },
            calculable: true,
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    interval: 0
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        fontSize: 15
                    }
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }],
            yAxis: [{
                type: 'value',
                name: '(Kw.h)',
                axisLine: {
                    lineStyle: {
                        color: '#f5f5f6',
                        fontSize: 15
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                min: 0,
                max: 300,
                splitNumber: 7
            }],
            series: [{
                name: '能耗',
                type: 'bar',
                barWidth: 20,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#32e7f0'
                                },
                                {
                                    offset: 0.5,
                                    color: '#92d387'
                                },
                                {
                                    offset: 1,
                                    color: '#e8c12e'
                                }
                            ]
                        ),
                        barBorderRadius: [25, 25, 0, 0]
                    }
                },
                data: [140, 275, 175, 200, 125, 160, 150, 175, 225, 250, 230, 200]
            }]
        };;

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    },
    /**
     * 绘制亮灯率图表
     * @param id 容器id
     */
    drawPieChart: function(id) {
        var myChart = echarts.init(document.getElementById(id));

        var option = {
            tooltip: {
                show: false
            },
            legend: {
                show: true,
                orient: 'vertical',
                right: 20,
                top: 0,
                itemWidth: 20, //图例的宽度
                itemHeight: 10, //图例的高度
                itemGap: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                },
                formatter: function(params) {
                    for (var i = 0; i < option.series[0].data.length; i++) {
                        if (option.series[0].data[i].name == params) {
                            return params + '：' + option.series[0].data[i].value + '盏';
                        }
                    }
                }
            },
            color: ['#3d8df1', '#fac71f'],
            series: [{
                name: '亮灯率',
                type: 'pie',
                radius: ['60%', '80%'],
                center: ['50%', '50%'],
                // hoverAnimation: false,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        position: 'center',
                        textStyle: {
                            fontSize: '22',
                            color: '#fff'
                        },
                        formatter: "{a}"
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 5,
                        name: '关灯数'
                    },
                    {
                        value: 25,
                        name: '亮灯数'
                    }
                ]
            }]
        };;

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    },
    /**
     * @description 统计图表向下缩进
     */
    shrink: function() {
        var $wrapper = $('#wrapper');

        if (!$wrapper.hasClass('side-shrink-btm')) {
            $wrapper.addClass('side-shrink-btm');
        } else {
            $wrapper.removeClass('side-shrink-btm');
        }
    }
};

chart.autoWidth();

chart.drawBarChart('bar-container');
chart.drawPieChart('pie-container');
