import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilRss,
  cilLocomotive,
  cilSpeedometer,
  cilMap,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const base = "/havakirlilik"
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard Temp',
    to: base + '/dashboard-template',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Map',
    to: base + '/map',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: base + '/dashboard',
    icon: <CIcon icon={cilLocomotive} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'IOT Devices',
    to: base + '/iot-devices',
    icon: <CIcon icon={cilRss} customClassName="nav-icon" />,
  },
]

export default _nav
