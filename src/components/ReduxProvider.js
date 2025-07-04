'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { useEffect } from 'react'
import { loadTokensFromStorage } from '@/redux/slices/authSlice'

export default function ReduxProvider({ children }) {
  useEffect(() => {
    store.dispatch(loadTokensFromStorage())
  }, [])

  return <Provider store={store}>{children}</Provider>
}
