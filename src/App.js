import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import axios from 'axios'

function formatForCron(date, time) {
  let dateInMonth = date.getDate()
  let month = date.getMonth() + 1
  let dayOfWeek = date.getDay()
  let hour = time.hour()
  let minute = time.minute()

  return `${minute} ${hour} ${dateInMonth} ${month} ${dayOfWeek}`
}

function App() {
  const [message, setMessage] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [selectedDate, setDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)

  const handleSubmit = () => {
    let cronFormatted = formatForCron(selectedDate, selectedTime)

    axios.post('/api/messages', {
      to: '+1' + phoneNum,
      message: message,
      selectedTime: cronFormatted,
    })
  }

  const handleChange = date => {
    setDate(date)
  }

  const handleTime = timeMoment => {
    setSelectedTime(timeMoment)
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
          <DatePicker selected={selectedDate} onChange={handleChange} />
          <TimePicker
            showSecond={false}
            use12Hours={true}
            defaultValue={null}
            onChange={handleTime}
            value={selectedTime}
            />
        </label>
      </div>
      <button onClick={handleSubmit}>Schedule!</button>
    </div>
  );
}

export default App;
