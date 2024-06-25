import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Agriculture, FmdGood, RssFeed } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import factoryData from 'src/enerjisa/util/mock_data_hourly'
import factoryData1 from 'src/enerjisa/util/mock_data_hourly1'
import factoryData2 from 'src/enerjisa/util/mock_data_hourly2'
import factoryData3 from 'src/enerjisa/util/mock_data_hourly3'
import factoryData4 from 'src/enerjisa/util/mock_data_hourly4'
import { AQINames, BillPaymentStatus } from '../../../const/enums'
import { createCustomIcon } from '../../../util/createLeafletIcon'
import { findFactoryById, units } from '../../../const/const'
import { formatDate } from '../../../util/formatDate'
import { Divider } from '@mui/material'

const Map = () => {
  const [selectedStatus, setSelectedStatus] = useState(
    Object.values(BillPaymentStatus),
  ) // All statuses selected initially
  const [dataArr, setData] = useState([])
  const navigate = useNavigate()

  const handleStatusSelectionChange = (status) => {
    setSelectedStatus((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status],
    )
  }

  useEffect(() => {
    const factorydata = []

    for (let i = 0; i < 5; i++) {
      factorydata.push(getLatestData(i))
    }

    setData(factorydata)
  }, [])

  const getLatestData = (factoryId) => {
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

    const mapData = {
      factory: findFactoryById(factoryId),
      energyEfficiencyRating: currentData.energyEfficiencyRating,
      peakUsage: currentData.peakUsage,
      averageUsage: currentData.averageUsage,
      billData: currentData.billData,
      timeRange: [currentData.consumptionData[0].dateTime, currentData.consumptionData[currentData.consumptionData.length - 1].dateTime]
    }
    
    console.log(mapData)   
    return mapData
  }

  const getPinColor = (index) => {
    if (index == "A" || index == "B") {
      return "green";
    } else if (index == "C" || index == "D") {
      return "orange";
    } else if (index == "E") {
      return "red";
    }
  }

  return (
    <div style={{ height: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>        
        <label
          style={{
            padding: '2px 10px',
          }}
        >
          Filter by Bill Payment Status{' '}
        </label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderColor: 'red',
          }}
        >
          {Object.values(BillPaymentStatus).map((status) => (
            <label
              key={status}
              style={{
                padding: '2px 10px',
              }}
            >
              <input
                type="checkbox"
                checked={selectedStatus.includes(status)}
                onChange={() => handleStatusSelectionChange(status)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>
      <MapContainer center={[39, 32]} zoom={6} scrollWheelZoom={true} style={{ height: '90%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {dataArr
          .filter(item => selectedStatus.includes(item.billData.paymentStatus)) // Filter markers based on selected AQI
          .map((item) => {
          return (
            <Marker
              key={item.factory.location.name}
              position={[item.factory.location.lat, item.factory.location.lon]}
              icon={createCustomIcon(<FmdGood />, getPinColor(item.energyEfficiencyRating))
              }
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
                      onClick={() => navigate(`/enerjisa/dashboard/factory/${item.factory.id}`)}
                    >
                      {`${item.factory.name} - ${item.factory.location.def}/${item.factory.location.city}`}
                    </h5>
                    <h6>{item.factory.type}</h6>
                    <p style={{ fontStyle: 'italic', color: 'gray', lineHeight: "17px" }}>
                      {formatDate(item.timeRange[0])} - {formatDate(item.timeRange[1])}
                    </p>
                    
                    <p><strong>Average Usage</strong>: {item.averageUsage} {units.averageUsage}</p>
                    <p><strong>Peak Usage</strong>: {item.peakUsage} {units.peakUsage}</p>
                    <p><strong>Energy Efficiency Rating</strong>: {item.energyEfficiencyRating}</p>
                    <Divider/>
                    <p><strong>Billing Information</strong>:</p>
                    <p><strong>Amount</strong>: {item.billData.amount} ₺</p>
                    <p><strong>Due Date</strong>: {formatDate(item.billData.dueDate)}</p>
                    <p><strong>Payment Status</strong>: {item.billData.paymentStatus}</p>
                    {item.billData.paymentStatus == BillPaymentStatus.PAID ? <p><strong>Payment Date</strong>: {item.billData.paymentDate}</p> : null}
                  </div>
                
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
