import axios from 'axios'
import React, { useState } from 'react'
import "../css/summary.css"
function Summary() {

  const [summary, setSummary] = useState(null)

  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/summary")
      setSummary(res.data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>

      <h2>Expense Summary</h2>

      <button onClick={fetchSummary}>
        Get Summary
      </button>

      {summary && (
        <div>

          <h3>
            Total Expense: {summary.total_expense}
          </h3>

          <h3>Category Wise</h3>

          {summary.category_wise.map((item, index) => (
            <div key={index}>
              <p>
                {item.category}: {item.amount}
              </p>
            </div>
          ))}
          <hr/>

        </div>
      )}

    </div>
  )
}

export default Summary