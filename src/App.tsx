import React from 'react'

import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import UserRouter from './Router/UserRouter'
import Speech from './Components/Common/Speech'
import { ToastContainer } from 'react-toastify'
import { Toaster } from 'sonner';
import { ThemeProvider } from "next-themes";


const App = () => {
  return (
    <div>
    <Router>
      <ToastContainer/>
      {/* <ThemeProvider attribute='class' > */}
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path='/*' element={<UserRouter/>}/>
      </Routes>
      {/* </ThemeProvider> */}
    </Router>
    </div>
  )
}

export default App
