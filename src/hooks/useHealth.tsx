import React, { createContext, useCallback, useState, useContext } from 'react'
import api from 'services/api'

interface HealthContextData {
  isHealthStatus: boolean
  getHealthStatus(): void
  isLoading: boolean
}
export const HealthContext = createContext<HealthContextData>(
  {} as HealthContextData
)

export const HealthProvider: React.FC = ({ children }) => {
  const [isHealthStatus, setIsHealthStatus] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getHealthStatus = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('check')
      const response = await api.get('/health')
      console.log(response.data)
      if (response.data.status === 'OK') {
        setIsHealthStatus(true)
        setIsLoading(false)
      }
    } catch (err) {
      console.log('Error:', err)

      setIsLoading(false)
      setIsHealthStatus(false)
    }
  }, [])

  return (
    <HealthContext.Provider
      value={{
        isHealthStatus,
        getHealthStatus,
        isLoading
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
