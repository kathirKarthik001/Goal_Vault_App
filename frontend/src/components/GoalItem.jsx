import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'

function GoalItem({goal}) {

  const dispatch = useDispatch()

  return (
    <div className="goal">
        {console.log('Deleting goal with ID:', goal._id)}
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h2> {goal.text} </h2>
        <button onClick={()=>{dispatch(deleteGoal(goal._id))}} className='close'> &#10006; </button>
    </div>
  )
}

export default GoalItem