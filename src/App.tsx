import { ThemeProvider } from 'styled-components'
import GlobalStyles from 'styles/global'
import Navigation from 'routes'
import theme from 'styles/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Navigation />
    </ThemeProvider>
  )
}

export default App
