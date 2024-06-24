import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { pollutants } from '../../const/const'

const getMinMax = (data, feature) => {
  const allDataPoints = data.datasets.flatMap((dataset) => dataset.data)

  console.log("all", allDataPoints)
  const min = Math.min(...allDataPoints)
  console.log("min", feature)
  const max = Math.max(...allDataPoints)

  const paddedMin = Math.floor(min - (max - min) * 0.1)
  const paddedMax = Math.ceil(max + (max - min) * 0.1)

  return {
    min: Math.max(paddedMin, pollutants[feature].min),
    max: Math.min(paddedMax, pollutants[feature].max),
  }
}

const VehicleFeatureChart = ({ data, title: featureName }) => {
  const chartRef = useRef(null)
  const { min, max } = getMinMax(data, featureName)

  useEffect(() => {
    const updateColors = () => {
      if (chartRef.current) {
        const chart = chartRef.current
        chart.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
        chart.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
        chart.options.scales.x.ticks.color = getStyle('--cui-body-color')
        chart.options.scales.y.ticks.color = getStyle('--cui-body-color')
        chart.update()
      }
    }

    updateColors()
    document.documentElement.addEventListener('ColorSchemeChange', updateColors)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', updateColors)
    }
  }, [])

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '40px' }}
      data={data}
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: pollutants[featureName].name,
            color: getStyle('--cui-body-color'),
            font: {
              size: 18,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
          y: {
            beginAtZero: true,
            min,
            max,
            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },
            ticks: {
              color: getStyle('--cui-body-color'),
              callback: (value) => `${value} ${pollutants[featureName].unit}`, // Add unit to the tick labels
            },
          },
        },
      }}
    />
  )
}

export default VehicleFeatureChart
