import { Router } from 'express';
import { publishArticle, getAllArticlesTitle, getSingleArticle } from '../controllers/articlesControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
import isAdminMiddleware from '../middlewares/roleBasedAccess.js';

const router = Router();

router.post('/publish-article', tokenValidateHandler, isAdminMiddleware, publishArticle);
router.get('/get-titles', getAllArticlesTitle);
router.get('/fetch-article', getSingleArticle);

export default router;