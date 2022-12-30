import React from 'react'

function header({add}) {
  return (
    <div className = "header-wrapper">
        <h1 style={{marginRight:'3px'}}>HABIT TRACKER</h1>
        <button className="button" onClick={add}>ADD NEW</button>
    </div>
  )
}

export default header