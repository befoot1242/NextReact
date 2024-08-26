'use client'
import { useState } from 'react'

export default function Page() {
  const colors = []
  const recordCount = 25
  for (let i = 0; i < recordCount; i++) colors.push(i)
  const initialRows = colors.map((color, index) => (
    <div key={color} className="todolist">
      <div className="item name">name {+index}</div>
      <div className="item detail">detail</div>
      <div className="item check"></div>
    </div>
  ))
  const [rows, setRows] = useState(initialRows)

  return (
    <>
      {rows}
      <form>
        <div className="forminput">
          <div className="item name">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" style={{ width: '100%' }} />
          </div>
          <div className="item detail">
            <label htmlFor="detail">detail:</label>
            <input type="text" name="detail" id="detail" style={{ width: '100%' }} />
          </div>
        </div>
      </form>
    </>
  )
}
