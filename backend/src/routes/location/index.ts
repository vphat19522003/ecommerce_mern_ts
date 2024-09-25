import { Router } from 'express';

import { getDistrictController, getProvinceController, getWardController } from '@app/controllers/location.controller';
import reqHandler from '@app/utils/reqHandler';

const locationRouter = Router();

locationRouter.get('/get-province', reqHandler(getProvinceController));
locationRouter.get('/get-district', reqHandler(getDistrictController));
locationRouter.get('/get-ward', reqHandler(getWardController));

export default locationRouter;
