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
import tractors from 'src/ceooffice/data/tractor'
import statusFeatures from 'src/ceooffice/data/tractor-status-features'
import tractorMeasurements from 'src/ceooffice/util/tractorMeasurements.json'
import { useNavigate } from 'react-router-dom'
import tractorImage1 from 'src/ceooffice/assets/images/vehicles/tractor1.png'
import tractorImage2 from 'src/ceooffice/assets/images/vehicles/tractor2.png'
import tractorImage3 from 'src/ceooffice/assets/images/vehicles/kepcebuyuk.png'
import tractorImage4 from 'src/ceooffice/assets/images/vehicles/mankamyon.png'
import tractorImage5 from 'src/ceooffice/assets/images/vehicles/minikkepce.png'

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

      setLatestData(latestData)
      setLoading(false) // Set loading to false after data is fetched
    }

    fetchLatestData()
  }, [])

  const handleButtonClick = (id) => {
    navigate(`/ceooffice/dashboard/vehicle/${id}`)
  }

  const setVehicleImage = (vehicleImg) => {
    if (vehicleImg == "tractor1") {
      return tractorImage1
    } else if (vehicleImg == "tractor2") {
      return tractorImage2
    } else if (vehicleImg == "minikkepce") {
      return tractorImage3
    } else if (vehicleImg == "mankamyon") {
      return tractorImage4
    } else {
      return tractorImage5
    }
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
                  const latestStatus = latestData[tractor.id] || {}
                  return (
                    <CCol key={tractor.id} sm="6" md="4" lg="3" className="mb-4">
                      <CCard style={{ width: '18rem', position: 'relative' }}>
                        <CCardImage orientation="top" src={setVehicleImage(tractor.imagePath)} width={450} height={200} />
                        <CCardBody>
                          <CCardTitle>{tractor.model}</CCardTitle>
                          <CCardText>
                            <strong>Plate Number:</strong> {tractor.plateNumber}
                            <br />
                            <strong>Driver:</strong> {tractor.driver}
                            <br />
                            <strong>Engine Status:</strong>{' '}
                            {latestStatus.measurements.rpm > 0
                              ? latestStatus.measurements.speed > 0
                                ? 'Running'
                                : 'Idling'
                              : 'Stopped'}
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
