import { open, Database } from "sqlite"
import { Database as driver } from "sqlite3"
import { addAliasDots as dots } from "./utils"

let instance: Database | null = null

const filename = "./database.sqlite"

export const database = async () => {
  if (instance)
    return instance

  const db =
    await open({ filename, driver })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `)

  const users: any[] = require("../initial-users.json")
  users.forEach(async user => await db.run(`
      INSERT INTO users (name, email, username, password) 
      SELECT :name, :email, :username, :password
      WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = :username)
    `, dots(user)
  ))

  return instance = db
}

database()