import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggle = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const button = props.buttonLabel2 ? props.buttonLabel2 : 'cancel'
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel1}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{button}</button>
      </div>
    </div>
  )

}
)
Toggle.propTypes = {
  buttonLabel1: PropTypes.string.isRequired
}
Toggle.displayName = 'Toggle'

export default Toggle