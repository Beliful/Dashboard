import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FmdGood } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import factoryData from 'src/enerjisa/util/mock_data_hourly'
import factoryData1 from 'src/enerjisa/util/mock_data_hourly1'
import factoryData2 from 'src/enerjisa/util/mock_data_hourly2'
import factoryData3 from 'src/enerjisa/util/mock_data_hourly3'
import factoryData4 from 'src/enerjisa/util/mock_data_hourly4'
import { Divider } from '@mui/material'
import { BillPaymentStatus } from '../../const/enums'
import { createCustomIcon } from '../../util/createLeafletIcon'
import { findFactoryById, units } from '../../const/const'
import { formatDate } from '../../util/formatDate'

const Map = ({ factoryId }) => {
  const [currentData, setData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("factoryId:", factoryId)
    const latestData = getLatestData(factoryId)
    console.log("latestData:", latestData)
    setData(latestData)
  }, [factoryId])

  const getLatestData = (factoryId) => {
    let currentData = factoryData
    console.log("getLatestData called with factoryId:", factoryId)

    if (factoryId == 1) {
      currentData = factoryData1
    } else if (factoryId == 2) {
      currentData = factoryData2
    } else if (factoryId == 3) {
      currentData = factoryData3
    } else if (factoryId == 4) {
      currentData = factoryData4
    }

    if (!currentData) {
      console.error("No data found for factoryId:", factoryId)
      return null
    }

    const mapData = {
      factory: findFactoryById(factoryId),
      energyEfficiencyRating: currentData.energyEfficiencyRating,
      peakUsage: currentData.peakUsage,
      averageUsage: currentData.averageUsage,
      billData: currentData.billData,
      timeRange: [currentData.consumptionData[0].dateTime, currentData.consumptionData[currentData.consumptionData.length - 1].dateTime]
    }

    console.log("mapData:", mapData)
    return mapData
  }

  if (!currentData) {
    return <div>Loading...</div>
  }

  const getPinColor = (index) => {
    if (index == "A" || index == "B") {
      return "green"
    } else if (index == "C" || index == "D") {
      return "orange"
    } else if (index == "E") {
      return "red"
    }
  }

  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[39, 32]} zoom={6} scrollWheelZoom={true} style={{ height: '90%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {currentData.factory && (
          <Marker
            key={currentData.factory.location.name}
            position={[currentData.factory.location.lat, currentData.factory.location.lon]}
            icon={createCustomIcon(<FmdGood />, getPinColor(currentData.energyEfficiencyRating))}
          >
            <Popup>
              <div
                style={{
                  fontFamily: 'Arial, sans-serif',
                  lineHeight: 0.6,
                  borderRadius: '5px',
                }}
              >
                <h5
                  style={{ cursor: 'pointer', textDecoration: 'underline', color: 'black' }}
                  onClick={() => navigate(`/enerjisa/dashboard/device/${currentData.factory.id}`)}
                >
                  {`${currentData.factory.name} - ${currentData.factory.location.def}/${currentData.factory.location.city}`}
                </h5>
                <h6>{currentData.factory.type}</h6>
                <p style={{ fontStyle: 'italic', color: 'gray', lineHeight: "17px" }}>
                  {formatDate(currentData.timeRange[0])} - {formatDate(currentData.timeRange[1])}
                </p>

                <p><strong>Average Usage</strong>: {currentData.averageUsage} {units.averageUsage}</p>
                <p><strong>Peak Usage</strong>: {currentData.peakUsage} {units.peakUsage}</p>
                <p><strong>Energy Efficiency Rating</strong>: {currentData.energyEfficiencyRating}</p>
                <Divider />
                <p><strong>Billing Information</strong>:</p>
                <p><strong>Amount</strong>: {currentData.billData.amount} ₺</p>
                <p><strong>Due Date</strong>: {formatDate(currentData.billData.dueDate)}</p>
                <p><strong>Payment Status</strong>: {currentData.billData.paymentStatus}</p>
                {currentData.billData.paymentStatus == BillPaymentStatus.PAID ? <p><strong>Payment Date</strong>: {currentData.billData.paymentDate}</p> : null}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default Map
