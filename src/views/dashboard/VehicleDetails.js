import React from 'react';
import { useParams } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react';
import ReactSpeedometer from 'react-d3-speedometer';
import tractors from 'src/data/tractor'; // Importing the tractors data
import statusFeatures from 'src/data/tractor-status-features'; // Importing the status features data

const VehicleDetails = () => {
  const { tractorId } = useParams();
  const tractor = tractors.find(t => t.id === parseInt(tractorId));

  if (!tractor) {
    return <p>Tractor with ID {tractorId} not found.</p>;
  }

  const { owner, plateNumber, vehicleStatus } = tractor;
  const title = `${owner}'s Tractor - ${plateNumber}`;

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardBody>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  {title}
                </h4>
                <div className="small text-body-secondary">Vehicle Details</div>
              </CCol>
              <CRow>
                {Object.entries(statusFeatures).map(([key, value]) => (
                  <CCol key={key} sm={4}> {/* Adjust column size as needed */}
                    {key === 'tirePressure' ? (
                      Object.entries(value.subFeatures).map(([subKey, subValue]) => (
                        <ReactSpeedometer 
                          key={subKey}
                          startColor='#78f542'
                          endColor='#f72a2a'
                          minValue={subValue.min}
                          maxValue={subValue.max}
                          value={vehicleStatus.tirePressure[subKey]} // Access sub-feature value
                          currentValueText={`${subValue.name}: ${vehicleStatus.tirePressure[subKey]} ${value.unit}`}
                        />
                      ))
                    ) : (
                      <ReactSpeedometer 
                        key={key}
                        startColor='#78f542'
                        endColor='#f72a2a'
                        minValue={value.min}
                        maxValue={value.max}
                        value={vehicleStatus[key]}
                        currentValueText={`${value.name}: ${vehicleStatus[key]} ${value.unit}`}
                      />
                    )}
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default VehicleDetails;
