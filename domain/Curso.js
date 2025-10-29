/**
 * DOMAIN - Entidade Curso
 *
 * Representa um curso no sistema
 * Esta classe contém as propriedades e validações básicas
 */

class Curso {
  /**
   * Construtor da entidade Curso
   * @param {Object} data - Dados do curso
   */
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.descricao = data.descricao || '';
    this.preco = data.preco || 0;
    this.cargaHoraria = data.cargaHoraria || 0;
    this.categoria = data.categoria || '';
    this.ativo = data.ativo !== undefined ? data.ativo : true;
    this.criadoEm = data.criadoEm || null;
    this.atualizadoEm = data.atualizadoEm || null;
  }

  /**
   * Valida se os dados do curso estão corretos
   * @returns {Array} Array com erros encontrados (vazio se válido)
   */
  validar() {
    const erros = [];

    // Validação do nome
    if (!this.nome || this.nome.trim().length === 0) {
      erros.push({ campo: 'nome', mensagem: 'Nome é obrigatório' });
    } else if (this.nome.length < 3) {
      erros.push({ campo: 'nome', mensagem: 'Nome deve ter no mínimo 3 caracteres' });
    } else if (this.nome.length > 120) {
      erros.push({ campo: 'nome', mensagem: 'Nome deve ter no máximo 120 caracteres' });
    }

    // Validação do preço
    if (this.preco === null || this.preco === undefined || this.preco === '') {
      erros.push({ campo: 'preco', mensagem: 'Preço é obrigatório' });
    } else if (isNaN(this.preco) || parseFloat(this.preco) < 0) {
      erros.push({ campo: 'preco', mensagem: 'Preço deve ser maior ou igual a 0' });
    }

    // Validação da carga horária
    if (!this.cargaHoraria || this.cargaHoraria === '') {
      erros.push({ campo: 'cargaHoraria', mensagem: 'Carga horária é obrigatória' });
    } else if (isNaN(this.cargaHoraria) || parseInt(this.cargaHoraria) < 1) {
      erros.push({ campo: 'cargaHoraria', mensagem: 'Carga horária deve ser no mínimo 1 hora' });
    }

    // Validação da categoria
    const categoriasValidas = ['Programação', 'Banco de Dados', 'Redes', 'UX/UI', 'Outros'];
    if (!this.categoria || this.categoria.trim().length === 0) {
      erros.push({ campo: 'categoria', mensagem: 'Categoria é obrigatória' });
    } else if (!categoriasValidas.includes(this.categoria)) {
      erros.push({ campo: 'categoria', mensagem: 'Categoria inválida' });
    }

    return erros;
  }

  /**
   * Converte o curso para objeto simples (para salvar no banco)
   * @returns {Object}
   */
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      descricao: this.descricao,
      preco: parseFloat(this.preco),
      cargaHoraria: parseInt(this.cargaHoraria),
      categoria: this.categoria,
      ativo: this.ativo ? 1 : 0
    };
  }
}

module.exports = Curso;
