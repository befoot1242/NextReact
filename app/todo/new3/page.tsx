'use client'
import { ReactElement, useEffect, useState } from 'react'
import Link from 'next/link'

type LinkType = {
  name: string
  localpath: string
  uri: string
}

export default function Page() {
  useEffect(() => {
    fetch('http://localhost:8080/', { method: 'GET' })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        let tmp: LinkType[] = [
          { name: 'employees', localpath: json._links.employees.href, uri: '/employees' },
          { name: 'orders', localpath: json._links.orders.href, uri: '/orders' },
        ]
        setRows(tmp)
      })
      .catch((error) => {
        alert('エラー')
        console.error('エラーです:', error)
      })
  }, [])
  const [rows, setRows] = useState<LinkType[]>([])

  return (
    <>
      {rows.map((obj, index) => (
        <div key={index}>
          <Link href={obj.localpath} as={`/orders?URI=${encodeURIComponent(obj.uri)}`}>
            {obj.name}
          </Link>{' '}
        </div>
      ))}
    </>
  )
}
