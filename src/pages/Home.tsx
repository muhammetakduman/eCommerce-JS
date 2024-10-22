import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userType } from '../types/Types'
import { setCurrentUser } from '../redux/appSlice'

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: userType = JSON.parse(result) as userType;
            dispatch(setCurrentUser(currentUser));
        }
    }, [])

    return (
        <div>
            HomePage
        </div>
    )
}

export default Home