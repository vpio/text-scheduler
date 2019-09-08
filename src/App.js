import React, { useState } from 'react';
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

  const handleSubmit = () => {
    axios.post('/api/messages', {
      to: '+1' + phoneNum,
      message: message,
    })
  }

  return (
    <div className="App">
      <div>
        <label>
          Enter your Message
          <input
            name='message'
            onChange={(e) => setMessage(e.target.value)} value={message}/>
        </label>
      </div>
      <div>
        <label>
          Enter your Phone Number
          <input
            name='phoneNum'
            onChange={(e) => setPhoneNum(e.target.value)} value={phoneNum}/>
        </label>
      </div>
      <div>
        <label>
          When do you want to receive your message?
          <input
            type='date'
            />
        </label>
      </div>
      <button onClick={handleSubmit}>Schedule!</button>
    </div>
  );
}

export default App;
