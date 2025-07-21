import { useState } from 'react'
import faqData from './data'
import FAQItem from './FAQItem'

import './App.css'

function App() {
 

  return (
    <div className='faq-container'>
      <h1>FAQ</h1>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}

export default App
