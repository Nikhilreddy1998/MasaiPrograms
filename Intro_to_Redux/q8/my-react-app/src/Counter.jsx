import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment,incrementBy10 } from './features/counterslice'

const Counter = () => {
    const dispatch=useDispatch()
   const counterState=useSelector(state=>state.counter)
   const {count , countanother}=counterState
  return (
    <>
    <h1>count:{counterState.countanother}</h1>
    <button onClick={()=>dispatch(increment())}>Increment</button>
    <button onClick={()=>dispatch(incrementBy10(10))}>Increment By 10</button>

    </>
  )
}

export default Counter