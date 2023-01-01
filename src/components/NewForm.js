import {CloseOutlined} from '@ant-design/icons'

const colors = ['#ff6d6a','#ffe27a', '#6bf56b', '#62e0f3', '#fa8f8f', '#cb52ff']

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
        color : colors[index],
        peak : 0,
        prevPeak : 0,
        days : []
      }
      event.target[0].value = ""
      toggleform()
      add(habbit)
    }
  }
  return (
    <div className="form-wrapper" style={{'--scheme': colors[index]}}>
        <form onSubmit={handleSubmit}>
            <label>
                Habit Name <span id="delete"><CloseOutlined onClick={toggleform}/></span><br />
                <input autoComplete="off" type="text"/>
            </label>
            <input type="submit" value="ADD" className="button"/>
            <br />
        </form> 
    </div>
  )
}

export default NewForm