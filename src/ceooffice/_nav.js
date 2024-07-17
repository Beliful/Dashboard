import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilRss,
  cilLocomotive,
  cilSpeedometer,
  cilMap,
  cilSun
} from '@coreui/icons'
import { Public } from '@mui/icons-material';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const base = "/ceooffice"
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
    name: 'Earth Observation',
    to: base + '/earth-observation',
    icon: <CIcon icon={cilSun} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'IOT Devices',
  //   to: base + '/iot-devices',
  //   icon: <CIcon icon={cilRss} customClassName="nav-icon" />,
  // },
]

export default _nav
