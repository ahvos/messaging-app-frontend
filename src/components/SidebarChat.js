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
        <Avatar src={`https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29sZGVuJTIwcmV0cmlldmVyJTIwcHVwcHl8ZW58MHx8MHx8fDA%3D`} />
        <div className="sidebarChat__info">
            <h2> GROUP CHAT </h2>
            <p> {messages[messages.length -1]?.message} </p>
            </div>
        </div>
    )
}

export default SidebarChat