
import React, { useState } from 'react'
import axios from 'axios'
import "../css/addexpanse.css"

function Addexpense({onExpenseAdded}) {

  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage]=useState('')

  const AddExpense = async (e) => {
    e.preventDefault()

    const data = {
      amount: amount,
      category: category,
      note: note,
      date: date
    }
    try{
    const res = await axios.post(
      "https://expanse-tracker-fobl.onrender.com/addexpense",
      data
    )
    setMessage(res.data.message)
console.log(res.data)

// tell app component to rerender
onExpenseAdded()
}catch(err){
    console.log(err)
}
    
  }

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={AddExpense}>

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <br /><br />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <br /><br />

        <label>Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <br /><br />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Add Expense
        </button>
        {message&&<p>{message}</p>}
      </form>
    </div>
  )
}

export default Addexpense

