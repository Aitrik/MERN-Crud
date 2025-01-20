"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify";



const axiosInstance=`http://localhost:8000/api`


const initialState = {
  getAllData:[],
  status:"idle",
  getOne:[]
}
export const allData = createAsyncThunk(
    "allData",
    async () => {
        let res = await axios.get(`${axiosInstance}/data`)
        return res.data
    }
)

export const OneData = createAsyncThunk(
    "OneData",
    async (id) => {
        let res = await axios.get(`${axiosInstance}/data/${id}`)
        return res.data
    }
)


export const create = createAsyncThunk(
    "/product/create",


  
    async (formData) => {
        let res = await axios.post(`${axiosInstance}/create`, formData,{
            headers:{
                'Content-Type':'application/json'
            }
        });

        let resData = res?.data;

        return resData;
    }
);

export const update = createAsyncThunk(
    "user/update", 
    async ({ formData, id }) => {
        try {
            const res = await axios.put(`${axiosInstance}/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res.data;
        } catch (err) {
            throw new Error(err.message); 
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser", 
    async ({ id }) => {
        try {
            const res = await axios.delete(`${axiosInstance}/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return res.data;
            
        } catch (err) {
            throw new Error(err.message); 
        }
    }
);





export const Slice = createSlice({
    name: "photos",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(allData.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(allData.fulfilled, (state, { payload }) => {
                state.status = "idle"
                state.getAllData = payload.data
            })
            .addCase(allData.rejected, (state, action) => {
                state.status = "idle"
            })

            .addCase(create.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(create.fulfilled, (state, { payload }) => {
                state.status = "idle"
                toast.success(payload.message)
            })
            .addCase(create.rejected, (state, action) => {
                state.status = "idle"
                toast.error(payload.message)
            })


            .addCase(OneData.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(OneData.fulfilled, (state, { payload }) => {
                state.status = "idle"
                state.getOne=payload.data
                toast.success(payload.message)
            })
            .addCase(OneData.rejected, (state, action) => {
                state.status = "idle"
                toast.error(payload.message)
            })

            .addCase(update.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(update.fulfilled, (state, { payload }) => {
                state.status = "idle"
                toast.success(payload.message)
            })
            .addCase(update.rejected, (state, action) => {
                state.status = "idle"
                toast.error(payload.message)
            }) 

            .addCase(deleteUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(deleteUser.fulfilled, (state, { payload }) => {
                state.status = "idle"
                toast.success(payload.message)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status = "idle"
                toast.error(payload.message)
            }) 


    }
})