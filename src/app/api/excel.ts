import { Hono } from 'hono'
import * as ExcelJs from 'exceljs'
import * as XLSX from 'xlsx'
import * as fs from 'fs'

const excel = new Hono()

excel.get('/', (c) => {
  return c.text('Try to testing download excel file on AWS Lambda')
})

excel.get('/dl', async (c) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet();

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 20 },
  ]

  worksheet.addRows([
    { id: 1, name: 'P8 Prawee' },
    { id: 2, name: 'P9 Wongsa' },
  ]);

  const buffer = await workbook.xlsx.writeBuffer();
  // console.log('Download excel file successfully')

  // c.status(200)
  // // c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  // c.header('Content-Type', 'application/vnd.ms-excel')
  // c.header('Content-Disposition', 'attachment; filename="test.xlsx"')
  // return c.body((buffer as Buffer).toString('base64'))

  c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  c.header('Content-Disposition', 'attachment; filename="test.xlsx"')
  return c.body(buffer)
})

excel.get('/xlsx', async (c) => {
  const data = [
    { id: 1, name: 'P8', email: 'p8@example.com' },
    { id: 2, name: 'P9', email: 'p9@example.com' },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')

  const buffer = await XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  console.log('buffer ', buffer)

  const fileName = `test-${Date.now()}.xlsx`

  c.status(200)
  c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  c.header('Content-Disposition', `attachment; filename="${fileName}"`)

  return c.body(buffer)
})

excel.get('/csv', async (c) => {
  const data = [
    { id: 1, name: 'P8', email: 'p8@example.com' },
    { id: 2, name: 'P9', email: 'p9@example.com' },
  ];

  const rows = [
  ['ID', 'Name', 'Email'],
    ...data.map(row => [row.id, row.name, row.email]),
  ];

  const csv = rows.map(r => r.join(',')).join('\n');

  c.status(200)
  c.header('Content-Type', 'text/csv')
  c.header('Content-Disposition', 'attachment; filename="test.csv"')
  return c.body(csv)
})

export { excel }