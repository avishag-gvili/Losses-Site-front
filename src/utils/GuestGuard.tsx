import { ReactNode } from "react"
import { selectAuth } from "../redux/auth/auth.selector"
import { Navigate } from "react-router-dom"
import { PATHS } from "../router/path"
import { useAppSelector } from "../redux/Store"

type Props = {
    children: ReactNode
}

export default function GuestGuard({ children }: Props) {
    const { isAuthenticated, isInitialized } = useAppSelector(selectAuth);

    if (isAuthenticated) {
        return <Navigate to={PATHS.home} />
    }

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    return <>{children}</>
}