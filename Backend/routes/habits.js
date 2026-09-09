import {getHabits, createHabit, updateHabit, deleteHabit, archiveHabit, reorderHabits} from '../controllers/habitController.js';
import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.use(protect);

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/reorder', reorderHabits); 
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
router.put('/:id/archive', archiveHabit);

export default router;