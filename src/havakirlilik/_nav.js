import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilMap, cilInfo
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const base = "/havakirlilik"
const _nav = [
  {
    component: CNavItem,
    name: 'Map',
    to: base + '/map',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Air Quality Index',
    to: base + '/aqi',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
]

export default _nav
