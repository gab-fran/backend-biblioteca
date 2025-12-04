import type { EmprestimoDTO } from "../interface/EmprestimoDTO.js";
import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

class Emprestimo {
    // Atributos
    private idEmprestimo: number = 0;
    private idAluno: number;
    private idLivro: number;
    private dataEmprestimo: Date;
    private dataDevolucao: Date;
    private statusEmprestimo: string;

    // Construtor
    constructor(
        _idAluno: number,
        _idLivro: number,
        _dataEmprestimo: Date,
        _dataDevolucao: Date,
        _statusEmprestimo: string
    ) {
        this.idAluno = _idAluno;
        this.idLivro = _idLivro;
        this.dataEmprestimo = _dataEmprestimo;
        this.dataDevolucao = _dataDevolucao;
        this.statusEmprestimo = _statusEmprestimo;
    }

    // Getters e Setters

    // ID do Empréstimo
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    // ID do Aluno
    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    // ID do Livro
    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    // Data do Empréstimo
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    // Data de Devolução
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    // Status do Empréstimo
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    static async listarEmprestimos(): Promise<Array<EmprestimoDTO> | null> {
        try {
            let listaEmprestimo: Array<EmprestimoDTO> = [];

            const querySelectEmprestimos = `
      SELECT
        em.id_emprestimo,
        em.id_aluno,
        a.nome AS nome,
        em.id_livro,
        l.titulo AS titulo,
        em.data_emprestimo,
        em.data_devolucao,
        em.status_emprestimo
    FROM emprestimo em
    JOIN aluno a ON em.id_aluno = a.id_aluno
    JOIN livro l ON em.id_livro = l.id_livro;`;

            const respostaBD = await database.query(querySelectEmprestimos);

            respostaBD.rows.forEach((emprestimoBD) => {
                const novoEmprestimo: EmprestimoDTO = {
                    idEmprestimo: emprestimoBD.id_emprestimo,
                    idAluno: emprestimoBD.id_aluno,
                    nomeAluno: emprestimoBD.nome,
                    idLivro: emprestimoBD.id_livro,
                    tituloLivro: emprestimoBD.titulo,
                    dataEmprestimo: emprestimoBD.data_emprestimo,
                    dataDevolucao: emprestimoBD.data_devolucao,
                    statusEmprestimo: emprestimoBD.status_emprestimo
                };

                listaEmprestimo.push(novoEmprestimo);
            });

            return listaEmprestimo;


        } catch (error) {
            console.error(`Erro na consulta com o banco de dados.`, error);

            return null;
        }
}

    static async listarEmprestimoId(idEmprestimo: number): Promise<EmprestimoDTO | null> {
        try {
            let emprestimo: EmprestimoDTO | null = null;

            const querySelectEmprestimo = `
            SELECT
        em.id_emprestimo,
        em.id_aluno,
        a.nome AS nome,
        em.id_livro,
        l.titulo AS titulo,
        em.data_emprestimo,
        em.data_devolucao,
        em.status_emprestimo
    FROM emprestimo em
    JOIN aluno a ON em.id_aluno = a.id_aluno
    JOIN livro l ON em.id_livro = l.id_livro
    WHERE em.id_emprestimo = $1;`;

            const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);

            respostaBD.rows.forEach(emprestimoBD => {
                
                const novoEmprestimo: EmprestimoDTO = {
                    idEmprestimo: emprestimoBD.id_emprestimo,
                    idAluno: emprestimoBD.id_aluno,
                    nomeAluno: emprestimoBD.nome,
                    idLivro: emprestimoBD.id_livro,
                    tituloLivro: emprestimoBD.titulo,
                    dataEmprestimo: emprestimoBD.data_emprestimo,
                    dataDevolucao: emprestimoBD.data_devolucao,
                    statusEmprestimo: emprestimoBD.status_emprestimo
                };

                emprestimo = novoEmprestimo;
            });

                return emprestimo;

        } catch (error) {
             console.error(`Erro na consulta com o banco de dados. ${error}`);

            return null;
        }
    }

    static async cadastrarEmprestimo(
        emprestimo: EmprestimoDTO
    ): Promise<boolean> {
        try {
            const queryInsertEmprestimo = `INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
                            VALUES
                            ($1, $2, $3, $4, $5)
                            RETURNING id_emprestimo;`;

            const respostaBD = await database.query(queryInsertEmprestimo, [
                emprestimo.idAluno,
                emprestimo.idLivro,
                emprestimo.dataEmprestimo,
                emprestimo.dataDevolucao,
                emprestimo.statusEmprestimo,
            ]);

            if (respostaBD.rows.length > 0) {
                console.info(
                    `Emprestimo cadastrado com sucesso. ID: ${respostaBD.rows[0].id_emprestimo}`
                );
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return false;
        }
    }
}

export default Emprestimo;
