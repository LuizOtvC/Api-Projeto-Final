// Routes: liga cada endereço e método HTTP à função do controller.
import { Router } from 'express';
import { criar, listar, buscarPorId, atualizar, excluir } from '../controllers/chamadosController.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', excluir);

export default router;