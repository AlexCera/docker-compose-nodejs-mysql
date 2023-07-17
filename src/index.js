import express from 'express'
import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

const app = express()

const pool = createPool({
    host: process.env.DB_MYSQL_HOST,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    port: process.env.DB_MYSQL_DOCKER_PORT
})

app.listen(process.env.NODE_DOCKER_PORT)

/* Main route */
app.get("/", (req, res) => {
    res.send("Welcome")
})

/* Route to validate connection with DB */
app.get("/pingdb", async (req, res) => {
    const result = await pool.query("SELECT VERSION() AS version");
    res.json({
        'status': 200,
        'db_version': result[0][0].version
    })
})

console.log(`Server running on port`, process.env.NODE_DOCKER_PORT);