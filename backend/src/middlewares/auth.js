import { InvalidAccessError, InvalidSessionError } from "../error.js"
import mw from "./mw.js"

const auth = (role) =>
  mw(async (req, res, next) => {
    const { session } = req
    console.log(req.session)
    if (session === null || session === undefined) {
      throw new InvalidSessionError()
    }

    if (!session.valid) {
      throw new InvalidAccessError()
    }

    next()
  })

export default auth
