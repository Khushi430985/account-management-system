import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

function Dashboard() {

  const [balance, setBalance] = useState(0)

  useEffect(() => {

    const token = localStorage.getItem("token")

    api.get("/account/balance", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setBalance(res.data.balance)
    })

  }, [])

  return (

    <div className="container">

      <h1>Dashboard</h1>

      <h2>Balance: ₹{balance}</h2>

      <div className="dashboard-buttons">

        <Link to="/send-money">
          <button>Send Money</button>
        </Link>

        <Link to="/statement">
          <button>Account Statement</button>
        </Link>

      </div>

    </div>
  )
}

export default Dashboard