module.exports={
    //进度
    ddoption : {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            top:20,
            data: ['已完成环数', '未完成环数',]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value',
            axisLabel: {
                //设置y轴数值为%
                formatter: function(value){
                   return  value/1000*100  +' %'
                },
                textStyle: {
                    color: '#000'//y轴刻度数值颜色
                }
            },
            // data: ['0%','20%','40%','60%','80%','100%']
        },
        yAxis: {
            type: 'category',
            // axisLabel: {
            //     //设置y轴数值为%
            //     formatter: '{value} %',
            //     textStyle: {
            //         color: '#fff'//y轴刻度数值颜色
            //     }
            // },
            data: ['1号井','2号井','4号井','6号井','8号井','10号井']
        },
        series: [
            {
                name: '已完成环数',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 380, 420, 280, 350, 330]
            },
           
            {
                name: '未完成环数',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [680, 620, 580, 720, 650, 670]
            }
        ]
    },


    //投资
    tzoption: {
        color: ['#3398DB','#b51111','#3398DB','#b51111'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['计划','实际','计划1','实际1'],
            top:10,
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'计划',
                type:'bar',
                // barWidth: '50%',
                data:[10, 52, 200, 334, 390, 330, 220, 390, 330, 220, 390, 330]
            },
            {
                name:'实际',
                type:'bar',
                // barWidth: '50%',
                data:[100, 102, 200, 334, 390, 330, 220, 390, 330, 220, 390, 330]
            },
            {
                name:'计划1',
                type:'line',
                // barWidth: '50%',
                data:[10, 52, 200, 334, 490, 430, 420, 490, 430, 420, 490, 430]
            },
            {
                name:'实际1',
                type:'line',
                // barWidth: '50%',
                data:[100, 102, 200, 334, 490, 530, 520, 490, 530, 520, 590, 530]
            }
        ]
    },

    //安全
    leftoption: {
        color: ['#3398DB','#c5ce42','#e2ab2f','#b51111'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['1级','2级','3级'],
            top:10,
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['地质风险', '工程自身风险', '周边环境风险'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                 }
            }
        ],
        yAxis : [
            
            {
                show:false,
                type : 'value'
            }
        ],
        series : [
            {
                name:'1级',
                type:'bar',
                // barWidth: '20%',
                data:[10, 52, 20]
            },
            {
                name:'2级',
                type:'bar',
                //  barWidth: '20%',
                data:[33, 80, 120]
            },
            {
                name:'3级',
                type:'bar',
                //  barWidth: '20%',
                data:[20,60,100]
            },
           
        ]
    }
    











}