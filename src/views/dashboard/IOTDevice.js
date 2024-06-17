import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
} from '@coreui/react'
import deviceData from 'src/data/devices.json'
import iotDevices from 'src/data/iot-devices'
import sensorTypes from 'src/data/iot-device-types'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [selectedSensor, setSelectedSensor] = useState('humidity')
  const navigate = useNavigate()
  const [latestDeviceData, setLatestData] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Fetching latest data for sensor:', selectedSensor)
    const fetchLatestData = () => {
      let latestData = []
      iotDevices.forEach((device) => {
        const currentDeviceData = deviceData.filter((measurement) => measurement.id === device.id)

        if (currentDeviceData.length > 0) {
          latestData.push(currentDeviceData[currentDeviceData.length - 1])
        }

        latestData = latestData.filter((device) => {
          return device.sensorsData[selectedSensor] !== undefined
        })
      })

      console.log('latest:', latestData)
      setLatestData(latestData)
      setLoading(false) // Set loading to false after data is fetched
    }

    fetchLatestData()
  }, [selectedSensor])

  const handleButtonClick = (id) => {
    navigate(`/iot-devices/${id}`)
  }

  const handleSensorChange = (e) => {
    setSelectedSensor(e.target.value)
    setLoading(true)
  }

  if (!latestDeviceData || isLoading) {
    return null // or loading indicator
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>IOT Devices</CCardHeader>
            <CCardBody>
              <CRow>
                <CRow style={{ marginBottom: '20px' }}>
                  <CCol xs={12}>
                    <h3>IoT Devices</h3>
                    <select value={selectedSensor} onChange={handleSensorChange}>
                      <option value="humidity">Humidity</option>
                      <option value="temperature">Temperature</option>
                      <option value="pressure">Pressure</option>
                    </select>
                  </CCol>
                </CRow>
                <CRow>
                  {latestDeviceData.map((device) => (
                    <CCol key={device.id} xs={12} sm={6} md={4} lg={3}>
                      <CCard style={{ marginBottom: '15px', marginTop: '15px' }}>
                        <CCardImage
                          orientation="top"
                          src={device.imagePath}
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                        <CCardBody>
                          <CCardTitle>Tarım - {selectedSensor}</CCardTitle>
                          <CCardText>
                            <strong>Location</strong>
                            <br />
                            &nbsp;&nbsp;<strong>Latitude:</strong> {device.location.latitude}°
                            <br />
                            &nbsp;&nbsp;<strong>Longitude:</strong> {device.location.longitude}°
                            <br />
                            <br />
                            <strong>Value:</strong> {device.sensorsData[selectedSensor]}{' '}
                            {sensorTypes[selectedSensor].unit}
                            <br />
                            <strong>Timestamp:</strong>{' '}
                            {new Date(device.timestamp).toLocaleString('en-US', options)}
                          </CCardText>
                        </CCardBody>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                          <CButton color="primary" onClick={() => handleButtonClick(device.id)}>
                            View Details
                          </CButton>
                        </div>
                      </CCard>
                    </CCol>
                  ))}
                </CRow>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
