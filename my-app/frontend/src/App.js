import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [lstMessage, setLstMessage] = useState([]);

  useEffect(() => {
    const timeUpdate = setInterval(() => {
      axios.get('/api/messages')
      .then(function (response) {
        setLstMessage(response.data);
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }, 1000);
    console.log(timeUpdate);
  }, []);

  const actionSendMsg = (event) => {
    event.preventDefault();
    axios.post('/api/messages', {
      name: name,
      content: message
    })
    .then(function (response) {
      setLstMessage([...lstMessage, {
        name, content: message
      }])
      setMessage('')
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="container">
      <div className="container_box">
        <div className="container_box_header">
          Message Application
        </div>
        <div className="container_box_body">
          <ul>
            {lstMessage.map(m => (
              <li key={m.id}><strong>{m.name}: </strong><span>{m.content}</span></li>
            ))}
          </ul>
        </div>
        <form className="container_box_footer" onSubmit={actionSendMsg}>
          <input placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
          <input placeholder="Your message" value={message} onChange={(event) => setMessage(event.target.value)} />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
