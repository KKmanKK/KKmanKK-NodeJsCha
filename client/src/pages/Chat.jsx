import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react';
export const Chat = () => {
  const [chat, setChat ]= useState([]);

  const fethData= async()=>{
    const {data} = await axios.get("http://127.0.0.1:5000/api/chat");
    console.log(data);
    setChat(data);
  }

  useEffect(()=>{
   fethData()
    
  })

  return (
    <div>{chat.map(c=><div>{c.chatName}</div>)}</div>
  )
}
