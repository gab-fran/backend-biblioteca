import { Router } from "express"; //Importa o módulo Router do express
import type { Request, Response } from "express"; //Importa os módulos de requisição e resposta
import AlunoController from "./controller/AlunoController.js";
import LivroController from "./controller/LivroController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router = Router(); //Cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({mensagem: "Olá, seja bem-vindo!"})
});

router.get("/api/alunos", AlunoController.listarTodos);
router.get("/api/alunos/:idAluno", AlunoController.listarAluno);
router.post("/api/alunos", AlunoController.novoAluno);

router.get("/api/livros", LivroController.listarTodos);
router.get("/api/livros/:idLivro", LivroController.listarLivro);
router.post("/api/livros", LivroController.novoLivro);

router.get("/api/emprestimos", EmprestimoController.listarTodos);
router.get("/api/emprestimos/:idEmprestimo", EmprestimoController.listarEmprestimo);
router.post("/api/emprestimos", EmprestimoController.novoEmprestimo);

export {router};