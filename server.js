import express from 'express'
const app = express()
import 'dotenv/config.js'
import cors from 'cors'
import ConnectDB from './db/db.js'
import userRouter from './router/UserRouter.js'
import taskRouter from './router/TaskRouter.js'
// Urls and Ports
const port = process.env.PORT || 5000
const dbURL = process.env.DB_URL

// Database Connection
ConnectDB(dbURL)
// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/user', taskRouter)
app.use('/user', userRouter)


app.listen(port, () => console.log(`Task Manager Api listening on port ${port}!`))