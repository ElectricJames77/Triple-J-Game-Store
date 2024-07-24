import Layout from './components/Layout'
import Router from './components/Router/Router'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from 'react-auth-kit/AuthProvider'
import './App.css'

function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <BrowserRouter>
        <Layout>
          <Router/>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
