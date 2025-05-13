import { Hono } from 'hono'
// import * as ExcelJs from 'exceljs'

const excel = new Hono()

excel.get('/', (c) => {
  return c.text('Try to testing download excel file on AWS Lambda')
})

// excel.get('/dl', async (c) => {
//   const workbook = new ExcelJs.Workbook();
//   const worksheet = workbook.addWorksheet();

//   worksheet.columns = [
//     { header: 'ID', key: 'id', width: 10 },
//     { header: 'Name', key: 'name', width: 20 },
//   ]

//   worksheet.addRows([
//     { id: 1, name: 'P8 Prawee' },
//     { id: 2, name: 'P9 Wongsa' },
//   ]);

//   const buffer = await workbook.xlsx.writeBuffer();
//   // console.log('Download excel file successfully')

//   // c.status(200)
//   // // c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
//   // c.header('Content-Type', 'application/vnd.ms-excel')
//   // c.header('Content-Disposition', 'attachment; filename="test.xlsx"')
//   // return c.body((buffer as Buffer).toString('base64'))

//   c.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
//   c.header('Content-Disposition', 'attachment; filename="test.xlsx"')
//   return c.body(buffer)
// })

export { excel }