import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { findFactoryById } from '../../const/const'
import factoryData from 'src/enerjisa/util/mock_data_hourly'
import factoryData1 from 'src/enerjisa/util/mock_data_hourly1'
import factoryData2 from 'src/enerjisa/util/mock_data_hourly2'
import factoryData3 from 'src/enerjisa/util/mock_data_hourly3'
import factoryData4 from 'src/enerjisa/util/mock_data_hourly4'
import { calculateAQI } from '../../util/calculateAQI'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButtonGroup,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import VehicleFeatureChart from './VehicleFeatureChart'
import { getStyle } from '@coreui/utils'
import WeatherDeviceMap from './WeatherDeviceMap'

const VehicleDetails = () => {
  const { factoryId } = useParams()
  const navigate = useNavigate()
  const [latestData, setLatestData] = useState(null)
  const [currentFactoryData, setFactoryData] = useState(null)

  useEffect(() => {
    setFactoryData(getLatestDeviceData(factoryId))
  }, [factoryId])

  const getLatestDeviceData = (factoryId) => {
    let currentFactory = findFactoryById(factoryId)
    let currentData = factoryData;

    if (factoryId == 1) {
      currentData = factoryData1
    } else if (factoryId == 2) {
      currentData = factoryData2
    } else if (factoryId == 3) {
      currentData = factoryData3
    } else if (factoryId == 4) {
      currentData = factoryData4
    }

    currentData["factory"] = findFactoryById(factoryId)

    return currentData
  }

  const currentFactory = findFactoryById(factoryId)

  if (!currentFactory) {
    return <p>Factory with ID {factoryId} not found.</p>
  }

  if (!currentFactoryData) {
    return <p>Loading...</p> // or any loading indicator
  }

  const formatChartData = (data, feature) => {
    const labels = data.map((entry) => new Date(entry.timestamp).toLocaleString())
    const dataset = data.map((entry) => parseFloat(entry.electricityUsage))

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

  const features = [
    'electricityUsage',
  ]

  return (
    <div>
      <CCard className="mb-4">
      <WeatherDeviceMap factoryId={factoryId} />
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="pollution" className="card-title mb-0">
                Pollution Data
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
          {features.map((item) => (
            <VehicleFeatureChart
              key={item}
              data={formatChartData(currentFactoryData.consumptionData, item)}
              title={item}
            />
          ))}
        </CCardBody>
      </CCard>
    </div>    
  )
}

export default VehicleDetails
