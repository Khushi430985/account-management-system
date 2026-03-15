import { supabase } from "../config/supabaseClient.js"

// Get balance
export const getBalance = async (req, res) => {

  const userId = req.user.id

  const { data, error } = await supabase
    .from("users")
    .select("balance")
    .eq("id", userId)
    .single()

  if (error) return res.status(400).json({ error: error.message })

  res.json(data)
}


// Get account statement
export const getStatement = async (req, res) => {

  const userId = req.user.id

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at", { ascending: false })

  if (error) return res.status(400).json({ error: error.message })

  res.json(data)
}


// Transfer money
export const transferMoney = async (req, res) => {

  const senderId = req.user.id
  const { receiverEmail, amount } = req.body

  // find receiver
  const { data: receiver } = await supabase
    .from("users")
    .select("*")
    .eq("email", receiverEmail)
    .single()

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" })
  }

  // find sender
  const { data: sender } = await supabase
    .from("users")
    .select("*")
    .eq("id", senderId)
    .single()
  if (receiver.id === senderId) {
    return res.status(400).json({ message: "You cannot send money to yourself" })
  }
  if (sender.balance < amount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  const senderNewBalance = sender.balance - amount
  const receiverNewBalance = receiver.balance + amount

  // update balances
  await supabase
    .from("users")
    .update({ balance: senderNewBalance })
    .eq("id", senderId)

  await supabase
    .from("users")
    .update({ balance: receiverNewBalance })
    .eq("id", receiver.id)

  // insert transactions WITH NAMES
  await supabase.from("transactions").insert({
  sender_id: senderId,
  receiver_id: receiver.id,
  sender_name: sender.name,
  receiver_name: receiver.name,
  amount: amount,
  transaction_type: "debit"
})
  res.json({ message: "Transfer successful" })
}