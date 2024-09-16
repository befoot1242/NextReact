'use client'
import { ReactElement, useEffect, useState } from 'react'
import { Button, ButtonGroup, CardActions } from '@mui/material'
import { DataGrid, GridCellParams, GridColDef, MuiEvent } from '@mui/x-data-grid'
import MyModal from '@/app/parts/modal'

type LinkType = {
  name: string
  localpath: string
  uri: string
}
type Employee = {
  id: BigInteger
  firstName: string
  lastName: string
  role: string
  name: string
  link: string
}
const employeeColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
  { field: 'firstName', headerName: 'First name', flex: 3, editable: true },
  { field: 'lastName', headerName: 'Last name', flex: 3, editable: true },
  { field: 'role', headerName: 'role', flex: 3, editable: true },
  { field: 'name', headerName: 'name', description: 'test', sortable: false, flex: 3 },
  { field: 'link', headerName: 'link', flex: 3, editable: true },
]

type Order = {
  id: BigInteger
  description: string
  status: string
  link: string
}
const orderColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', flex: 1 },
  { field: 'description', headerName: 'description', flex: 5, editable: true },
  { field: 'status', headerName: 'status', flex: 5, editable: true },
  { field: 'link', headerName: 'link', flex: 5, editable: true },
]

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
  const [business, setBusiness] = useState<string>('')
  const [employeeRows, setEmployeeRows] = useState<Employee[]>()
  const [orderRows, setOrderRows] = useState<Order[]>()
  const [open, setOpen] = useState<string>('')
  const [detailData, setDetailData] = useState<string>('')

  const handleClickOpen = (uri: string) => {
    fetchDetail({ name: '', localpath: '', uri: uri })
    setOpen(uri)
  }

  const handleClose = () => {
    setOpen('')
  }

  const fetchList = async (linkType: LinkType) => {
    fetch(linkType.uri, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)

        let ld: any[] = []
        let list = null
        if (linkType.name === 'Employees') list = json._embedded.employeeList
        else if (linkType.name === 'Orders') list = json._embedded.orderList

        for (let key1 in list) {
          if (linkType.name === 'Employees') {
            list = json._embedded.employeeList
            let ar: Employee = {
              id: list[key1].id,
              firstName: list[key1].firstName,
              lastName: list[key1].lastName,
              role: list[key1].role,
              name: list[key1].name,
              link: list[key1]._links.self.href,
            }
            ld.push(ar)
          } else if (linkType.name === 'Orders') {
            list = json._embedded.orderList
            let ar: Order = {
              id: list[key1].id,
              description: list[key1].description,
              status: list[key1].description,
              link: list[key1]._links.self.href,
            }
            ld.push(ar)
          }
        }
        if (linkType.name === 'Employees') setEmployeeRows(ld)
        else if (linkType.name === 'Orders') setOrderRows(ld)
      })
      .catch((error) => {
        alert(linkType.uri + ' エラー')
        console.error('エラーです:', error)
      })
  }
  const fetchDetail = async (linkType: LinkType) => {
    fetch(linkType.uri, { method: 'GET' })
      .then((res) => res.json())
      .then((json) => {
        debugger
        setDetailData(JSON.stringify(json))
      })
      .catch((error) => {
        alert(linkType.uri + ' エラー')
        console.error('エラーです:', error)
      })
  }

  const handleStatus = (type: LinkType) => {
    setIsMenu(false)
    setBusiness(type.name)
    fetchList(type)
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
        </ButtonGroup>
      </CardActions>
      {!isMenu ? (
        <DataGrid
          rows={business === 'Employees' ? employeeRows : business === 'Orders' ? orderRows : []}
          columns={
            business === 'Employees' ? employeeColumns : business === 'Orders' ? orderColumns : []
          }
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[100]}
          checkboxSelection
          disableRowSelectionOnClick
          onCellClick={(params: GridCellParams) => {
            handleClickOpen(params.value as string)
          }}
        />
      ) : (
        ' '
      )}
      <MyModal open={open != ''} onClose={handleClose} detailData={detailData} />
    </>
  )
}
