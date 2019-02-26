import wepy from 'wepy'
import * as echarts from '../ec-canvas/echarts'

export default class barMixin extends wepy.mixin {
  data = {
    canvasId: 'mychart-bar',
    ec: {
      onInit: this.initChart
    }
  }

  initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    })
    canvas.setChart(chart)
    let colorList = [
      '#37A2DA',
      '#32C5E9',
      '#67E0E3',
      '#9FE6B8',
      '#FFDB5C',
      '#ff9f7f',
      '#fb7293',
      '#E062AE',
      '#E690D1',
      '#e7bcf3',
      '#9d96f5',
      '#8378EA',
      '#96BFFF'
    ]
    let bar = wepy.$store.getState().chart.bar // this.onInit

    let option = {
      title: {
        text: bar.title,
        x: 'center'
      },
      dataset: {
        source: bar.source
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          return params[0].data[3] + '\n' + params[0].data[4]
        },
        axisPointer: {
          type: 'shadow',
          crossStyle: {
            color: '#999'
          }
        }
      },
      xAxis: {
        type: 'value',
        name: bar.yname
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          encode: {
            x: 1,
            y: 2
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            color: '#000'
          },
          itemStyle: {
            color: function(params) {
              return colorList[params.dataIndex % colorList.length]
            }
          }
        }
      ]
    }

    chart.setOption(option)
    return chart
  }
}
