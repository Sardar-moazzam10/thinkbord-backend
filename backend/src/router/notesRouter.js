import express from 'express';
import { addRoutes, deleteRoutes, getRoutes, getSingleRoutes, updatedRoutes } from '../controller/routeController.js';
const router = express.Router();
router.get('/', getRoutes)
router.get('/:id', getSingleRoutes)
router.post('/', addRoutes)
router.put('/:id', updatedRoutes)
router.delete('/:id', deleteRoutes)
export default router;
