import gql from 'graphql-tag'


export const getMessagesPerDay = gql `
   query getMessagesPerDay {
     messagesPerDay {
       day
       residents
       contacts
       messages
       avgMsgResident
       avgMsgContact
     }
   }
 `


export const getPendingOrders = gql `
  query getPendingOrders {
    pendingOrders {
      id
      total
      items {
        id
        productName
        variantName
        price
      }
      fees {
        type
        amount
      }
    }
  }
`

export const getOrderTotals = gql `
  query getOrderTotals {
    orderTotals {
      totalGross
      totals {
        type
        total
      }
    }
  }
`
