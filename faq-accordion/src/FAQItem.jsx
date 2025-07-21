import React, {useState} from 'react'

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='faq-item'>
            <h3 onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer"}}>
                {question}
            </h3>
            {isOpen && <p>{answer}</p>}
        </div>
    )
}

export default FAQItem