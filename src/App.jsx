import React from 'react'
import Navbar from './Pages/Navbar'
import { Routes ,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './components/features/Login'
import SignUp from './components/features/SignUp'
import Books from './Pages/Books'
import ProtectedRoute from './components/ProtectedRouter'
import BookCard from './components/features/BookCard'
import FinishedStories from './Pages/FinishedStories'

export default function App() {
  return (
    <>      
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route  path="/signup" element={<SignUp/>}/>
      <Route path="/Books" element={
        <ProtectedRoute>
        <Books/>
        </ProtectedRoute> }
        />
              <Route path="/BookCard" element={
        <ProtectedRoute>
        <BookCard/>
        </ProtectedRoute> }
        />
        <Route path='/completeStory' element={
          <ProtectedRoute>
            <FinishedStories/>
          </ProtectedRoute>
        }/>

        </Routes>
    </>


  )
}
