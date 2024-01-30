import React from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import {createGoal , reset } from '../features/goals/goalSlice'


function Goalform() {

  const [ text , SetText] = useState('')

  const dispatch = useDispatch()

  const onSubmit =(e)=>{
    e.preventDefault()
    dispatch(createGoal({text}))
    SetText('')
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text"> Goal :</label>
          <input type="text" name="text" id="text" value={text} onChange={(e) => SetText(e.target.value)} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type='submit'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default Goalform