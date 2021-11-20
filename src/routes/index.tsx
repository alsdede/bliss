import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from 'pages/Home'

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Home />} />
        <Route path="/questions/:id" element={<Home />} />
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
