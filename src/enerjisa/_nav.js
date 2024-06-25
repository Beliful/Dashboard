import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilMap, cilInfo
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const base = "/enerjisa"
const _nav = [
  {
    component: CNavItem,
    name: 'Map',
    to: base + '/map',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  },
]

export default _nav
