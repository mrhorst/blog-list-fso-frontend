import React from 'react'
import Button from './Button'

const User = ({ user, onClick }) => {
  return (
    <div>
      <h2>
        Hello, {user.username}! &nbsp;
        <Button color="secondary" onClick={onClick}>
          Log out
        </Button>
      </h2>
    </div>
  )
}

export default User
