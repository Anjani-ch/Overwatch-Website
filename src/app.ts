import 'dotenv/config'

import express, { Application, Request, Response } from 'express'
import path from 'path'

import notFoundHandler from './middleware/notFoundHandler'

import heroRoutes from './routes/overwatch/heroRoutes'
import mapRoutes from './routes/overwatch/mapRoutes'
import gameModeRoutes from './routes/overwatch/gameModes'

// Initialize Express App
const app: Application = express()

const PORT: number | string = process.env.PORT || 3000

const staticFolderPath: string = path.resolve(__dirname, '../public')

const overwatch_api_root: string = '/api/overwatch'

// Initialize Body-Parser
app.use(express.urlencoded({ extended: true }))

// Render SPA Index
if(process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static(staticFolderPath))
    
    // Route All GET Request To SPA Index
    app.get(/.*/, (req: Request, res: Response): void => {
        res.sendFile(path.join(staticFolderPath, 'index.html'))
    });
}

// API Routes
app.use(`${overwatch_api_root}/heroes`, heroRoutes)
app.use(`${overwatch_api_root}/maps`, mapRoutes)
app.use(`${overwatch_api_root}/game-modes`, gameModeRoutes)

// Handle Non-Existing Routes
app.use(notFoundHandler)

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`))