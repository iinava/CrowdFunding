import React, { useEffect, useState } from 'react'
import api from '../../lib/api'

export default function Profile() {
  const [user, setuser] = useState({})
  

  useEffect(()=>{
     const response = api.get('/api/user/info/').then((data)=>{
      setuser(data.data)
     }).catch((err)=>{
      // console.log(err)
     })
  },[])
  return (
    <div className='w-full h-screen'><h1 className='text-white'>profile</h1>
    <h1>{user.username}</h1>
    <h1>{user.email}</h1>
    <h1>{user.id}</h1>
    </div>
  )
}
