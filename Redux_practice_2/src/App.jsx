import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from './features/counterSlice'

function App() {
const count=useSelector((state)=>state.counter.value)
const dispatch=useDispatch()
const handleIncrement=()=>{
  dispatch(increment())
}
const handledecrement=()=>{
  dispatch(decrement())
}

  return (
    <>
    <button onClick={handleIncrement}>+</button>
     <p>Count:{count}</p>
     <button onClick={handledecrement}>-</button>
    </>

  )
}

export default App
