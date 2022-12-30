import {CloseOutlined} from '@ant-design/icons'

const colors = ['#FF6D6A','#ffe27a', '#6bf56b', '#62e0f3', '#fa8f8f', '#cb52ff']
const getColor = index => colors[index]

function NewForm({ index, add, toggleform }) {
  const handleSubmit = event => {
    event.preventDefault()

    var hname = event.target[0].value
    if (hname.length !== 0) {
      hname = hname.split(' ').map(word => word ? word[0].toUpperCase() + word.substring(1) : "")
      var habbit = {
        name : hname.join(' '), 
        date : new Date(), 
        count : 0, 
        color : getColor(index),
        peak : 0,
        prevPeak : 0,
        days : []
      }
      event.target[0].value = ""
      add(habbit)
      toggleform()
    }
  }
  return (
    <div className="form-wrapper" style={{'--scheme' : getColor(index)}}>
        <form onSubmit={handleSubmit}>
            <label>
                Habit Name <span id="delete"><CloseOutlined onClick={toggleform}/></span><br />
                <input autoComplete="off" type="text"/>
            </label>
            <input type="submit" value="ADD" className="button"/>
        </form> 
    </div>
  )
}

export default NewForm