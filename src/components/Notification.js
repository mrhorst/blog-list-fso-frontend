import React from 'react'

const Notification = ({ message, type }) => {
  if (type === null) return null

  return type === 'success' ? (
    <div className={`alert alert-${type}`}>{message}</div>
  ) : type === 'danger' ? (
    <div className={`alert alert-${type}`}>{message}</div>
  ) : (
    <div className="update">{message}</div>
  )
}

export default Notification
