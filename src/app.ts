import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Initialize Express App
const app: Application = express();

const PORT: number | string = process.env.PORT || 3000;

const staticFolderPath: string  = path.resolve(__dirname, '../public');

// Parse Environment Variables
dotenv.config();

// Initialize Body-Parser
app.use(express.urlencoded({ extended: true }));

// Render SPA Index
if(process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static(staticFolderPath))
    
    // Route All GET Request To SPA Index
    app.get(/.*/, (req: Request, res: Response) => {
        res.sendFile(path.join(staticFolderPath, 'index.html'));
    });
}

// API Routes
app.get('/api', async (req: Request, res: Response) => {
    res.send('HEKEKE');
});

// Handle Non-Existing Routes
app.use((req: Request, res: Response) => {
    res.status(404).json({
        msg: 'Route Not Found'
    });
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`));