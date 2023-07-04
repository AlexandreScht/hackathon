import * as yup from "yup"

// users
export const emailValidator = yup.string().email()
export const stringValidator = yup.string()
export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )
  .label("Password")

// collection (pagination, order, etc.)
export const limitValidator = yup.number().integer().min(1).max(100).default(5)
export const pageValidator = yup.number().integer().min(1).default(1)
