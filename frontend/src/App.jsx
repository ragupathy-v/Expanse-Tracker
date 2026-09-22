import { useState,useEffect } from 'react'
import axios from "axios"
import './App.css'
import Addexpense from './components/Addexpense'
import Summary from './components/summary'

function App() {
  const[expense,setExpense] = useState([])

  const fetchExpense=async()=>{
      const res= await axios.get("https://expanse-tracker-fobl.onrender.com/getexpense")
      setExpense(res.data.expense)
      console.log(res.data.expense)      
    }
useEffect(()=>{fetchExpense()},[])
  return (
    
    <>
      <p>EXPENSE ANALYIS</p>

      <Addexpense  onExpenseAdded={fetchExpense}/>
      <Summary/>

      {expense.map((item)=>(<div key={item.id}>
        <p>Amount: {item.amount}</p>
          <p>Category: {item.category}</p>
          <p>Note: {item.note}</p>
          <p>Date: {item.date}</p>
          <hr />
      </div>
      ))}
    </>
  )
}

export default App
