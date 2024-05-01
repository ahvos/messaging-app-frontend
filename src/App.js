import './App.css';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import Pusher from 'pusher-js'
import { Button } from "@material-ui/core";

import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import axios from './components/axios'
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';
import VideoCall from "./components/VideoCall";




function App() {
    const [messages, setMessages] = useState([])
    const [{ user }, dispatch] = useStateValue()
    const [inCall, setInCall] = useState(false);
    const [showCallWindow, setShowCallWindow] = useState(false);
    
     
    useEffect(() => {
        axios.get("/messages/sync").then(res => {
            setMessages(res.data)
        })
    }, [])

    useEffect(() => {
        const pusher = new Pusher('7ef4753b8c612d73d576', {
            cluster: 'us3'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (data) => {
            setMessages([...messages, data])
        });

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [messages])
    console.log(messages)


    const handleJoinCall = () => {
        setInCall(true)
        setShowCallWindow(true);
        const newWindow = window.open('', '_blank', 'width=1000,height=800');
        newWindow.document.body.style.backgroundColor = '##e5d9c7';
        newWindow.document.body.innerHTML = `<div id="root"></div>`;
        
        ReactDOM.render(
            <React.StrictMode>
                    <VideoCall setInCall={setInCall}/>
            </React.StrictMode>,
            newWindow.document.getElementById('root')
        );
    };
           

    return (
        <div className="App">
            { !user ? <Login /> : (
                <div className="app__body">
                    <Sidebar messages={messages}/>
                    <Chat messages={messages} handleJoinCall={handleJoinCall} />
                </div>
            )}
        </div>
    );
}

export default App;
