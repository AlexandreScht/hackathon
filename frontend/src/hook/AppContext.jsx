 import createAPIClient from "@/utils/createAPIClient.js"
import parseSession from "@/utils/parseSession.js"
import registerService from "@/services/register.js"
import loginService from "@/services/login.js"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { parseCookies } from "nookies"

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { isPublicPage, ...otherProps } = props
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })

  const register = registerService({ api })
  const login = loginService({ api, setSession, setJWT })
  const signOut = useCallback(() => {
    document.cookie = "token" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    setSession(false)
  }, [])

  useEffect(() => {
    const { token } = parseCookies()

    if (!token) {
      return
    }

    const session = parseSession(token)

    setSession(session)
    setJWT(token)
  }, [])

  const contextValues = useMemo(() => {
    return {
      actions: {
        signOut,
      },
      services: {
        register,
        login,
      },
      state: {
        session,
      },
    }
  }, [signOut, register, login, session])

  if (!isPublicPage && session === null) {
    return <span>Not connected</span>
  }

  return <AppContext.Provider {...otherProps} value={contextValues} />
}

const useAppContext = () => {
  const { state, actions, services } = useContext(AppContext)

  return { state, actions, services }
}

