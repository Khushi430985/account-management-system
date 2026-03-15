import { useState } from "react"
import api from "../services/api"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    try {

      const res = await api.post("/auth/login", { email, password })

      // store token
      localStorage.setItem("token", res.data.token)

      // store user id
      localStorage.setItem("userId", res.data.user.id)

      navigate("/dashboard")

    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert("Login failed")
      }

    }
  }

  return (

    <div className="container">

      <h2>Login</h2>

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

      <button onClick={handleLogin}>
        Login
      </button>

      <div className="link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>

    </div>
  )
}

export default Login