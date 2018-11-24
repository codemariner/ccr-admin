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
