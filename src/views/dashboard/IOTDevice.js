import React, { useState } from 'react'
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
import iotDevices from 'src/data/iotDevice'

const Dashboard = () => {
  const [selectedSensor, setSelectedSensor] = useState('humidity')

  const handleSensorChange = (e) => {
    setSelectedSensor(e.target.value)
  }

  const filteredDevices = iotDevices.filter((device) => {
    return device.sensorsData[selectedSensor] !== undefined
  })

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
                      {/* Add more options for other sensor types */}
                    </select>
                  </CCol>
                </CRow>
                <CRow>
                  {filteredDevices.map((device) => (
                    <CCol key={device.id} xs={12} sm={6} md={4} lg={3}>
                      <CCard style={{ marginBottom: '15px', marginTop: '15px' }}>
                        <CCardImage orientation="top" src={device.imagePath} />{' '}
                        {/* Display device image */}
                        <CCardBody>
                          <CCardTitle>{device.name}</CCardTitle>
                          <CCardText>
                            <strong>{selectedSensor}:</strong> {device.sensorsData[selectedSensor]}
                          </CCardText>
                        </CCardBody>
                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                          <CButton color="primary">View Details</CButton>
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
