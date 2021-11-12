import React from 'react'
import { HealthProvider } from './useHealth'

const AppProvider: React.FC = ({ children }) => (
  <HealthProvider>{children}</HealthProvider>
)

export default AppProvider
