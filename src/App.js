import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './Pages/Main'
import Create from './Pages/Create'
import View from './Pages/View'
import Edit from './Pages/Edit'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/view/:id' element={<View />}></Route>
          <Route path='/edit/:id' element={<Edit />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App