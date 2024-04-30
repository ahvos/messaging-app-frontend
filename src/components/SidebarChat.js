import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import './SidebarChat.css'


const SidebarChat = ({ messages }) => {
    const [seed, setSeed] = useState("")

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    return (
    <div className="sidebarChat">
        <Avatar src={`https://hips.hearstapps.com/hmg-prod/images/jennie-jennie-for-calvin-klein-event-photo-credit-joongsan-yang-3-645c18b3e01ea.jpg?crop=1xw:0.4422560783075466xh;center,top`} />
        <div className="sidebarChat__info">
            <h2> Group Chat </h2>
            <p> {messages[messages.length -1]?.message} </p>
            </div>
        </div>
    )
}

export default SidebarChat