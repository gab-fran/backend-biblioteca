class Aluno {
    // Atributos
    private idAluno: number;
    private ra: string;
    private nome: string;
    private sobrenome: string;
    private dataNascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;

    // Construtor
    constructor(
        _idAluno: number, 
        _ra: string, 
        _nome: string, 
        _sobrenome: string, 
        _dataNascimento: Date, 
        _endereco: string, 
        _email: string, 
        _celular: string
    ) {
        this.idAluno = _idAluno;
        this.ra = _ra;
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.endereco = _endereco;
        this.email = _email;
        this.celular = _celular;
    }
    // Getters e Setters

    // Id do aluno
    public getIdAluno(): number {
        return this.idAluno;
    }

    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    // RA
    public getRa(): string {
        return this.ra;
    }

    public setRa(ra: string): void {
        this.ra = ra;
    }

    // Nome
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    // Sobrenome
    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    // Data de Nascimento
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    // Endereço
    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    // Email
    public getEmail(): string {
        return this.email;
    }  

    public setEmail(email: string): void {
        this.email = email;
    }

    // Celular
    public getCelular(): string {
        return this.celular;
    }
    public setCelular(celular: string): void {
        this.celular = celular;
    }
        }

export default Aluno;