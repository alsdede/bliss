import React, { createContext, useCallback, useState, useContext } from 'react'
import api from 'services/api'

type Health = {
  statusHealth: boolean
}

interface HealthContextData {
  statusHealth: boolean
  checkHealthStatus(): void
  loading: boolean
}
export const HealthContext = createContext<HealthContextData>(
  {} as HealthContextData
)

export const HealthProvider: React.FC = ({ children }) => {
  const [statusHealth, setStatusHealth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState()

  const checkHealthStatus = useCallback(async () => {
    try {
      setLoading(true)
      console.log('check')
      const response = await api.get('/health')
      console.log(response.data)
      if (response.data.status === 'OK') {
        setStatusHealth(true)
        setLoading(false)
      }
    } catch (err) {
      console.log('Error:', err)

      setLoading(false)
      setStatusHealth(false)
    }
  }, [])

  return (
    <HealthContext.Provider
      value={{
        statusHealth,
        checkHealthStatus,
        loading
      }}
    >
      {children}
    </HealthContext.Provider>
  )
}

export function useHealth(): HealthContextData {
  const context = useContext(HealthContext)

  if (!context) {
    throw new Error('useHealth must be used within an HealthProvider')
  }
  return context
}
