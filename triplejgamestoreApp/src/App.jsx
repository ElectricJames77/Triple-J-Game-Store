import Layout from './components/Layout'
import Router from './components/Router/Router'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  )
}

export default App
