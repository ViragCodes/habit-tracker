import { useState, useEffect } from 'react'

function Quote() {
  const [qote, setQote] = useState("")
  const getapi = async() => {
    const response = await fetch("https://type.fit/api/quotes")
    var data = await response.json()
    var i = Math.floor(Math.random() * data.length)
    var author = data[i].author == null ? '"' : '"  ~ ' + data[i].author
    setQote('"' + data[i].text + author)
  }
  useEffect(() => { getapi() }, [])
  return (
    <center className='footer'>{qote}</center>
  )
}

export default Quote