import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const PrivateRouter = () => {
    const {user} =useContext(AuthContext)
  return (
    <div>PrivateRouter</div>
  )
}

export default PrivateRouter