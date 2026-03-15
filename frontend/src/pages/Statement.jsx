import { useEffect, useState } from "react"
import api from "../services/api"

function Statement() {

  const [transactions, setTransactions] = useState([])
  const userId = localStorage.getItem("userId")

  useEffect(() => {

    const token = localStorage.getItem("token")

    api.get("/account/statement", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setTransactions(res.data)
    })
    .catch(err => {
      console.error("Error fetching transactions:", err)
    })

  }, [])

  return (

    <div>

      <h2>Account Statement</h2>

      <table border="1">

        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>

        <tbody>

          {transactions.length === 0 ? (

            <tr>
              <td colSpan="5">No transactions found</td>
            </tr>

          ) : (

            transactions.map((t, index) => {

              const isSender = t.sender_id === userId

              return (

                <tr key={index}>

                  <td>
                    {new Date(t.created_at).toLocaleDateString()}
                  </td>

                  <td
                    style={{
                      color: isSender ? "red" : "green",
                      fontWeight: "bold"
                    }}
                  >
                    {isSender ? "Debit" : "Credit"}
                  </td>

                  <td>₹{t.amount}</td>

                  <td>{isSender ? "You" : t.sender_name}</td>

                  <td>{isSender ? t.receiver_name : "You"}</td>

                </tr>

              )

            })

          )}

        </tbody>

      </table>

    </div>

  )
}

export default Statement