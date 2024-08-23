import './App.css'
import InterviewApp from './components/InterviewApp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feedback from './components/Feedback'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InterviewApp />} />
          <Route path='/feedback' element={<Feedback />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
