import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

// initial state
const initialState ={
    goals :[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}

// createGoal
export const createGoal = createAsyncThunk( 'goals/createGoal' , async (goalData , thunkAPI ) => {
    try {

        const token = thunkAPI.getState().auth.user.token       //getting token
        return await goalService.create(goalData , token)
    } 
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// getAllGoals
export const  getAllGoals = createAsyncThunk ('goal/getAllGoals' , async( _ , thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token       //getting token
        return await goalService.get(token)
    } 
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})

// delete a goal
export const deleteGoal = createAsyncThunk( 'goals/deleteGoal' , async (goalID , thunkAPI ) => {
    try {

        const token = thunkAPI.getState().auth.user.token       //getting token
        return await goalService.Delete(goalID , token)
    } 
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})










// slice
const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder)=>{
        builder
        // create goal
            .addCase(createGoal.pending , (state , action) =>{
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled , (state , action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected , (state , action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //get goals
            .addCase(getAllGoals.pending , (state , action) =>{
                state.isLoading = true
            })
            .addCase(getAllGoals.fulfilled , (state , action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload; 
            })
            .addCase(getAllGoals.rejected , (state , action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //delete goals
            .addCase(deleteGoal.pending , (state , action) =>{
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled , (state , action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.goals =  state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected , (state , action) =>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer