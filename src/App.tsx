import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import Navigation from 'routes'
import theme from 'styles/theme'
import AppProvider from 'hooks'
import { useEffect } from 'react'
function App() {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Navigation />
      </ThemeProvider>
    </AppProvider>
  )
}

export default App
