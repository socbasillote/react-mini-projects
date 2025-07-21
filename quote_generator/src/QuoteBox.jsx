import React from 'react'

function QuoteBox({ quote }) {
  return (
    <div>
        <h2>"{quote.quote}"</h2>
        <p>- {quote.author}</p>
    </div>
  )
}

export default QuoteBox