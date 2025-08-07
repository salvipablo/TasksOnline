import { ShowLog } from "../services/generals.service.js"
import { SendTestEmail } from "./emails.controller.js"

const HEAD = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background-color: #fdf0d5;
        color: #003049;
        overflow: hidden;
      }

      .mb-1 { margin-bottom: 1em; }
      .mb-2 { margin-bottom: 2em; }

      table {
        border-collapse: collapse;
        border: 2px solid rgb(140 140 140);
        font-family: sans-serif;
        font-size: 0.8rem;
        letter-spacing: 1px;
        margin: 1em 0;
      }

      th, td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
      }

      .quantityCell {
        text-align: center;
      }
    </style>

    <title>Venta del dia</title>
  </head>
`
const FOOTER = `
  </body>
  </html>
`

export const SendSalesOfTheDay = async (req, res) => {
  try {
    let products = req.body
    let content = ''

    let firstBody = `
      <body>
        <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
    `

    products.forEach(element => {
      content += `
        <tr>
          <td>${element.dateSale}</td>
          <td>${element.nameProduct}</td>
          <td>${element.price}</td>
          <td class="quantityCell">${element.quantity}</td>
        </tr>
      `
    });

    let lastBody = `
        </tbody>
      </table>
    `

    let webPage = HEAD + firstBody + content + lastBody + FOOTER

    await SendTestEmail(webPage)

    ShowLog('Shipping to Luciana of the day sales', 1)

    res.status(200).send({
      message: "I send the sales information of the day"
    })
  } catch (error) {
    ShowLog(error.message, 2)

    res.status(500).send({
      message: "An error occurred while sending today's sales."
    })
  }
}
