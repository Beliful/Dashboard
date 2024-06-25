import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { units } from '../../const/const'

const getMinMax = (data, feature) => {
  const allDataPoints = data.datasets.flatMap((dataset) => dataset.data)

  return {
    min: 1000,
    max: 1500,
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
            text: "Electricity Usage",
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
              callback: (value) => `${value} ${units.electricityUsage}`, // Add unit to the tick labels
            },
          },
        },
      }}
    />
  )
}

export default VehicleFeatureChart
