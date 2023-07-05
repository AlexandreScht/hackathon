import prepareUsersRoutes from "./routes/prepareUsersRoutes.js"
import prepareUploadRoutes from "./routes/prepareUploadRoutes.js"

const prepareRoutes = (ctx) => {
  prepareUsersRoutes(ctx), prepareUploadRoutes(ctx)
}

export default prepareRoutes
