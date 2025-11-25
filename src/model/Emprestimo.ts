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

    static async listarEmprestimos(): Promise<Array<Emprestimo> | null> {
        try {
            let listaDeEmprestimos: Array<Emprestimo> = [];
            const querySelectEmprestimos = "SELECT * FROM Emprestimo;";
            const respostaBD = await database.query(querySelectEmprestimos);

            respostaBD.rows.forEach((EmprestimoBD) => {
                const novoEmprestimo = new Emprestimo(
                    EmprestimoBD.id_aluno,
                    EmprestimoBD.id_livro,
                    EmprestimoBD.data_emprestimo,
                    EmprestimoBD.data_devolucao,
                    EmprestimoBD.status
                );

                novoEmprestimo.setIdEmprestimo(EmprestimoBD.id_emprestimo);

                listaDeEmprestimos.push(novoEmprestimo);
            });

            return listaDeEmprestimos;
        } catch (error) {
            console.error(`Erro na consulta ao banco de dados. ${error}`);
            return null;
        }
    }

    static async listarEmprestimoId(idEmprestimo: number): Promise<Emprestimo | null> {
        try {
            const querySelectEmprestimo = "SELECT * FROM Emprestimo WHERE id_emprestimo = $1;";
            const respostaBD = await database.query(querySelectEmprestimo, [idEmprestimo]);

            if (respostaBD.rowCount != 0) {
                const emprestimo: Emprestimo = new Emprestimo(
                    respostaBD.rows[0].id_aluno,
                    respostaBD.rows[0].id_livro,
                    respostaBD.rows[0].data_emprestimo,
                    respostaBD.rows[0].data_devolucao,
                    respostaBD.rows[0].status
                );

                emprestimo.setIdEmprestimo(respostaBD.rows[0].id_emprestimo);
                return emprestimo;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao buscar emprestimo no banco de dados. ${error}`);
            return null;
        }
    }

    static async cadastrarEmprestimo(emprestimo: EmprestimoDTO): Promise<boolean> {
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
                emprestimo.statusEmprestimo
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