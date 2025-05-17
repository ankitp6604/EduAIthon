import express from 'express';
import LessonController from '../controllers/lessonController.js';
import { auth, adminAuth } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', LessonController.getAllLessons);
router.get('/category/:category', LessonController.getLessonsByCategory);
router.get('/:id', LessonController.getLessonById);

// Protected routes (admin only)
router.post('/', adminAuth, LessonController.createLesson);
router.put('/:id', adminAuth, LessonController.updateLesson);
router.delete('/:id', adminAuth, LessonController.deleteLesson);

export default router; 