import { ReactNode } from "react"
import { selectAuth } from "../redux/auth/auth.selector"
import { Navigate } from "react-router-dom"
import { PATHS } from "../router/path"
import { useSelector } from "react-redux"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    debugger
    const { isAuthenticated, isInitialized } = useSelector(selectAuth);
    if (!isInitialized) {
        return <h1>Loading...</h1>
    }
    if (!isAuthenticated) {
        return <Navigate to={"/"+PATHS.login} />
    }
    return <>{children}</>
}