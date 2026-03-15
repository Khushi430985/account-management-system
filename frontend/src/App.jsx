import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import Statement from "./pages/Statement"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/statement" element={<Statement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App