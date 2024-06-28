import React from 'react'
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
import statusFeatures from 'src/turktraktor/data/tractor-status-features'
import { useNavigate } from 'react-router-dom'

const DashboardIoT = () => {
  const navigate = useNavigate()

  const handleButtonClick = (id) => {
    navigate(`/turktraktor/dashboard/vehicle/${id}`)
  }

  const hasWarning = (vehicleStatus) => {
    for (const [key, value] of Object.entries(statusFeatures)) {
      if (key === 'tirePressure') {
        for (const [subKey, subValue] of Object.entries(value.subFeatures)) {
          const pressure = vehicleStatus.tirePressure[subKey]
          if (pressure < subValue.warn.low || pressure > subValue.warn.high) {
            return true
          }
        }
      } else {
        const statusValue = vehicleStatus[key]
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

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Vehicles</CCardHeader>
            <CCardBody>
              <CRow>
                {tractors.map((tractor) => (
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
                          {tractor.vehicleStatus.rpm > 0 ? 'Running' : 'Stopped'}
                        </CCardText>
                        <CButton color="primary" onClick={() => handleButtonClick(tractor.id)}>
                          View Details
                        </CButton>
                        {hasWarning(tractor.vehicleStatus) && (
                          <CTooltip content="Warning: Check the tractor's status!" placement="top">
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
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DashboardIoT
