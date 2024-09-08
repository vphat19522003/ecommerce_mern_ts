import { Router } from 'express';

import { registerController } from '@app/controllers/auth.controller';
import reqHandler from '@app/utils/reqHandler';

const authRouter = Router();

authRouter.get('', (req, res) => {
  res.json('auth api');
});

authRouter.post('/register', reqHandler(registerController));

export default authRouter;
