import { InvalidAccessError, InvalidSessionError } from "../error.js"
import mw from "./mw.js"

const auth = (role) =>
  mw(async (req, res, next) => {
    const {
      session: { user: sessionUser },
    } = req

    if (sessionUser === null || sessionUser === undefined) {
      throw new InvalidSessionError()
    }

    if (sessionUser.role !== role && !role.includes(sessionUser.role)) {
      throw new InvalidAccessError()
    }

    next()
  })

export default auth
