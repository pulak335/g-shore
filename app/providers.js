'use client'

import { Provider } from 'react-redux'
import store from '../store'
import AuthPersist from '../components/auth/auth-persist'

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthPersist>
        {children}
      </AuthPersist>
    </Provider>
  )
}
