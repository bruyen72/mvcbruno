/**
 * SERVICE - CursoService
 *
 * Contém as regras de negócio da aplicação
 * Processa dados antes de enviar para o Repository
 * Não deve conter lógica HTTP (isso fica no Controller)
 */

const Curso = require('../domain/Curso');
const CursoRepository = require('../repository/CursoRepository');

class CursoService {
  constructor() {
    this.repository = new CursoRepository();
  }

  /**
   * Cadastra um novo curso no sistema
   * @param {Object} dadosCurso - Dados do curso vindos do formulário
   * @returns {Promise<Object>} Resultado da operação
   */
  async cadastrarCurso(dadosCurso) {
    try {
      // 1. Criar instância do domínio Curso
      const curso = new Curso(dadosCurso);

      // 2. Validar dados do curso
      const erros = curso.validar();
      if (erros.length > 0) {
        return {
          sucesso: false,
          erros: erros,
          mensagem: 'Dados inválidos. Verifique os campos e tente novamente.'
        };
      }

      // 3. Aplicar regras de negócio / sanitização
      curso.nome = this.sanitizarTexto(curso.nome);
      curso.descricao = this.sanitizarTexto(curso.descricao);
      curso.preco = parseFloat(curso.preco).toFixed(2);
      curso.cargaHoraria = parseInt(curso.cargaHoraria);

      // 4. Salvar no banco via Repository
      const cursoSalvo = await this.repository.salvar(curso.toJSON());

      return {
        sucesso: true,
        curso: cursoSalvo,
        mensagem: `Curso "${curso.nome}" cadastrado com sucesso!`
      };

    } catch (erro) {
      console.error('❌ Erro no service ao cadastrar curso:', erro);
      return {
        sucesso: false,
        erros: [],
        mensagem: 'Erro ao cadastrar curso. Tente novamente.'
      };
    }
  }

  /**
   * Lista todos os cursos cadastrados
   * @returns {Promise<Object>} Lista de cursos
   */
  async listarCursos() {
    try {
      const cursos = await this.repository.buscarTodos();

      return {
        sucesso: true,
        cursos: cursos,
        mensagem: `${cursos.length} curso(s) encontrado(s)`
      };

    } catch (erro) {
      console.error('❌ Erro no service ao listar cursos:', erro);
      return {
        sucesso: false,
        cursos: [],
        mensagem: 'Erro ao listar cursos.'
      };
    }
  }

  /**
   * Busca um curso específico por ID
   * @param {number} id - ID do curso
   * @returns {Promise<Object>} Curso encontrado
   */
  async buscarCursoPorId(id) {
    try {
      const curso = await this.repository.buscarPorId(id);

      if (!curso) {
        return {
          sucesso: false,
          mensagem: 'Curso não encontrado'
        };
      }

      return {
        sucesso: true,
        curso: curso
      };

    } catch (erro) {
      console.error('❌ Erro no service ao buscar curso:', erro);
      return {
        sucesso: false,
        mensagem: 'Erro ao buscar curso.'
      };
    }
  }

  /**
   * Atualiza dados de um curso existente
   * @param {number} id - ID do curso
   * @param {Object} dadosCurso - Novos dados
   * @returns {Promise<Object>} Resultado da operação
   */
  async atualizarCurso(id, dadosCurso) {
    try {
      // 1. Validar se o curso existe
      const cursoExistente = await this.repository.buscarPorId(id);
      if (!cursoExistente) {
        return {
          sucesso: false,
          mensagem: 'Curso não encontrado'
        };
      }

      // 2. Criar instância com novos dados
      const curso = new Curso(dadosCurso);

      // 3. Validar dados
      const erros = curso.validar();
      if (erros.length > 0) {
        return {
          sucesso: false,
          erros: erros,
          mensagem: 'Dados inválidos. Verifique os campos e tente novamente.'
        };
      }

      // 4. Aplicar regras de negócio / sanitização
      curso.nome = this.sanitizarTexto(curso.nome);
      curso.descricao = this.sanitizarTexto(curso.descricao);
      curso.preco = parseFloat(curso.preco).toFixed(2);
      curso.cargaHoraria = parseInt(curso.cargaHoraria);

      // 5. Atualizar no banco
      const cursoAtualizado = await this.repository.atualizar(id, curso.toJSON());

      return {
        sucesso: true,
        curso: cursoAtualizado,
        mensagem: 'Curso atualizado com sucesso!'
      };

    } catch (erro) {
      console.error('❌ Erro no service ao atualizar curso:', erro);
      return {
        sucesso: false,
        mensagem: 'Erro ao atualizar curso.'
      };
    }
  }

  /**
   * Desativa um curso (soft delete)
   * @param {number} id - ID do curso
   * @returns {Promise<Object>} Resultado da operação
   */
  async deletarCurso(id) {
    try {
      const resultado = await this.repository.deletar(id);

      return {
        sucesso: resultado,
        mensagem: resultado ? 'Curso desativado com sucesso!' : 'Erro ao desativar curso'
      };

    } catch (erro) {
      console.error('❌ Erro no service ao deletar curso:', erro);
      return {
        sucesso: false,
        mensagem: 'Erro ao desativar curso.'
      };
    }
  }

  /**
   * Sanitiza texto removendo espaços extras e caracteres perigosos
   * @param {string} texto
   * @returns {string} Texto sanitizado
   */
  sanitizarTexto(texto) {
    if (!texto) return '';

    return texto
      .trim() // Remove espaços no início e fim
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um único espaço
      .replace(/[<>]/g, ''); // Remove < e > para prevenir XSS básico
  }

  /**
   * Obtém lista de categorias válidas
   * @returns {Array} Lista de categorias
   */
  obterCategorias() {
    return [
      'Programação',
      'Banco de Dados',
      'Redes',
      'UX/UI',
      'Outros'
    ];
  }
}

module.exports = CursoService;
