import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setusername } from '../features/username'
import { useSelector } from 'react-redux'


const Login = () => {
  const [username, setUsername]= useState("")
  const [password, setPassword]= useState("")
  const dispatch= useDispatch()
  
  const myuser= useSelector((state)=> state.setusername)
  console.log(myuser)

  return (
    <div style={{"display": "flex", "flexDirection":"column", "rowGap": "6px"}}>
      <h1>this is login page</h1>
      <input type="text" name="username" placeholder='username' onChange={(e)=>setUsername(e.target.value)}  />
      <button style={{"width": '50%', "margin":'auto'}} onClick={()=>dispatch(setusername(username))} >Change username</button>
      <input type="text" name="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}    />
      {/* <button style={{"width": '50%', "margin":'auto'}} onClick={()=>dispatch(setusername(username))} >Change password</button> */}
    </div>
  )
}

export default Login