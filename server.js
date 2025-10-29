/**
 * SERVER.JS - Arquivo principal do servidor
 *
 * Configuração do Express e rotas da aplicação
 * Padrão MVC (Model-View-Controller)
 */

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const CursoController = require('./controller/CursoController');

// ==========================================
// CONFIGURAÇÃO DO SERVIDOR
// ==========================================

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON e formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para sessões (necessário para mensagens flash)
app.use(session({
  secret: 'sistema-cursos-mvc-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}));

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.resolve(__dirname, 'public')));

// Middleware de logging (para debug)
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ==========================================
// INSTANCIAR CONTROLLER
// ==========================================

const cursoController = new CursoController();

// ==========================================
// ROTAS DA APLICAÇÃO
// ==========================================

// --- ROTA RAIZ ---
app.get('/', (req, res) => {
  res.redirect('/cursos');
});

// --- ROTAS DE VIEWS (HTML) ---

// GET /cursos/novo - Exibe formulário de cadastro
app.get('/cursos/novo', (req, res) => {
  cursoController.exibirFormularioCadastro(req, res);
});

// GET /cursos - Exibe lista de cursos
app.get('/cursos', (req, res) => {
  cursoController.listarCursos(req, res);
});

// --- ROTAS DA API (JSON) ---

// GET /api/categorias - Retorna lista de categorias
app.get('/api/categorias', (req, res) => {
  cursoController.obterCategorias(req, res);
});

// GET /api/cursos - Retorna lista de cursos em JSON
app.get('/api/cursos', (req, res) => {
  cursoController.listarCursosJson(req, res);
});

// GET /api/cursos/:id - Retorna um curso específico
app.get('/api/cursos/:id', (req, res) => {
  cursoController.buscarCursoPorId(req, res);
});

// POST /cursos - Cadastra novo curso
app.post('/cursos', (req, res) => {
  cursoController.cadastrarCurso(req, res);
});

// PUT /api/cursos/:id - Atualiza curso existente
app.put('/api/cursos/:id', (req, res) => {
  cursoController.atualizarCurso(req, res);
});

// DELETE /api/cursos/:id - Desativa curso
app.delete('/api/cursos/:id', (req, res) => {
  cursoController.deletarCurso(req, res);
});

// ==========================================
// TRATAMENTO DE ERROS 404
// ==========================================

app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>404 - Página não encontrada</title>
      <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
      <div style="text-align: center; padding: 50px;">
        <h1 style="font-size: 4rem;">404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você está procurando não existe.</p>
        <a href="/cursos" class="btn btn-primary">← Voltar para Lista de Cursos</a>
      </div>
    </body>
    </html>
  `);
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║  🚀 SISTEMA DE CURSOS - MVC + SQLite      ║');
  console.log('╠════════════════════════════════════════════╣');
  console.log(`║  📡 Servidor rodando na porta ${PORT}        ║`);
  console.log(`║  🌐 Acesse: http://localhost:${PORT}         ║`);
  console.log('║                                            ║');
  console.log('║  📋 Rotas disponíveis:                     ║');
  console.log('║  • GET  /cursos           - Lista cursos   ║');
  console.log('║  • GET  /cursos/novo      - Novo curso     ║');
  console.log('║  • POST /cursos           - Salvar curso   ║');
  console.log('║  • GET  /api/cursos       - API JSON       ║');
  console.log('║  • GET  /api/cursos/:id   - Curso por ID   ║');
  console.log('║  • PUT  /api/cursos/:id   - Atualizar      ║');
  console.log('║  • DELETE /api/cursos/:id - Desativar      ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log('✅ Servidor iniciado com sucesso!');
  console.log('📝 Aguardando requisições...');
  console.log('');
});

// ==========================================
// TRATAMENTO DE ENCERRAMENTO GRACIOSO
// ==========================================

process.on('SIGINT', () => {
  console.log('\n');
  console.log('⚠️  Encerrando servidor...');
  console.log('👋 Até logo!');
  process.exit(0);
});

module.exports = app;
