import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Header from './components/header'
import NewForm from './components/NewForm'
import Habbit from './components/Habbit'
import Footer from './components/footer'
import Quote from './components/Quote'

function App() {

  const toggleform = useCallback(() => {
    const form = document.getElementById("form")
    form.style.display = form.style.display === "block" ? "none" : "block" 
  }, [])

  const [habbits, setHabbits] = useState(JSON.parse(localStorage.getItem("habbits")) || [])
  const [ci, setCI] = useState(JSON.parse(localStorage.getItem("colorid")) || 0)
  const [isEmpty, setIsEmpty] = useState(habbits.length === 0)
  
  const addHabbit = habbit => {
    setHabbits(prevArr => [...prevArr, habbit])
    setCI(prevCI => (prevCI + 1) % 6)
    localStorage.setItem("colorid", ci + 1)
  }
  const delHabbit = habbit => setHabbits(prevArr => prevArr.filter(h => h.name !== habbit.name)) 
  
  const setHabbit = useCallback(habbit => {
    setHabbits(prevArr => prevArr.map(h => h.name === habbit.name ? { 
      ...h, 
      count: habbit.count, 
      peak: habbit.peak,
      prevPeak: habbit.prevPeak,
      days: habbit.days,
    } : h))
  }, [])

  useEffect(() => {
    setIsEmpty(habbits.length === 0)
    if (habbits.length === 0) setCI(0)
    localStorage.setItem("habbits", JSON.stringify(habbits))
  },[habbits])

  return (
    <div className="App">
      <Header add={toggleform}/>
      <Quote/>
      <div id="form"><NewForm index={ci} add={addHabbit} toggleform={toggleform}/></div>
      {habbits.map((habbit, index) => <Habbit habbit={habbit} del={delHabbit} set={setHabbit} key={index}/>).reverse()}
      <Footer isEmpty={isEmpty}/>
    </div>
  );
}

export default App;



