import { useEffect, useRef, useState } from 'react';
import "./Calendar.css";

function Calendar({theme, dates}) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    const date = new Date()
    const [m, setM] = useState(date.getMonth())
    const [y, setY] = useState(date.getFullYear())

    const data = useRef({})
    useEffect(() => {
        var obj = {}
        dates.forEach(date => {
            date = new Date(date)
            var key = date.getMonth() + " " + date.getFullYear()
            obj[key] = obj[key] || []
            obj[key].push(date.getDate())
        })
        data.current = obj
    })

    const last = new Date(date.getFullYear(), m + 1, 0)

    const right = (e) => {
        e.stopPropagation()
        m === 11 && setY(prev => prev + 1)
        setM(prev => (prev+1)%12)
    }
    const left = (e) => {
        e.stopPropagation()
        m === 0 && setY(prev => prev - 1)
        setM(prev => (prev+11)%12)
    }

    return (
        <div className="container" style={{color:theme}}>
            <div className="d-month">
                <div className='nav' onClick={left}>{"<"}</div>
                <div>{months[m]}</div>
                <div className='nav' onClick={right}>{">"}</div>
            </div>    
            <div className="d-cal">
                {[0,1,2,3,4].map(c =>
                    <div key={c} className="col">{[1,2,3,4,5,6,7].map(b => {
                        var d = c*7 + b
                        var mY = m + " " + y
                        var dd =  data.current[mY] || []
                        return last.getDate() >= d ? dd.includes(d) ?
                            <div key={d} className='box box-filled' style={{background:theme}}>✔</div> :
                            <div key={d} className='box'>{d}</div> : ""                          
                    })}</div>
                )}
            </div>   
        </div>
    )
}

export default Calendar