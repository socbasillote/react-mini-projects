import { useState, useEffect } from 'react'
import QuoteBox from './QuoteBox'

import './App.css'

/* const quotes = [
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" }
] */

function App() {
  const [quote, setQuote] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);

  
  useEffect(() => {
    
    fetch('https://dummyjson.com/quotes')
      .then((res) => res.json())
      .then((data) => {
        setQuote(data.quotes);
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        setCurrentQuote(data.quotes[randomIndex]);
      })
      .catch((err) => {
        console.error("Error fetching quotes:", err);
      })
  }, [])


  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quote.length);
    setCurrentQuote(quote[randomIndex]);
  };

  return (
    <div className='bg'>
      {currentQuote ? (
        <>
          <QuoteBox quote={currentQuote} />
          <button onClick={getNewQuote} className='button'>New Quote</button>
        </>
      ) : (
        <p>Loading quote...</p>
      )}

    </div>
  )
}

export default App
