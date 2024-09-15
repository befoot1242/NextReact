'use client'
import { ReactElement, useEffect, useState } from 'react'
// import Link from 'next/link'
import { Link, Button, Toolbar, Typography, ButtonGroup, Grid, CardActions } from '@mui/material'
import JSONViewer from '@/app/component/JSONViewer.js'
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
  const [detailString, setDetailString] = useState<string>('Menu')
  const [detail, setDetail] = useState<string[][]>()

  const fetchDetail = async (linkType: LinkType) => {
    fetch(linkType.uri, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setDetailString(JSON.stringify(json))

        let ld: string[][] = []
        let list = null
        if (linkType.name === 'Employees') list = json._embedded.employeeList
        else if (linkType.name === 'Orders') list = json._embedded.orderList

        for (let obj in list) {
          let ar: string[] = []
          for (let key in list[obj]) {
            if (key === '_links') ar.push(list[obj][key].self.href)
            else ar.push(list[obj][key])
          }
          ld.push(ar)
        }
        setDetail(ld)
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
      {isBusiness ? (
        <>
          {/* {detail} */}
          {detail?.map((row) => (
            <div key={row[0]} className="flex">
              {row.map((v) => (
                <div key={v} className="w-[1000]">
                  {v}
                </div>
              ))}
            </div>
          ))}
          {/* <JSONViewer /> */}
        </>
      ) : (
        ''
      )}
    </>
  )
}
