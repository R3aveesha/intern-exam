import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Create from './Pages/Create'
import Delete from './Pages/Delete'
import Edit from './Pages/Edit'
import Home from './Pages/Home'
import StartPAge from './Pages/StartPAge'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<StartPAge/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/reviews/edit/:id' element={<Edit/>}></Route>
        <Route path='/reviews/delete/:id' element={<Delete/>}></Route>
        <Route path='/reviews/create' element={<Create/>}></Route>

      </Routes>
    </div>
  )
}

export default App