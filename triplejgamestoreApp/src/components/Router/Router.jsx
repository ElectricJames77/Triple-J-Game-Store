import {Route, Routes} from 'react-router-dom'
const Router = () => {
    return (
      <Routes>
          <Route path='/' element={<h1>Home page</h1>}/>
          <Route path='/account' element={<h1>Account details</h1>}/>
          <Route path='/account/login' element ={<h1>Account login</h1>}/>
          <Route path='/account/register' element={<h1>Account register</h1>}/>
          <Route path='/store' element ={<h1>Main store</h1>}/>
          <Route path='/store/checkout' element={<h1>Checkout</h1>}/>
          <Route path='/store/:gameid' element ={<h1>Game details</h1>}/>
      </Routes>
    )
  }
  
  export default Router