import React from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'
import TractorImg from 'src/assets/images/tractor1.png'
import tractors from 'src/data/tractor';


const Dashboard = () => {
  
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
                    <CCard style={{ width: '18rem' }}>
                      <CCardImage
                       orientation="top" src={TractorImg} />
                       <CCardBody>
                         <CCardTitle>{tractor.owner}'s Tractor</CCardTitle>
                         <CCardText>
                           <strong>Driver:</strong> {tractor.driver}<br />
                           <strong>Plate Number:</strong> {tractor.plateNumber}<br />
                           <strong>Engine Status:</strong> {tractor.vehicleStatus.rpm > 0 ? 'Running' : 'Stopped'}
                         </CCardText>
                         <CButton color="primary" href="#">
                           View Details
                         </CButton>
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

export default Dashboard
