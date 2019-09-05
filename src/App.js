import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('')
  const [phoneNum, setPhoneNum] = useState('')

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
      <button>Schedule!</button>
    </div>
  );
}

export default App;
