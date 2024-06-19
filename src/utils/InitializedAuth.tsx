import { getSession, isValidToken, setSession } from "./auth.utils"
import { AuthUserType } from "../types/types"
import {useEffect } from "react"
import { useDispatch } from "react-redux"
import { setInitialized, setUser } from "../redux/auth/auth.slice"



export default function InitializedAuth() {
    const dispatch = useDispatch()

    useEffect(() => {
        const authUser: AuthUserType | null = getSession()

        if (authUser && authUser.user && authUser.token && isValidToken(authUser.token)) {
            dispatch(setUser(authUser)) // saving the data in Redux
            setSession(authUser)
        }

        dispatch(setInitialized())
    }, [])

    return null
}