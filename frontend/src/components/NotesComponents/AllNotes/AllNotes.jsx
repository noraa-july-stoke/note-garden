import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {thunkLoadNotes} from '../../../store/notes'

const AllNotes = () => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(thunkLoadNotes())
    },[dispatch])

    return null



}

export default AllNotes
