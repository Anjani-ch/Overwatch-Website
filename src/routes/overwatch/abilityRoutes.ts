import { Router } from 'express';

const router: Router = Router();

router.get('/', async (req, res) => {
    res.send('ABILITIES');
});

export default router;