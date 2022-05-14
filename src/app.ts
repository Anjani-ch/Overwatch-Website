import 'dotenv/config'

import express, { Application, Request, Response } from 'express'
import path from 'path'

import connectToDB from './config/db'

import notFoundHandler from './middleware/notFoundHandler'

import heroRoutes from './routes/overwatch/heroRoutes'
import mapRoutes from './routes/overwatch/mapRoutes'
import gameModeRoutes from './routes/overwatch/gameModeRoutes'
import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/auth/tokenRoutes'
import twoFactorRoutes from './routes/auth/twoFactorRoutes'

// Initialize Express App
const app: Application = express()

const PORT: number | string = process.env.PORT || 3000

const staticFolderPath: string = path.resolve(__dirname, '../dist/public')

const overwatchApiRoot: string = '/api/overwatch'

// Initialize Body-Parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// API Routes
app.use(`${overwatchApiRoot}/heroes`, heroRoutes)
app.use(`${overwatchApiRoot}/maps`, mapRoutes)
app.use(`${overwatchApiRoot}/game-modes`, gameModeRoutes)
app.use('/api/users', userRoutes)
app.use('/api/token', tokenRoutes)
app.use('/api/2fa', twoFactorRoutes)

// Render SPA Index In Production
if(process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static(staticFolderPath))
    
    // Route All GET Request To SPA Index
    app.get(/.*/, (req: Request, res: Response): void => {
        res.sendFile(path.join(staticFolderPath, 'index.html'))
    });
}

// Handle Non-Existing Routes
app.use(notFoundHandler)

// Start Server
connectToDB()
    .then(() => {
        app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`))
    })
    .catch((err: any) => {
        console.log(err)
    })