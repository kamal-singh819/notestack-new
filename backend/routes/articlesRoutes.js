import { Router } from 'express';
import { publishArticle, updateArticle, getAllArticlesTitle, getSingleArticle } from '../controllers/articlesControllers.js';
import tokenValidateHandler from '../middlewares/tokenValidateHandler.js';
import accessMiddleware from '../middlewares/roleBasedAccess.js';

const router = Router();

router.post('/publish-article', tokenValidateHandler, accessMiddleware(["Admin", "Contributer"]), publishArticle);
router.put('/update-article', tokenValidateHandler, accessMiddleware(["Admin", "Contributer"]), updateArticle);
router.get('/get-titles', getAllArticlesTitle);
router.get('/fetch-article', getSingleArticle);

export default router;