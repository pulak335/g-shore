'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/slices/auth-slice'
import userService from '../../services/user-service'

export default function AuthPersist({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const user = await userService.getCurrentUser()
          if (user) {
            dispatch(setUser(user))
          }
        } catch (error) {
          console.error('Failed to restore auth state:', error)
          localStorage.removeItem('token')
        }
      }
    }

    initializeAuth()
  }, [dispatch])

  return children
}
