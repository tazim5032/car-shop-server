import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import ValidateRequest from '../../middlewares/validateRequests';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:email', UserController.getAnUser);
router.patch('/:userId', Auth('admin'), UserController.BlockUser);
router.post(
    '/change-password',
    Auth('user'),
    ValidateRequest(UserValidation.changePasswordValidationSchema),
    UserController.changeUserPassword,
);
router.get('/', UserController.getUsers);

export const UserRoutes = router;
