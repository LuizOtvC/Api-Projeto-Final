import { chamados } from "../data/chamado";

export function listarChamados(req, res){
    res.json(chamados);
}

export function buscarChamadoPorId(req, res){
    const id = Number(req.params.id);              // "2" vira 2
    const chamado = chamados.find((c) => c.id === id);
    if (!chamado) {
      return res.status(404).json({ erro: 'Chamado não encontrado' });  // return encerra aqui
    }
    res.json(chamado);
  };