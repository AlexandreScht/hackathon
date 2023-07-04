import Login from "./login"
import HomePage from "./home"

import useAppContext from "../hook/AppContext"

const Home = () => {
  const {
    state: { session },
  } = useAppContext()

  return session ? <HomePage /> : <Login />
}
Home.isPublic = true
export default Home
