'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Props } from 'next/script'
import { useParams, useHistory, useLocation } from 'react-router-dom'

export default function Page(props: Props) {
  // useEffect(() => {
  //   fetch('http://localhost:8080/employees', { method: 'GET' })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json)
  //       setRows(
  //         json._embedded.employeeList.map((obj: any, index: BigInteger) => (
  //           <div key={obj.id} className="todolist">
  //             <div className="item name">{obj.name}</div>
  //             <div className="item detail">{obj.role}</div>
  //             <Link
  //               className="h-full w-full flex justify-center items-center"
  //               href={obj._links.self.href}
  //             >
  //               new
  //             </Link>{' '}
  //           </div>
  //         ))
  //       )
  //     })
  //     .catch(() => alert('error'))
  // })
  // const [rows, setRows] = useState()
  const location = useLocation() // URL path や パラメータなど。JSのlocationと同じ
  const params = useParams() // URLのパスパラメータを取得。例えば、 /uses/2 なら、2の部分を取得
  const history = useHistory() // historyオブジェクトを取得。
  console.log(location)
  console.log(params)
  console.log(history)

  return (
    <>
      <div>a</div>
    </>
  )
}
