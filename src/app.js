// app.js: monta a aplicação Express (middlewares e rotas).
import express from 'express';
import chamadosRoutes from './routes/chamadosRoutes.js';

const app = express();

// Permite receber JSON no corpo das requisições (req.body)
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', horario: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    nome: 'API Help Desk TechNova',
    versao: '0.2.0',
    rotas: [
      'GET /api/chamados',
      'GET /api/chamados/:id',
      'POST /api/chamados',
      'PUT /api/chamados/:id',
      'DELETE /api/chamados/:id',
    ],
  });
});

// Todas as rotas de chamados começam com /api/chamados
app.use('/api/chamados', chamadosRoutes);

// Qualquer rota que não existe: 404 em JSON
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.path} não existe` });
});

// Tratamento de erros: JSON mal escrito ou falha inesperada (sempre por último)
app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

export default app;