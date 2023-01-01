import React from 'react'

function header({add}) {
  return (
    <div className = "header-wrapper">
        <h1>HABIT TRACKER</h1>
        <button className="button" onClick={add}>ADD NEW</button>
    </div>
  )
}

export default header