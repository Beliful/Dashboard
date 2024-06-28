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
  CButton,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import ReactSpeedometer from 'react-d3-speedometer'
import iotDevices from 'src/turktraktor/data/iot-devices'
import statusFeatures from 'src/turktraktor/data/iot-status-features'
import IOTMeasurements from 'src/turktraktor/data/devices.json'
import IOTFeatureChart from './IOTFeatureChart'

const IOTDetails = () => {
  const { IOTId } = useParams()
  const navigate = useNavigate()
  const [selectedIOT, setSelectedIOT] = useState(IOTId || '')
  const [latestData, setLatestData] = useState(null)
  const [IOTData, setIOTData] = useState([])

  useEffect(() => {
    const currentIOT = IOTMeasurements.filter(
      (IOT) => IOT.id === parseInt(selectedIOT)
    )
    setLatestData(currentIOT[currentIOT.length - 1])
    setIOTData(currentIOT)
  }, [selectedIOT])

  const handleIOTChange = (selectedIOTId) => {
    setSelectedIOT(selectedIOTId)
    navigate(`/iot-devices/${selectedIOTId}`)
  }

  const IOT = iotDevices.find((t) => t.id === parseInt(selectedIOT))
  if (!IOT) {
    return <p>IOT with IOTId {selectedIOT} not found.</p>
  }

  const title = `Device ${selectedIOT}`

  const getWarnings = (key, value) => {
    const warnings = []
    if (value.warn && latestData && latestData.sensorsData) {
      if (value.warn.high !== undefined && latestData.sensorsData[key] > value.warn.high) {
        warnings.push(`${value.name} is too high!`)
      }
      if (value.warn.low !== undefined && latestData.sensorsData[key] < value.warn.low) {
        warnings.push(`${value.name} is too low!`)
      }
    }
    return warnings
  }

  const getTirePressureWarnings = (subKey, subValue) => {
    const warnings = []
    if (latestData && latestData.sensorsData && latestData.sensorsData.tirePressure) {
      const pressure = latestData.sensorsData.tirePressure[subKey]
      if (subValue.warn.high !== undefined && pressure > subValue.warn.high) {
        warnings.push(`${subValue.name} pressure is too high!`)
      }
      if (subValue.warn.low !== undefined && pressure < subValue.warn.low) {
        warnings.push(`${subValue.name} pressure is too low!`)
      }
    }
    return warnings
  }

  const getSegmentColors = (key) => {
    if (key === 'tirePressure') {
      return ['#f54242', '#f5f542', '#78f542', '#f5f542', '#f54242']
    } else {
      return ['#78f542', '#b4f542', '#f5f542', '#f5a442', '#f54242']
    }
  }

  const getCustomSegmentStops = (key, min, max) => {
    if (key === 'tirePressure') {
      return [20, 25, 30, 35, 40, 45]
    } else {
      return undefined
    }
  }

  if (!latestData) {
    return null
  }

  const date = new Date(latestData.timestamp)

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

  const features = ['humidity', 'pressure', 'temperature']

  const formatChartData = (data, feature) => {
    const labels = data.map((entry) => new Date(entry.timestamp).toLocaleString())
    const dataset = data.map((entry) => parseFloat(entry.sensorsData[feature]))

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
          {Object.entries(statusFeatures).map(([key, value]) => (
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
          ))}
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
                <CDropdownToggle color="secondary">Select IOT</CDropdownToggle>
                <CDropdownMenu>
                  {iotDevices.map((IOT) => (
                    <CDropdownItem key={IOT.id} onClick={() => handleIOTChange(IOT.id)}>
                      IOT - {IOT.id}
                    </CDropdownItem>
                  ))}
                </CDropdownMenu>
              </CDropdown>
              <CRow>
                {statusFeatures.tirePressure &&
                  Object.entries(statusFeatures.tirePressure.subFeatures).map(
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
                          value={latestData.sensorsData.tirePressure[subKey]}
                          currentValueText={`${subValue.name}: ${latestData.sensorsData.tirePressure[subKey]} ${statusFeatures.tirePressure.unit}`}
                        />
                      </CCol>
                    ),
                  )}
              </CRow>
              <CRow>
                {Object.entries(statusFeatures).map(
                  ([key, value]) =>
                    key !== 'tirePressure' && value && latestData.sensorsData[key] !== undefined && (
                      <CCol key={key} sm={4}>
                        <ReactSpeedometer
                          key={key}
                          width={300}
                          height={250}
                          segments={5}
                          segmentColors={getSegmentColors(key)}
                          minValue={value.min}
                          maxValue={value.max}
                          value={latestData.sensorsData[key]}
                          currentValueText={`${value.name}: ${latestData.sensorsData[key]} ${value.unit}`}
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
                IOT Data
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
          {features.map((feature) => {
            const data = IOTData.map((entry) => entry.sensorsData[feature])
            if (data.every((value) => value !== undefined)) {
              return (
                <IOTFeatureChart
                  key={feature}
                  data={formatChartData(IOTData, feature)}
                  title={feature}
                />
              )
            }
            return null
          })}
        </CCardBody>
      </CCard>
    </>
  )
}

export default IOTDetails
