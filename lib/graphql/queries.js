import gql from 'graphql-tag'


export const getOrdersPerDay = gql `
   query getOrdersPerDay {
     ordersPerDay {
       day
       status
       count
     }
   }
 `
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

export const getOrders = gql `
  query getOrders {
    orders {
      id
      number
      contactId
      inmateId
      recipientInmateId
      createdAt
      updatedAt
      status
      source
      total
    }
  }
`

export const getSubscriptionsPerDay = gql `
   query getSubscriptionsPerDay {
     subscriptionsPerDay {
       day
       count
     }
   }
 `
