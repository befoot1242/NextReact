'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Page() {
  // const colors = []
  // const recordCount = 25
  // for (let i = 0; i < recordCount; i++) colors.push(i)
  // const initialRows = colors.map((color, index) => (
  //   <div key={color} className="todolist">
  //     <div className="item name">name {+index}</div>
  //     <div className="item detail">detail</div>
  //     <div className="item check"></div>
  //   </div>
  // ))
  let initialRows: any = []
  useEffect(() => {
    fetch('http://localhost:8080/employees', { method: 'GET' })
      .then((res) => res.json())
      .then((json) =>
        // console.log(json)
        //(initialRows =
        setRows(
          json._embedded.employeeList.map((obj: any, index: BigInteger) => (
            <div key={obj.id} className="todolist">
              <div className="item name">{obj.name}</div>
              <div className="item detail">{obj.role}</div>
              <Link
                className="h-full w-full flex justify-center items-center"
                href={obj._links.self.href}
              >
                new
              </Link>{' '}
            </div>
          ))
        )
      )
      .catch(() => alert('error'))
  })
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
