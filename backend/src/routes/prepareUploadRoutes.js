import multer from "multer"
import mw from "../middlewares/mw.js"
import auth from "../middlewares/auth.js"
import validate from "../middlewares/validate.js"
import { InvalidCredentialsError } from "../error.js"
import { stringHtmlValidator } from "../validator.js"

const prepareUploadRoutes = ({ app, db }) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "_" + file.originalname)
    },
  })

  const upload = multer({ storage })

  app.post(
    "/upload",
    auth(),
    upload.single("file"),
    validate({
      file: {
        mimetype: stringHtmlValidator.required(),
      },
    }),
    mw(async (req, res) => {
      const file = req.data.file

      if (!file) {
        throw new InvalidCredentialsError()
      }

      res.status(200).json({ message: "File uploaded successfully" })
    })
  )
}

export default prepareUploadRoutes
