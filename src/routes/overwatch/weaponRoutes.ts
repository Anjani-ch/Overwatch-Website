import { Router } from 'express';

import { getAllWeapons } from '../../controllers/weaponController';

const router: Router = Router();

router.get('/', getAllWeapons);

export default router;