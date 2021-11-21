import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom'
import Home from 'pages/Home'
import Details from 'pages/Details'
import { useHealth } from 'hooks/useHealth'
import RetryCard from 'components/RetryCard'

const Navigation = () => {
  const [hasInternet, setHasInternet] = useState(true)
  const { isHealthStatus, getHealthStatus } = useHealth()
  console.log('has', hasInternet)

  const monitorConnectivity = () => {
    setHasInternet(window.navigator.onLine)
  }

  useEffect(() => {
    window.addEventListener('online', monitorConnectivity)
    window.addEventListener('offline', monitorConnectivity)
    getHealthStatus()
  }, [])

  if (!hasInternet || !isHealthStatus)
    return <RetryCard hasInternet={hasInternet} />
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/questions" />} />
        <Route path="/questions" element={<Home />} />
        <Route path="/questions/:id" element={<Details />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  )
}

export default Navigation

const NoMatch = () => {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
