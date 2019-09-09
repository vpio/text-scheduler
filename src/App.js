import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import axios from 'axios'
import './app.css';
import {Card} from 'react-bootstrap'

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
      <Card bg="dark" text="white" style={{ width: '24rem', 'marginTop': '100px' }}>
        <Card.Body>
          <div>
            <Card.Title>
              Enter your Message
            </Card.Title>
              <input
                name='message'
                onChange={(e) => setMessage(e.target.value)} value={message}/>
          </div>
          <div>
            <Card.Title>
              Enter your Phone Number
            </Card.Title>
              <input
                name='phoneNum'
                onChange={(e) => setPhoneNum(e.target.value)} value={phoneNum}/>
          </div>
          <div>
            <Card.Title>
              When do you want to receive your message?
            </Card.Title>
              <DatePicker selected={selectedDate} onChange={handleChange} />
              <div>
                <TimePicker
                  showSecond={false}
                  use12Hours={true}
                  defaultValue={null}
                  onChange={handleTime}
                  value={selectedTime}
                  />
              </div>  
          </div>
          <button onClick={handleSubmit}>Schedule!</button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
