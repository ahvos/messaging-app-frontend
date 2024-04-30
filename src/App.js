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
import VideoCall from "./videoComponents/VideoCall";



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
        setInCall(true);
        setShowCallWindow(true);
        const newWindow = window.open('', '_blank', 'width=600,height=400');
        newWindow.document.body.style.backgroundColor = '#f0f0f0';
        newWindow.document.body.innerHTML = `<div id="root"></div>`;
        ReactDOM.render(
            <React.StrictMode>
                <VideoCall setInCall={setInCall} />
            </React.StrictMode>,
            newWindow.document.getElementById('root')
        );
    };
           

    return (
        <div className="App">
            { !user ? <Login /> : (
                <div className="app__body">
                    <Sidebar messages={messages}/>
                    <Chat messages={messages}/>
                </div>
            )}

    
            {inCall ? (
                <Button
                    variant="contained"
                    className="customButton"
                    onClick={() => setInCall(false)} // End call on button click
                >
                    End Call
                </Button>
            ) : (
                <Button
                    variant="contained"
                    className="customButton"
                    onClick={handleJoinCall} // Call handleJoinCall on button click
                >
                    Call
                </Button>
            )}
        </div>
    );
}

export default App;
