import 'dotenv/config';

import express, { Application, Request, Response } from 'express';
import path from 'path';

import heroRoutes from './routes/overwatch/heroRoutes';
import weaponRoutes from './routes/overwatch/weaponRoutes';
import abilityRoutes from './routes/overwatch/abilityRoutes';
import mapRoutes from './routes/overwatch/mapRoutes';
import gameModeRoutes from './routes/overwatch/gameModes';

// Initialize Express App
const app: Application = express();

const PORT: number | string = process.env.PORT || 3000;

const staticFolderPath: string  = path.resolve(__dirname, '../public');

const overwatch_api_root = '/api/overwatch';

// Initialize Body-Parser
app.use(express.urlencoded({ extended: true }));

// Render SPA Index
if(process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static(staticFolderPath))
    
    // Route All GET Request To SPA Index
    app.get(/.*/, (req: Request, res: Response): void => {
        res.sendFile(path.join(staticFolderPath, 'index.html'));
    });
}

// API Routes
app.use(`${overwatch_api_root}/heroes`, heroRoutes);
app.use(`${overwatch_api_root}/weapons`, weaponRoutes);
app.use(`${overwatch_api_root}/abilities`, abilityRoutes);
app.use(`${overwatch_api_root}/maps`, mapRoutes);
app.use(`${overwatch_api_root}/game-modes`, gameModeRoutes);

// Handle Non-Existing Routes
app.use((req: Request, res: Response): void => {
    const status: number = 404;

    res.status(status).json({
        msg: 'Route Not Found',
        status
    });
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));