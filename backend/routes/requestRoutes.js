import { Router } from 'express';
import { requestToBeContributor, getAllRequests } from '../controllers/requestsControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';

const router = Router();

router.post('/to-be-contributor', tokenValidateHandler, requestToBeContributor);
router.get('/get-all-requests', tokenValidateHandler, getAllRequests);

export default router;