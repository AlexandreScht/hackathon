import * as yup from "yup"
import { InvalidArgumentError } from "../error.js"
import mw from "./mw.js"

const validate = (validators) =>
  mw(async (req, res, next) => {
    const { body, params, query, file } = validators

    try {
      ;["body", "params", "query", "file"].forEach((key) => {
        if (validators[key] && !req[key]) {
          throw new Error(`Missing req.${key}`)
        }
      })

      req.data = await yup
        .object()
        .shape({
          ...(body ? { body: yup.object().shape(body) } : {}),
          ...(query ? { query: yup.object().shape(query) } : {}),
          ...(params ? { params: yup.object().shape(params) } : {}),
          ...(file ? { file: yup.object().shape(file) } : {}),
        })
        .validate(
          {
            params: req.params,
            body: req.body,
            query: req.query,
            file: req.file,
          },
          {
            abortEarly: false,
          }
        )
      next()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        throw new InvalidArgumentError(err.errors)
      }

      throw err
    }
  })

export default validate
