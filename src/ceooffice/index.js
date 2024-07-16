import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

// import store from '../../store'
import DefaultLayout from './layout/DefaultLayout'
import store from '../store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <DefaultLayout />
  </Provider>,
)
