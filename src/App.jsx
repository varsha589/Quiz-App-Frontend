
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'



function App() {
  

  return (
    <>
      <div className='min-h-screen flex flex-col content-between bg-gray-400'>
      
      <Header />
      <main className = "flex-1">
        <Outlet />
      </main>
      <Footer />
    
    </div>
      
    </>
  )
}

export default App
