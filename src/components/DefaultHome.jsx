import { CButton, CCard, CCardBody, CCardHeader, CCardImage, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';
import React from 'react';
import { DocsExample } from '../turktraktor/components';

function DefaultHome() {
  const handleClick = (buttonName) => {
    alert(`You clicked ${buttonName}`);
  };

  return (
    <CCard className="mb-4" style={{maxWidth: "100%"}}>
        <CCardHeader style={{textAlign: "center", fontSize: 22}}>
            <strong>Plan-S Demo Web Apps</strong>
        </CCardHeader>
        <CCardBody style={{marginTop: "50px", marginBottom: "50px", display: "flex", justifyContent: "center", gap: "40px"}}>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                <CCardTitle>Turk Traktor</CCardTitle>
                <CCardText>
                    A dashboard application displaying the location and status of the tractors and IoT devices.
                </CCardText>
                <CButton color="primary" href="/turktraktor">
                    Go to demo
                </CButton>
                </CCardBody>
            </CCard>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                <CCardTitle>Turk Traktor</CCardTitle>
                <CCardText>
                    A dashboard application displaying the location and status of the tractors and IoT devices.
                </CCardText>
                <CButton color="primary" href="/turktraktor">
                    Go to demo
                </CButton>
                </CCardBody>
            </CCard>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                <CCardTitle>Turk Traktor</CCardTitle>
                <CCardText>
                    A dashboard application displaying the location and status of the tractors and IoT devices.
                </CCardText>
                <CButton color="primary" href="/turktraktor">
                    Go to demo
                </CButton>
                </CCardBody>
            </CCard>
        </CCardBody>
    </CCard>
  );
}

export default DefaultHome;
