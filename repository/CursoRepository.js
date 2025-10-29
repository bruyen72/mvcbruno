/**
 * REPOSITORY - CursoRepository
 *
 * Responsável por todas as operações de banco de dados relacionadas a Curso
 * Implementa o padrão Repository para isolar a lógica de persistência
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class CursoRepository {
  constructor() {
    // Caminho do banco de dados SQLite
    const dbPath = path.join(__dirname, '..', 'database', 'cursos.db');
    this.db = new sqlite3.Database(dbPath);

    // Inicializa a tabela se não existir
    this.inicializarTabela();
  }

  /**
   * Cria a tabela curso no banco se ela não existir
   */
  inicializarTabela() {
    const sql = `
      CREATE TABLE IF NOT EXISTS curso (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(120) NOT NULL,
        descricao TEXT,
        preco DECIMAL(10,2) NOT NULL,
        carga_horaria INTEGER NOT NULL,
        categoria VARCHAR(60) NOT NULL,
        ativo BOOLEAN NOT NULL DEFAULT 1,
        criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP NULL
      )
    `;

    this.db.run(sql, (err) => {
      if (err) {
        console.error('❌ Erro ao criar tabela curso:', err.message);
      } else {
        console.log('✅ Tabela curso inicializada com sucesso');
      }
    });
  }

  /**
   * Salva um novo curso no banco de dados
   * @param {Object} curso - Dados do curso
   * @returns {Promise<Object>} Curso salvo com ID
   */
  salvar(curso) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO curso (nome, descricao, preco, carga_horaria, categoria, ativo)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [
        curso.nome,
        curso.descricao || null,
        curso.preco,
        curso.cargaHoraria,
        curso.categoria,
        curso.ativo ? 1 : 0
      ];

      this.db.run(sql, params, function(err) {
        if (err) {
          console.error('❌ Erro ao salvar curso:', err.message);
          reject(err);
        } else {
          console.log('✅ Curso salvo com sucesso - ID:', this.lastID);
          curso.id = this.lastID;
          resolve(curso);
        }
      });
    });
  }

  /**
   * Busca todos os cursos cadastrados
   * @returns {Promise<Array>} Lista de cursos
   */
  buscarTodos() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id,
          nome,
          descricao,
          preco,
          carga_horaria as cargaHoraria,
          categoria,
          ativo,
          criado_em as criadoEm,
          atualizado_em as atualizadoEm
        FROM curso
        ORDER BY criado_em DESC
      `;

      this.db.all(sql, [], (err, rows) => {
        if (err) {
          console.error('❌ Erro ao buscar cursos:', err.message);
          reject(err);
        } else {
          console.log(`✅ ${rows.length} curso(s) encontrado(s)`);
          resolve(rows);
        }
      });
    });
  }

  /**
   * Busca um curso por ID
   * @param {number} id - ID do curso
   * @returns {Promise<Object>} Curso encontrado
   */
  buscarPorId(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id,
          nome,
          descricao,
          preco,
          carga_horaria as cargaHoraria,
          categoria,
          ativo,
          criado_em as criadoEm,
          atualizado_em as atualizadoEm
        FROM curso
        WHERE id = ?
      `;

      this.db.get(sql, [id], (err, row) => {
        if (err) {
          console.error('❌ Erro ao buscar curso por ID:', err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  /**
   * Atualiza um curso existente
   * @param {number} id - ID do curso
   * @param {Object} curso - Dados atualizados
   * @returns {Promise<Object>} Curso atualizado
   */
  atualizar(id, curso) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE curso
        SET nome = ?,
            descricao = ?,
            preco = ?,
            carga_horaria = ?,
            categoria = ?,
            ativo = ?,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      const params = [
        curso.nome,
        curso.descricao || null,
        curso.preco,
        curso.cargaHoraria,
        curso.categoria,
        curso.ativo ? 1 : 0,
        id
      ];

      this.db.run(sql, params, function(err) {
        if (err) {
          console.error('❌ Erro ao atualizar curso:', err.message);
          reject(err);
        } else {
          console.log('✅ Curso atualizado com sucesso - ID:', id);
          resolve({ id, ...curso });
        }
      });
    });
  }

  /**
   * Deleta um curso (soft delete - apenas marca como inativo)
   * @param {number} id - ID do curso
   * @returns {Promise<boolean>}
   */
  deletar(id) {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE curso
        SET ativo = 0,
            atualizado_em = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      this.db.run(sql, [id], function(err) {
        if (err) {
          console.error('❌ Erro ao deletar curso:', err.message);
          reject(err);
        } else {
          console.log('✅ Curso desativado com sucesso - ID:', id);
          resolve(true);
        }
      });
    });
  }

  /**
   * Fecha a conexão com o banco de dados
   */
  fechar() {
    this.db.close((err) => {
      if (err) {
        console.error('❌ Erro ao fechar banco de dados:', err.message);
      } else {
        console.log('✅ Conexão com banco de dados fechada');
      }
    });
  }
}

module.exports = CursoRepository;
