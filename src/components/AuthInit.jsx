'use client'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userInfoThunk } from '@/redux/features/authSlice'

const AuthInit = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(userInfoThunk())
    },[dispatch])
  
    return null
}

export default AuthInit
