import hashPassword from "../db/hashPassword.js"
import UserModel from "../db/models/UserModel.js"
import mw from "../middlewares/mw.js"
import jsonwebtoken from "jsonwebtoken"
import validate from "../middlewares/validate.js"
import config from "../config.js"
import { InvalidCredentialsError } from "../error.js"

import {
  emailValidator,
  passwordValidator,
  stringValidator,
} from "../validator.js"

const prepareUsersRoutes = ({ app, db }) => {
  // register
  app.post(
    "/register",
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required(),
      },
    }),
    mw(async (req, res) => {
      const { email, password } = req.data.body

      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] = hashPassword(password)

      await db("users").insert({
        email,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: "user created" })
    })
  )

  // login
  app.post(
    "/login",
    validate({
      body: {
        email: emailValidator.required(),
        password: stringValidator.required(),
      },
    }),
    mw(async (req, res) => {
      const { email, password } = req.data.body
      const [user] = await db("users")
        .where({ email })
        .select("users.id", "users.passwordSalt", "users.passwordHash")

      if (!user) {
        throw new InvalidCredentialsError()
      }

      const [passwordHash] = hashPassword(password, user.passwordSalt)

      if (user.passwordHash !== passwordHash) {
        throw new InvalidCredentialsError()
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            valid: true,
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      res.send({ result: jwt })
    })
  )
}

export default prepareUsersRoutes
