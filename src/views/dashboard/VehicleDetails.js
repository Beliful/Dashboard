import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CAlert,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButtonGroup,
  CCardFooter,
  CProgress,
  CButton,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilWarning, cilCloudDownload } from '@coreui/icons'
import ReactSpeedometer from 'react-d3-speedometer'
import tractors from 'src/data/tractor'
import statusFeatures from 'src/data/tractor-status-features'
import tractorMeasurements from 'src/data/tractorMeasurements.json' // Importing the tractor measurements data
import VehicleFeatureChart from './VehicleFeatureChart'
import { formatDate } from '../../util/formatDate'

const VehicleDetails = () => {
  const { tractorId } = useParams()
  const navigate = useNavigate()
  const [selectedTractor, setSelectedTractor] = useState(tractorId || '')
  const [latestData, setLatestData] = useState(null)
  const [tractorData, setTractorData] = useState(null)

  useEffect(() => {
    // Filter out the latest data for the selected tractor
    const currentTractor = tractorMeasurements.filter(
      (tractor) => tractor.tractorId === parseInt(selectedTractor),
    )

    setLatestData(currentTractor[currentTractor.length - 1])
    setTractorData(currentTractor)
  }, [selectedTractor])

  const handleTractorChange = (selectedId) => {
    setSelectedTractor(selectedId)
    navigate(`/dashboard/vehicle/${selectedId}`)
  }

  const tractor = tractors.find((t) => t.id === parseInt(selectedTractor))

  if (!tractor) {
    return <p>Tractor with ID {selectedTractor} not found.</p>
  }

  const { model } = tractor
  const title = `${model}`

  const getWarnings = (key, value) => {
    const warnings = []
    if (value.warn) {
      console.log('warn val:', value.warn)
      console.log('latest mesasure:', latestData.measurements[key])
      console.log('key:', key)
      if (value.warn.high !== undefined && latestData.measurements[key] > value.warn.high) {
        console.log('helothere1')
        warnings.push(`${value.name} is too high!`)
      }

      if (value.warn.low !== undefined && latestData.measurements[key] < value.warn.low) {
        console.log('helothere2')
        warnings.push(`${value.name} is too low!`)
      }
    }

    return warnings
  }

  const getTirePressureWarnings = (subKey, subValue) => {
    const warnings = []
    const pressure = latestData.measurements.tirePressure[subKey]
    if (subValue.warn.high !== undefined && pressure > subValue.warn.high) {
      warnings.push(`${subValue.name} pressure is too high!`)
    }
    if (subValue.warn.low !== undefined && pressure < subValue.warn.low) {
      warnings.push(`${subValue.name} pressure is too low!`)
    }
    return warnings
  }

  const getSegmentColors = (key) => {
    if (key === 'tirePressure') {
      return ['#f54242', '#f5f542', '#78f542', '#f5f542', '#f54242'] // Red, Yellow, Yellow, Yellow, Red
    } else {
      return ['#78f542', '#b4f542', '#f5f542', '#f5a442', '#f54242'] // Green to brighter red gradient
    }
  }

  const getCustomSegmentStops = (key, min, max) => {
    if (key === 'tirePressure') {
      return [20, 25, 30, 35, 40, 45]
    } else {
      return undefined
    }
  }

  // Render the component only when latestData is not null
  if (!latestData) {
    return null // or loading indicator
  }

  const features = [
    'speed',
    'rpm',
    'fuelConsumption',
    'fuelLevel',
    'engineOilLevel',
    'engineTemperature',
  ]

  const formatChartData = (data, feature) => {
    const labels = data.map((entry) => new Date(entry.timestamp).toLocaleString())
    const dataset = data.map((entry) => parseFloat(entry.measurements[feature]))

    return {
      labels,
      datasets: [
        {
          label: feature,
          backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: dataset,
          fill: true,
        },
      ],
    }
  }

  return (
    <>
      <CRow>
        <CCol>
          {Object.entries(statusFeatures).map(([key, value]) => {
            return (
              <React.Fragment key={key}>
                {key === 'tirePressure'
                  ? Object.entries(value.subFeatures).map(([subKey, subValue]) =>
                      getTirePressureWarnings(subKey, subValue).map((warning, index) => (
                        <CAlert color="danger" key={`${subKey}-warning-${index}`}>
                          {warning}
                        </CAlert>
                      )),
                    )
                  : getWarnings(key, value).map((warning, index) => (
                      <CAlert color="danger" key={`${key}-warning-${index}`}>
                        {warning}
                      </CAlert>
                    ))}
              </React.Fragment>
            )
          })}
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CCol sm={5} style={{ marginBottom: 20 }}>
                <h4 id="traffic" className="card-title mb-0">
                  {title} Details
                </h4>
                <h5>Time: {formatDate(latestData.timestamp)}</h5>
              </CCol>
              <CDropdown style={{ marginBottom: 30 }}>
                <CDropdownToggle color="secondary">Select Tractor</CDropdownToggle>
                <CDropdownMenu>
                  {tractors.map((tractor) => (
                    <CDropdownItem key={tractor.id} onClick={() => handleTractorChange(tractor.id)}>
                      {tractor.model}'s Tractor - {tractor.plateNumber}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
              <CRow>
                {Object.entries(statusFeatures.tirePressure.subFeatures).map(
                  ([subKey, subValue]) => (
                    <CCol key={subKey} sm={3}>
                      <ReactSpeedometer
                        width={250}
                        height={200}
                        key={subKey}
                        segments={5}
                        customSegmentStops={getCustomSegmentStops(
                          'tirePressure',
                          subValue.min,
                          subValue.max,
                        )}
                        segmentColors={getSegmentColors('tirePressure')}
                        minValue={subValue.min}
                        maxValue={subValue.max}
                        value={latestData.measurements.tirePressure[subKey]}
                        currentValueText={`${subValue.name}: ${latestData.measurements.tirePressure[subKey]} ${statusFeatures.tirePressure.unit}`}
                      />
                    </CCol>
                  ),
                )}
              </CRow>
              <CRow>
                {Object.entries(statusFeatures).map(
                  ([key, value]) =>
                    key !== 'tirePressure' && (
                      <CCol key={key} sm={4}>
                        <ReactSpeedometer
                          key={key}
                          width={300}
                          height={250}
                          segments={5}
                          segmentColors={getSegmentColors(key)}
                          minValue={value.min}
                          maxValue={value.max}
                          value={latestData.measurements[key]}
                          currentValueText={`${value.name}: ${latestData.measurements[key]} ${value.unit}`}
                        />
                      </CCol>
                    ),
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Vehicle Data
              </h4>
              <div className="small text-body-secondary">January - July 2023</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          {features.map((feature) => (
            <VehicleFeatureChart
              key={feature}
              data={formatChartData(tractorData, feature)}
              title={feature}
            />
          ))}
        </CCardBody>
      </CCard>
    </>
  )
}

export default VehicleDetails
