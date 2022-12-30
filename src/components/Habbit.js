import { useState, useEffect, useRef } from 'react'
import { PlusCircleFilled, MinusCircleFilled, FireOutlined, DeleteOutlined} from '@ant-design/icons'
import Calendar from './Calendar'

function Habbit({habbit, del, set}) {
  const date = new Date()

  const [count, setCount] = useState(() => {
    if (habbit.count === 0) return 0
    const last = new Date(habbit.days.slice(-1))
    const total = new Date(last.getFullYear(), last.getMonth()+1, 0).getDate()
    const base = last.getDate() + 1 === total ? 32 : total
    if (date.getDate() > (last.getDate() + 1) % base) {
      console.log((last.getDate() + 1))
      habbit.prevPeak = habbit.peak
      return 0
    }
    return habbit.count
  }) 
  const [days, setDays] = useState(habbit.days)
  
  const toggle = useRef()
  const toggleDisplay = () => {
    toggle.current.style.display = toggle.current.style.display === "flex" ? "none" : "flex" 
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
    console.log("clicked")
    var last = new Date(days.slice(-1))
    if (date.toDateString() !== last.toDateString()) { 
      console.log(date.toDateString() + " " + last.toDateString())
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
    event.stopPropagation()
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
    <div className='form-wrapper' onClick={toggleDisplay} style={{'--scheme' : habbit.color}}>
      <u>{habbit.name}</u>
      <span>
        <PlusCircleFilled onClick={plus} /> &nbsp;&nbsp;
        {count} <FireOutlined /> &nbsp;&nbsp;
        <MinusCircleFilled onClick={minus} />
      </span>
      <div ref={toggle} id='open'>
        <Calendar theme={habbit.color} dates={days} />
        <div style={{padding:'0 5%', alignSelf:'center'}}>
          Created on : {new Date(habbit.date).toDateString()} <br /><br />
          Longest streak : {habbit.peak} days
        </div>
        <div id='delete' title='Delete' onClick={deleted}>
          <span style={{marginRight:'2px'}}> Remove </span>
          <DeleteOutlined />
        </div>
      </div>
    </div>
  )
}

export default Habbit