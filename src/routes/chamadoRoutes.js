import { listarChamados } from "../controllers/chamadoController";
import { buscarChamadoPorId } from "../controllers/chamadoController";

const router = Router();

router.get('Chamados', listarChamados)
router.get('C')