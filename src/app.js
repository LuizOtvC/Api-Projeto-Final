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






// Detalhe: :id é um parâmetro, chega em req.params.id (como TEXTO)
app.get('/api/chamados/:id', (req, res) => {
  const id = Number(req.params.id);              // "2" vira 2
  const chamado = chamados.find((c) => c.id === id);
  if (!chamado) {
    return res.status(404).json({ erro: 'Chamado não encontrado' });  // return encerra aqui
  }
  res.json(chamado);
});

app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/api/categorias', (req, res) => {
  res.json(categorias);
});

// Lista
app.get('/api/chamados', (req, res) => {
  res.json(chamados);
});

export default app;