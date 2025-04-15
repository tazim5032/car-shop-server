
import  express  from 'express';
import { AuthController } from './auth.controller';
import { UserController } from '../Users/user.controller';
import ValidateRequest from '../../middlewares/validateRequests';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/refresh-token', ValidateRequest(AuthValidation.refreshTokenValidationSchema), AuthController.refreshTokenGeneration);

router.post('/login', AuthController.userLogin);
router.post('/register', UserController.userCreation);

export const AuthValidationRoute = router;