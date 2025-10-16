class Livro {
    // Atributos
    private idLivro: number;
    private titulo: string;
    private autor: string;
    private editora: string;
    private anoPublicacao: string;
    private isbn: string;
    private quantTotal: number;
    private quantDisponivel: number;
    private valorAquisicao: number;
    private statusLivroEmprestado: string;

    // Construtor
    constructor(
        _idLivro: number,
        _titulo: string,
        _autor: string,
        _editora: string,
        _anoPublicacao: string,
        _isbn: string,
        _quantTotal: number,
        _quantDisponivel: number,
        _valorAquisicao: number,
        _statusLivroEmprestado: string
    ) {
        this.idLivro = _idLivro;
        this.titulo = _titulo;
        this.autor = _autor;
        this.editora = _editora;
        this.anoPublicacao = _anoPublicacao;
        this.isbn = _isbn;
        this.quantTotal = _quantTotal;
        this.quantDisponivel = _quantDisponivel;
        this.valorAquisicao = _valorAquisicao;
        this.statusLivroEmprestado = _statusLivroEmprestado;
    }

    // Getters e Setters

    // ID do Livro
    public getIdLivro(): number {
        return this.idLivro;
    }

    public setIdLivro(id_livro: number): void {
        this.idLivro = id_livro;
    }

    // Título
    public getTitulo(): string {
        return this.titulo;
    }

    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    // Autor
    public getAutor(): string {
        return this.autor;
    }

    public setAutor(autor: string): void {
        this.autor = autor;
    }

    // Editora
    public getEditora(): string {
        return this.editora;
    }

    public setEditora(editora: string): void {
        this.editora = editora;
    }

    // Ano de Publicação
    public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }   

    public setAnoPublicacao(ano_publicacao: string): void {
        this.anoPublicacao = ano_publicacao;
    }

    // ISBN
    public getIsbn(): string {
        return this.isbn;
    }

    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    // Quantidade Total
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    public setQuantTotal(quant_total: number): void {
        this.quantTotal = quant_total;
    }

    // Quantidade Disponível
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }   

    public setQuantDisponivel(quant_disponivel: number): void {
        this.quantDisponivel = quant_disponivel;
    }

    // Valor de Aquisição
    public getValorAquisicao(): number { 
        return this.valorAquisicao;
    }
    public setValorAquisicao(valor_aquisicao: number): void {
        this.valorAquisicao = valor_aquisicao;
    }

    // Status do Livro Emprestado
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    public setStatusLivroEmprestado(status_livro_emprestado: string): void {
        this.statusLivroEmprestado = status_livro_emprestado;
    }

}

export default Livro;