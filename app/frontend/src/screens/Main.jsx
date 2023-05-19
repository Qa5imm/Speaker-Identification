import React, { useState } from 'react'
import UsersInfo from '../components/UsersInfo'
import AudioMethod from '../components/AudioMethod'
const Main = () => {
  const [checkSub, setCheckSub] = useState(false)
  return (
    <div>
        {checkSub ? <AudioMethod/> : <UsersInfo setCheckSub={setCheckSub}/>}
     </div>
  )
}

export default Main