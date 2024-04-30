import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import axios from './components/axios'
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';

import React, { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { Button } from "@material-ui/core";
import VideoCall from "./components/VideoCall";



function App() {
    const [messages, setMessages] = useState([])
    //const [user, setUser] = useState(null)
    const [{ user }, dispatch] = useStateValue()
    const [inCall, setInCall] = useState(false);
    
     
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
           

    return (
        <div className="App">
            { !user ? <Login /> : (
                <div className="app__body">
                    <Sidebar messages={messages}/>
                    <Chat messages={messages}/>
                </div>
            )}

            {inCall ? (
                <VideoCall setInCall={setInCall} />
            ) : (
                <Button
                    variant="contained"
                    className="customButton"
                    onClick={() => setInCall(true)}
                >
                Call </Button>
            )}
        </div>
    );
}

export default App;
