'use client'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, useLocation } from 'react-router-dom'

export default function Page() {
  const [rows, setRows] = useState<string>()
  debugger
  const searchParams = new URLSearchParams(useLocation().search)
  const uri = searchParams.get('uri') || 'Guest'
  console.log(uri)

  useEffect(() => {
    setRows(uri)
  }, [uri])
  return (
    <>
      <BrowserRouter>
        <Route>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div>{rows}</div>
        </Route>
      </BrowserRouter>
    </>
  )
}
