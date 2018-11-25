import { startCase } from 'lodash'
import {
  map,
  prop,
  sortBy,
  values
} from 'ramda'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'

const PendingOrders = ({ loading, error, pendingOrders }) => {
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`
  if (!pendingOrders) return 'no results'

  const data = pendingOrders.reduce((accum, order) => {
    accum['total'] = (accum['total'] || 0) + order.total
    accum['totalOrders'] = (accum['totalOrders'] || 0) + 1
    accum['items'] = accum['items'] || {}
    const items = accum.items
    order.items.forEach((item) => {
      const name = `${startCase(item.productName)} - ${startCase(item.variantName)}`
      const data = items[name] = items[name] || { quantity: 0, price: 0, name }
      data.quantity += 1
      data.price += item.price
    })

    accum['fees'] = accum['fees'] || {}
    const fees = accum.fees
    order.fees.forEach((fee) => {
      const name = startCase(fee.type)
      const data = fees[name] = fees[name] || { quantity: 0, amount: 0,  name }
      data.quantity += 1
      data.amount += fee.amount
    })

    return accum
  }, {})
  data.items = values(data.items)
  data.fees = values(data.fees)

  console.log(data)
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            Total Orders
          </TableCell>
          <TableCell numeric>
            { data.totalOrders }
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            Total
          </TableCell>
          <TableCell numeric>
            { data.total }
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}>
            Items:
            <Table>
              <TableHead>
                <TableRow>
                   <TableCell></TableCell>
                   <TableCell>Quantity</TableCell>
                   <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(sortBy(prop('name'), data.items)).map((item) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2}>
            Fees:
            <Table>
              <TableHead>
                <TableRow>
                   <TableCell></TableCell>
                   <TableCell>Quantity</TableCell>
                   <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(sortBy(prop('name'), data.fees)).map((fee) => (
                  <TableRow>
                    <TableCell>{fee.name}</TableCell>
                    <TableCell>{fee.quantity}</TableCell>
                    <TableCell>{fee.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default PendingOrders
