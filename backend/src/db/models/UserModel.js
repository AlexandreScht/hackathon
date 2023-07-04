import BaseModel from "./BaseModel.js"
import hashPassword from "../hashPassword.js"

class UserModel extends BaseModel {
  static tableName = "users"

  static modifiers = {
    paginate: (query, limit, page) =>
      query.limit(limit).offset((page - 1) * limit),
  }

  checkPassword = async (password) => {
    const [passwordHash] = hashPassword(password, this.passwordSalt)

    return passwordHash === this.passwordHash
  }
}

export default UserModel
