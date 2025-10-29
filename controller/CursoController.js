/**
 * CONTROLLER - CursoController
 *
 * Responsável por gerenciar as requisições HTTP relacionadas a cursos
 * Recebe requisições, chama o Service, e retorna respostas apropriadas
 */

const CursoService = require('../service/CursoService');
const path = require('path');

class CursoController {
  constructor() {
    this.service = new CursoService();
  }

  /**
   * GET /cursos/novo
   * Exibe o formulário de cadastro de novo curso
   */
  exibirFormularioCadastro(req, res) {
    try {
      const categorias = this.service.obterCategorias();

      // Envia a view do formulário
      res.sendFile(path.join(__dirname, '..', 'views', 'cadastro-curso.html'));

    } catch (erro) {
      console.error('❌ Erro ao exibir formulário:', erro);
      res.status(500).send('Erro ao carregar formulário');
    }
  }

  /**
   * GET /api/categorias
   * Retorna lista de categorias disponíveis (para o frontend usar)
   */
  obterCategorias(req, res) {
    try {
      const categorias = this.service.obterCategorias();
      res.json({ sucesso: true, categorias });

    } catch (erro) {
      console.error('❌ Erro ao obter categorias:', erro);
      res.status(500).json({ sucesso: false, mensagem: 'Erro ao carregar categorias' });
    }
  }

  /**
   * POST /cursos
   * Processa o cadastro de um novo curso
   */
  async cadastrarCurso(req, res) {
    try {
      console.log('📝 Dados recebidos:', req.body);

      // 1. Extrair dados do formulário
      const dadosCurso = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        cargaHoraria: req.body.cargaHoraria,
        categoria: req.body.categoria,
        ativo: req.body.ativo !== undefined ? req.body.ativo === 'true' || req.body.ativo === true : true
      };

      // 2. Chamar o Service para processar
      const resultado = await this.service.cadastrarCurso(dadosCurso);

      // 3. Retornar JSON sempre (tanto sucesso quanto erro)
      if (resultado.sucesso) {
        // Salvar mensagem na sessão para exibir após redirect
        req.session.mensagem = {
          tipo: 'sucesso',
          texto: resultado.mensagem
        };

        res.status(200).json({
          sucesso: true,
          mensagem: resultado.mensagem,
          curso: resultado.curso
        });
      } else {
        res.status(400).json({
          sucesso: false,
          erros: resultado.erros,
          mensagem: resultado.mensagem
        });
      }

    } catch (erro) {
      console.error('❌ Erro no controller ao cadastrar curso:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro interno ao cadastrar curso'
      });
    }
  }

  /**
   * GET /cursos
   * Lista todos os cursos cadastrados
   */
  async listarCursos(req, res) {
    try {
      // 1. Buscar cursos via Service
      const resultado = await this.service.listarCursos();

      // 2. Verificar se há mensagem de sucesso na sessão (após redirect)
      let mensagem = null;
      if (req.session.mensagem) {
        mensagem = req.session.mensagem;
        req.session.mensagem = null; // Limpar mensagem após uso
      }

      // 3. Enviar página HTML
      // (A página fará uma requisição AJAX para /api/cursos para buscar os dados)
      res.sendFile(path.join(__dirname, '..', 'views', 'lista-cursos.html'));

    } catch (erro) {
      console.error('❌ Erro ao listar cursos:', erro);
      res.status(500).send('Erro ao listar cursos');
    }
  }

  /**
   * GET /api/cursos
   * Retorna lista de cursos em formato JSON (para requisições AJAX)
   */
  async listarCursosJson(req, res) {
    try {
      const resultado = await this.service.listarCursos();

      // Verificar se há mensagem de sessão
      let mensagem = null;
      if (req.session.mensagem) {
        mensagem = req.session.mensagem;
        req.session.mensagem = null;
      }

      res.json({
        sucesso: resultado.sucesso,
        cursos: resultado.cursos,
        mensagem: mensagem
      });

    } catch (erro) {
      console.error('❌ Erro ao listar cursos (JSON):', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao listar cursos'
      });
    }
  }

  /**
   * GET /api/cursos/:id
   * Busca um curso específico por ID
   */
  async buscarCursoPorId(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'ID inválido'
        });
      }

      const resultado = await this.service.buscarCursoPorId(id);

      if (resultado.sucesso) {
        res.json(resultado);
      } else {
        res.status(404).json(resultado);
      }

    } catch (erro) {
      console.error('❌ Erro ao buscar curso por ID:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao buscar curso'
      });
    }
  }

  /**
   * PUT /api/cursos/:id
   * Atualiza um curso existente
   */
  async atualizarCurso(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'ID inválido'
        });
      }

      const dadosCurso = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        cargaHoraria: req.body.cargaHoraria,
        categoria: req.body.categoria,
        ativo: req.body.ativo !== undefined ? req.body.ativo : true
      };

      const resultado = await this.service.atualizarCurso(id, dadosCurso);

      if (resultado.sucesso) {
        res.json(resultado);
      } else {
        res.status(400).json(resultado);
      }

    } catch (erro) {
      console.error('❌ Erro ao atualizar curso:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao atualizar curso'
      });
    }
  }

  /**
   * DELETE /api/cursos/:id
   * Desativa um curso (soft delete)
   */
  async deletarCurso(req, res) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          sucesso: false,
          mensagem: 'ID inválido'
        });
      }

      const resultado = await this.service.deletarCurso(id);

      if (resultado.sucesso) {
        res.json(resultado);
      } else {
        res.status(400).json(resultado);
      }

    } catch (erro) {
      console.error('❌ Erro ao deletar curso:', erro);
      res.status(500).json({
        sucesso: false,
        mensagem: 'Erro ao deletar curso'
      });
    }
  }
}

module.exports = CursoController;
