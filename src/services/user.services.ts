import { database  } from "../database"

export const findUserByLoginPassword = async (username: string, password: string) => {
  const db = await database()
  return db.get(`SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1`, [username, password])
}

export const getAllUsers = async () => {
  const db = await database()
  return db.all(`SELECT id, name, email, username FROM users`)
}