'use client'
import { ReactElement, useEffect, useState } from 'react'
// import Link from 'next/link'
import { Link, Button, Toolbar, Typography, ButtonGroup, Grid, CardActions } from '@mui/material'
import { Josefin_Sans } from 'next/font/google'

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
          { name: 'Employees', uri: json._links.employees.href, localpath: '' },
          { name: 'Orders', uri: json._links.orders.href, localpath: '' },
        ]
        setRows(tmp)
      })
      .catch((error) => {
        alert('エラー')
        console.error('エラーです:', error)
      })
  }, [])

  const [rows, setRows] = useState<LinkType[]>([])
  const [isMenu, setIsMenu] = useState<boolean>(true)
  const [isBusiness, setIsBusiness] = useState<boolean>(false)
  const [val, setVal] = useState<string>('Menu')
  const [detail, setDetail] = useState<string>('Menu')

  const fetchDetail = async (linkType: LinkType) => {
    fetch(linkType.uri, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        debugger
        setDetail(JSON.stringify(json))
      })
      .catch((error) => {
        alert(linkType.uri + ' エラー')
        console.error('エラーです:', error)
      })
  }

  const handleStatus = (type: LinkType) => {
    setIsMenu(false)
    setIsBusiness(true)
    setVal(type.name)
    fetchDetail(type)
    // setVal(ret)
  }

  return (
    <>
      <CardActions sx={{ justifyContent: 'center' }}>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {rows.map((obj, index) => (
            <Button
              key={index}
              className="w-[100%]"
              onClick={() =>
                handleStatus({ name: obj.name, uri: obj.uri, localpath: obj.localpath })
              }
            >
              {obj.name}
            </Button>
          ))}
          <Button
            className="w-[100%]"
            onClick={() => {
              alert('Test')
              handleStatus({ name: 'Test', uri: '', localpath: '' })
            }}
          >
            test
          </Button>
        </ButtonGroup>
      </CardActions>
      {isBusiness ? <>{detail}</> : ''}
    </>
  )
}
