'use client'
import React from 'react'
import { Provider} from 'react-redux'
import store from '@/redux/store.js'

const ReduxProvider = ({children }) => {
  return (
    <div>
        <Provider store={store}>
            {children }
        </Provider>
    </div>
  )
}

export default ReduxProvider