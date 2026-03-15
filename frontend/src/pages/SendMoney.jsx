import { useState } from "react"
import api from "../services/api"

function SendMoney() {

  const [email, setEmail] = useState("")
  const [amount, setAmount] = useState("")

  const handleTransfer = async () => {

    const token = localStorage.getItem("token")

    if (!email || !amount) {
      alert("Please fill all fields")
      return
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0")
      return
    }

    try {

      const res = await api.post(
        "/account/transfer",
        {
          receiverEmail: email,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert(res.data.message)

      setEmail("")
      setAmount("")

    } catch (err) {

      if (err.response && err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert("Transfer failed")
      }

    }
  }

  return (

    <div className="container">

      <h2>Send Money</h2>

      <input
        placeholder="Receiver Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleTransfer}>
        Send Money
      </button>

    </div>

  )
}

export default SendMoney