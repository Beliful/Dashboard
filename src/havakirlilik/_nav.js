import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilMap,
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
]

export default _nav
