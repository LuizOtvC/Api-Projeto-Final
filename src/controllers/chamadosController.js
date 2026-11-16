// Controller: as regras de cada operação do recurso "chamados".
import { chamados } from '../data/chamados.js';

// GET /api/chamados
export function listar(req, res) {
  res.json(chamados);
}

// GET /api/chamados/:id
export function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const chamado = chamados.find((c) => c.id === id);
  if (!chamado) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  res.json(chamado);
}

export function criar(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { titulo, prioridade, status } = req.body ?? {};
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo titulo é obrigatório' });
  }
  const novoId = chamados.length > 0 ? chamados[chamados.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    titulo,
    prioridade: prioridade ?? 'media',
    status: status ?? 'aberto',
  };
  chamados.push(novo);
  res.status(201).json(novo);
}

export function atualizar(req, res) {
  const id = Number(req.params.id);
  const posicao = chamados.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.titulo === '') {
    return res.status(400).json({ erro: 'O campo titulo não pode ficar vazio' });
  }
  // junta o que já existia com o que chegou; o id nunca muda
  const atualizado = { ...chamados[posicao], ...dados, id };
  chamados[posicao] = atualizado;
  res.json(atualizado);
}
// DELETE /api/chamados/:id
export function excluir(req, res) {
  const id = Number(req.params.id);
  const posicao = chamados.findIndex((c) => c.id === id);
  if (posicao === -1) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });
  }
  chamados.splice(posicao, 1);
  res.status(204).send();
}