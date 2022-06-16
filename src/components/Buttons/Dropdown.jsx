import React from 'react'

export default function Dropdown(props) {
  return (
    <option value={props.value}>{props.text}</option>
  )
}
