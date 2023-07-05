import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"

const mw = (handle) => async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      req.session = null
    } else {
      try {
        const { payload } = jsonwebtoken.verify(
          authorization,
          config.security.jwt.secret
        )
        req.session = payload
      } catch (e) {
        req.session = null
      }
    }

    await handle(req, res, next)
  } catch (err) {
    next(err)
  }
}

export default mw
