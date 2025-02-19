import React, { useState } from 'react'
import { forwardRef, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'
import Button from './Button'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>Add New Blog</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} color="warning">
          Cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  // buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
