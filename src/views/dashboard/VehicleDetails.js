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
} from '@coreui/react'
import ReactSpeedometer from 'react-d3-speedometer'
import tractors from 'src/data/tractor'
import statusFeatures from 'src/data/tractor-status-features'
import tractorMeasurements from 'src/data/tractorMeasurements.json' // Importing the tractor measurements data

const VehicleDetails = () => {
  const { tractorId } = useParams()
  const navigate = useNavigate()
  const [selectedTractor, setSelectedTractor] = useState(tractorId || '')
  const [latestData, setLatestData] = useState(null)

  useEffect(() => {
    // Filter out the latest data for the selected tractor
    console.log(tractorMeasurements[0])
    const currentTractor = tractorMeasurements.filter(
      (tractor) => tractor.tractorId === parseInt(selectedTractor),
    )

    console.log('latest1:', currentTractor[currentTractor.length - 1])
    setLatestData(currentTractor[currentTractor.length - 1])

    console.log('latest:', latestData)
  }, [selectedTractor])

  const handleTractorChange = (selectedId) => {
    setSelectedTractor(selectedId)
    navigate(`/dashboard/vehicle/${selectedId}`)
  }

  const tractor = tractors.find((t) => t.id === parseInt(selectedTractor))

  if (!tractor) {
    return <p>Tractor with ID {selectedTractor} not found.</p>
  }

  const { owner, plateNumber } = tractor
  const title = `${owner}'s Tractor - ${plateNumber}`

  const getWarnings = (key, value) => {
    const warnings = []
    console.log('key', key)
    console.log('value', value)
    if (value.warn) {
      console.log('warn', value.warn)
      if (value.warn.high !== undefined && latestData.measurements[key] > value.warn.high) {
        warnings.push(`${value.name} is too high!`)
      }
      if (value.warn.low !== undefined && latestData.measurements[key] < value.warn.low) {
        warnings.push(`${value.name} is too low!`)
      }
    }

    return warnings
  }

  const getTirePressureWarnings = (subKey, subValue) => {
    const warnings = []
    const pressure = latestData.measurements.tirePressure[subKey]
    console.log('subval:', subValue)
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
  } else {
    console.log('else:', latestData)
  }

  const date = new Date(latestData.timestamp)

  // Format the date
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }
  const formattedDate = date.toLocaleString('en-US', options)

  return (
    <>
      <CRow>
        <CCol>
          {Object.entries(statusFeatures).map(([key, value]) =>
            key === 'tirePressure'
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
                )),
          )}
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
                <h5>Time: {formattedDate}</h5>
              </CCol>
              <CDropdown style={{ marginBottom: 30 }}>
                <CDropdownToggle color="secondary">Select Tractor</CDropdownToggle>
                <CDropdownMenu>
                  {tractors.map((tractor) => (
                    <CDropdownItem key={tractor.id} onClick={() => handleTractorChange(tractor.id)}>
                      {tractor.owner}'s Tractor - {tractor.plateNumber}
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
    </>
  )
}

export default VehicleDetails
