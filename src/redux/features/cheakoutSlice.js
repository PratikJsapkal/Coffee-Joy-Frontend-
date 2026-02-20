import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import { cheakout ,showCheakout } from "@/api/cheakoutApi";


export const cheakoutThunk = createAsyncThunk(
    "cheakout/gotoCheakout",
    async(cheakoutData , {rejectWithValue})=>{
       try {
        const res = await cheakout(cheakoutData)
        return res 
       } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "something went wrong"
        )
       }
    }
)


export const showCheakoutThunk = createAsyncThunk(
    "cheakout/showCheakout",
    async(session_id,{rejectWithValue})=>{
        try {
            const res = await showCheakout(session_id)
            return res 
        } catch (error) {
             return rejectWithValue(
            error.response?.data?.message || "something went wrong"
        )
        }
    }
)


 const cheakOut = createSlice({
    name:"cheakout",
    initialState:{
        cheakoutProducts :[],
        loading : false ,
        error : null
    },
    reducers : {},
    extraReducers:(builder)=>{
        builder

        .addCase(cheakoutThunk.pending , (state)=>{
            state.loading = true 
            state.error = null
        })

        .addCase(cheakoutThunk.fulfilled , (state ,action)=>{
            state.loading = false 
            state.cheakoutProducts = action.payload
        })

        .addCase(cheakoutThunk.rejected , (state ,action)=>{
            state.loading = false 
            state.error = action.payload
        })

        .addCase(showCheakoutThunk.pending , (state)=>{
            state.loading = true 
            state.error = null
        })

        .addCase(showCheakoutThunk.fulfilled, (state, action) => {
            console.log("FULFILLED PAYLOAD:", action.payload);
            state.loading = false
            state.cheakoutProducts = action.payload

        })

        .addCase(showCheakoutThunk.rejected , (state ,action)=>{
            state.loading = false 
            state.error = action.payload
        })
    }
})

export default cheakOut.reducer