import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'
import tractors from 'src/data/tractor'
import statusFeatures from 'src/data/tractor-status-features'
import tractorMeasurements from 'src/data/tractorMeasurements.json'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [latestData, setLatestData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLatestData = () => {
      const latestData = {}
      tractors.forEach((tractor) => {
        const currentTractorMeasurements = tractorMeasurements.filter(
          (measurement) => measurement.tractorId === tractor.id,
        )

        if (currentTractorMeasurements.length > 0) {
          latestData[tractor.id] = currentTractorMeasurements[currentTractorMeasurements.length - 1]
        }
      })

      console.log('latest:', latestData)
      setLatestData(latestData)
      setLoading(false) // Set loading to false after data is fetched
    }

    fetchLatestData()
  }, [])

  const handleButtonClick = (id) => {
    navigate(`/dashboard/vehicle/${id}`)
  }

  const hasWarning = (latestStatus) => {
    for (const [key, value] of Object.entries(statusFeatures)) {
      if (key === 'tirePressure') {
        for (const [subKey, subValue] of Object.entries(value.subFeatures)) {
          const pressure = latestStatus.measurements.tirePressure[subKey]
          if (pressure < subValue.warn.low || pressure > subValue.warn.high) {
            return true
          }
        }
      } else {
        const statusValue = latestStatus.measurements[key]
        if (
          (value.warn.low !== undefined && statusValue < value.warn.low) ||
          (value.warn.high !== undefined && statusValue > value.warn.high)
        ) {
          return true
        }
      }
    }
    return false
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Vehicles</CCardHeader>
            <CCardBody>
              <CRow>
                {tractors.map((tractor) => {
                  console.log('aa', latestData)
                  const latestStatus = latestData[tractor.id] || {}
                  return (
                    <CCol key={tractor.id} sm="6" md="4" lg="3" className="mb-4">
                      <CCard style={{ width: '18rem', position: 'relative' }}>
                        <CCardImage orientation="top" src={tractor.imagePath} />
                        <CCardBody>
                          <CCardTitle>{tractor.owner}'s Tractor</CCardTitle>
                          <CCardText>
                            <strong>Driver:</strong> {tractor.driver}
                            <br />
                            <strong>Plate Number:</strong> {tractor.plateNumber}
                            <br />
                            <strong>Engine Status:</strong>{' '}
                            {latestStatus.measurements.rpm > 0 ? 'Running' : 'Stopped'}
                            <br />
                            <strong>RPM:</strong> {latestStatus.measurements.rpm || 'N/A'}
                            <br />
                            <strong>Speed:</strong> {latestStatus.measurements.speed || 'N/A'} km/h
                          </CCardText>
                          <CButton color="primary" onClick={() => handleButtonClick(tractor.id)}>
                            View Details
                          </CButton>
                          {hasWarning(latestStatus) && (
                            <CTooltip
                              content="Warning: Check the tractor's status!"
                              placement="top"
                            >
                              <div
                                className="position-absolute"
                                style={{
                                  top: '10px',
                                  right: '10px',
                                  backgroundColor: 'black',
                                  borderRadius: '50%',
                                  width: '32px',
                                  height: '32px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <CIcon icon={cilWarning} size="lg" style={{ color: 'red' }} />
                              </div>
                            </CTooltip>
                          )}
                        </CCardBody>
                      </CCard>
                    </CCol>
                  )
                })}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
