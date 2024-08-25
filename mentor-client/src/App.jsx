import './App.css'
import Navbar from './components/Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

function App() {


  return (
    <div className='flex flex-col h-screen bg-gray-900 text-gray-100'>
      <Navbar />
      <div className='h-screen flex flex-1 overflow-hidden no-scrollbar bg-white'>

        <Sidebar />
      </div>
    </div>
  )
}

export default App
