import { useState } from "react"
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom"

function Signup() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {

    if (!name || !email || !password) {
      alert("Please fill all fields")
      return
    }

    try {

      await api.post("/auth/signup", { name, email, password })

      alert("Signup successful")

      navigate("/")

    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert("Signup failed")
      }

    }
  }

  return (

    <div className="container">

      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Signup
      </button>

      <div className="link">
        Already have an account? <Link to="/">Login</Link>
      </div>

    </div>

  )
}

export default Signup