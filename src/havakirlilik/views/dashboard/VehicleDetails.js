import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { locations, findLocationById } from '../../const/const'
import pollutionData1 from 'src/havakirlilik/util/pollutionData1'
import pollutionData2 from 'src/havakirlilik/util/pollutionData2'
import pollutionData3 from 'src/havakirlilik/util/pollutionData3'
import pollutionData4 from 'src/havakirlilik/util/pollutionData4'
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
  const { locationId } = useParams()
  const navigate = useNavigate()
  const [latestData, setLatestData] = useState(null)
  const [pollutionData, setPollutionData] = useState(null)

  useEffect(() => {
    const data = getLatestDeviceData(locationId)
    setLatestData(data.latestData)
    setPollutionData(data.locationPollution)
  }, [locationId])

  const getLatestDeviceData = (locationId) => {
    let currentLoc = findLocationById(locationId)
    let locationPollution = pollutionData3

    if (currentLoc.name.toUpperCase() === 'IZMIR') {
      locationPollution = pollutionData1
    } else if (currentLoc.name.toUpperCase() === 'TURUNC') {
      locationPollution = pollutionData2
    } else if (currentLoc.name.toUpperCase() === 'KUSADASI') {
      locationPollution = pollutionData4
    }

    locationPollution.forEach((data) => {
      data.AQI = calculateAQI(data.measurements)
      data.location = currentLoc
    })

    const latestData = locationPollution[locationPollution.length - 1]

    return { latestData, locationPollution }
  }

  const currentLocation = findLocationById(locationId)

  if (!currentLocation) {
    return <p>Device with ID {locationId} not found.</p>
  }

  if (!latestData) {
    return <p>Loading...</p> // or any loading indicator
  }

  const formatChartData = (data, feature) => {
    const labels = data.map((entry) => new Date(entry.timestamp).toLocaleString())
    const dataset = data.map((entry) => parseFloat(entry.measurements[feature]))

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
    'O3',
    'PM25',
    'PM10',
    'CO',
    'SO2',
    'NO2',
  ]

  return (
    <div>
      <CCard className="mb-4">
      <WeatherDeviceMap data={latestData} />
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
          {features.map((poll) => (
            <VehicleFeatureChart
              key={poll}
              data={formatChartData(pollutionData, poll)}
              title={poll}
            />
          ))}
        </CCardBody>
      </CCard>
    </div>    
  )
}

export default VehicleDetails
