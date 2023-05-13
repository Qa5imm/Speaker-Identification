import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const username= useSelector((state)=> state.username)
  console.log(username)
  return (
    <div>
      <h1>Below are your credentionals</h1>
      <h2>Username: </h2>{}
      <h2>Password: </h2>{}
    </div>
  )
}

export default Home