import { graphql } from 'react-apollo'
import { getMessagesPerDay } from '../../lib/graphql/queries'

const MessagesPerDay = ({ loading, error, data }) => {
  if (loading) return 'Loading...'
  if (error) return `Error: ${error.message}`
  if (!data || !data.messagesPerDay) return 'no results'

  return (
    <div>
      {data.messagesPerDay.map((stats) => (
        <pre>{JSON.stringify(stats)}</pre>
      ))}
    </div>
  )
}

export default graphql(getMessagesPerDay)(MessagesPerDay)
