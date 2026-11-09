import express from 'express';

const app = express();

// Permite receber JSON no corpo das requisições (usaremos no próximo encontro)
app.use(express.json());

// Rota de saúde: usada por serviços de nuvem para saber se a API está viva
app.get('/health', (req, res) => {
  res.json({ status: 'ok', horario: new Date().toISOString() });
});

// Rota raiz: apresenta a API
app.get('/', (req, res) => {
  res.json({
    nome: 'API do meu projeto',
    versao: '0.1.0',
    rotas: ['GET /health'],
  });
});

// Dados em memória (no encontro 4 vão para o PostgreSQL)
const chamados = [
  { id: 1, titulo: 'Monitor piscando', descricao: 'O monitor da estação 3 pisca ao ligar.', prioridade: 'media', status: 'aberto', categoria: 'Hardware' },
  { id: 2, titulo: 'Sem internet na doca 3', descricao: 'Nenhum computador da doca acessa a rede.', prioridade: 'alta', status: 'em_andamento', categoria: 'Rede' },
  { id: 3, titulo: 'Senha do ERP bloqueada', descricao: 'Errei a senha três vezes.', prioridade: 'alta', status: 'resolvido', categoria: 'Acesso a sistemas' },
  { id: 4, titulo: 'Impressora atolando', descricao: 'Impressora do 2º andar atola papel.', prioridade: 'baixa', status: 'aberto', categoria: 'Impressora' },
  { id: 5, titulo: 'VPN não conecta', descricao: 'Home office sem acesso à VPN.', prioridade: 'alta', status: 'fechado', categoria: 'Rede' },
];

const clientes = [
  { id: 1, nome: 'Luiz Otávio', idade: '18', genero: 'Masculino'},
];

// Detalhe: :id é um parâmetro, chega em req.params.id (como TEXTO)
app.get('/api/chamados/:id', (req, res) => {
  const id = Number(req.params.id);              // "2" vira 2
  const chamado = chamados.find((c) => c.id === id);
  if (!chamado) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });  // return encerra aqui
  }
  res.json(chamado);
});

app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

// Lista
app.get('/api/chamados', (req, res) => {
  res.json(chamados);
});

export default app;