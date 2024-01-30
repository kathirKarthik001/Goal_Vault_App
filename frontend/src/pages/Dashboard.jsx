import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {getAllGoals , reset } from '../features/goals/goalSlice'

import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'



function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {user} = useSelector((state) => state.auth)

  const {goals , isLoading , isError , isSuccess , message} = useSelector((state) => state.goal)


  useEffect(() => {
    if (!user) {               // Navigating to login page if no user data in the state            
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(()=>{

    if(isError){
      console.log(message)
    }    

    if (user && user.token) {
      dispatch(getAllGoals());
    }
    
    return () => {
      dispatch(reset())      
    }
  } , [ message ,dispatch, isError ,navigate ] )


  if(isLoading){
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <h1>Welcome { user && user.name} ! </h1>
      <p>Goals Dashboard</p>
    </section>
    
    <GoalForm/>

    <section className='content'>
        {
        goals.length > 0 ? 
        ( goals.map((goal) => 
          <GoalItem key={goal._id} goal={goal} />) ) 
        : 
        (<h3>No goals written yet</h3>)

        }
      
    </section>

    </>
  )
}

export default Dashboard