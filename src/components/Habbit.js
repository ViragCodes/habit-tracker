import { useState, useEffect, useRef } from 'react'
import { PlusCircleFilled, MinusCircleFilled, FireOutlined, DeleteOutlined} from '@ant-design/icons'
import Calendar from './Calendar'

function Habbit({habbit, del, set}) {
  const date = new Date()
  const [count, setCount] = useState(() => {
    if (habbit.count === 0) return 0
    const last = new Date(habbit.days.slice(-1))
    const next = new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1)
    if (date.toDateString() !== next.toDateString() && date.toDateString() !== last.toDateString()) {
      habbit.prevPeak = habbit.peak
      return 0
    }
    return habbit.count
  }) 
  const [days, setDays] = useState(habbit.days)
  
  const toggle = useRef()
  const show = useRef()
  const toggleDisplay = () => {
    if (toggle.current.style.display === "flex") {
      toggle.current.style.display = "none"
      show.current.innerHTML = "show more"
    } else {
      toggle.current.style.display = "flex"
      show.current.innerHTML = "show less"
    }
  }

  const plus = (event) => {
    event.stopPropagation()
    var last = new Date(habbit.days.slice(-1))
    if (date.toDateString() === last.toDateString()) { return }
    
    setDays(prevDays => {
      const newDays = prevDays
      newDays.push(date)
      return newDays
    })
    setCount(x => x + 1)
  }

  const minus = (event) => {
    event.stopPropagation()
    var last = new Date(days.slice(-1))
    if (date.toDateString() !== last.toDateString()) { 
      return 
    }
    if (count !== 0 && window.confirm("Reduce streak?")) {
      if (habbit.peak === count && habbit.peak > habbit.prevPeak) habbit.peak--
      setDays(prevDays => {
        const newDays = prevDays
        newDays.pop()
        return newDays
      })
      setCount(x => x - 1)
    }
  }

  const deleted = e => {
    e.stopPropagation()
    window.confirm("Stop tracking this habbit?") && del(habbit)
  }

  useEffect(() => {
    let peak = count > habbit.peak ? count : habbit.peak
    let prevPeak = habbit.prevPeak
    set({...habbit, count: count, peak: peak, prevPeak: prevPeak, days: days})
  }, [count, set])
  
  return (
    <div className='form-wrapper' style={{'--scheme' : habbit.color}}>
      {habbit.name}
      <span>
        <PlusCircleFilled onClick={plus} /> &nbsp;&nbsp;
        {count} <FireOutlined /> &nbsp;&nbsp;
        <MinusCircleFilled onClick={minus} />
      </span>
      <div ref={toggle} id='open'>
        <Calendar theme={habbit.color} dates={days} />
        <div id='details'>
          <div className="detail">Created on : {new Date(habbit.date).toDateString()}</div>
          <div className="detail">Longest streak : {habbit.peak} days</div>
        </div>
        <div id='delete' title='Delete' onClick={deleted}>
          <span style={{marginRight:'2px'}}> Remove </span>
          <DeleteOutlined />
        </div>
      </div>
      <div id="show" ref={show} onClick={toggleDisplay}>show more</div>

    </div>
  )
}

export default Habbit