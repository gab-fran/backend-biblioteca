-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();

-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

-- ALUNO -- INSIRA 10 ALUNOS 
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES
('Lucas', 'Ferreira', '2005-02-11', 'Rua Silvio Sponchiado, 120', 'lucas.ferreira@gmail.com', '16999146704'),
('Marina', 'Costa', '2004-09-03', 'Rua Terêncio Ricciardi, 89', 'marina.costa@outlook.com', '16993081676'),
('Thiago', 'Oliveira', '2003-06-15', 'Rua José Nicolussi, 45', 'thiago.oliveira@outlook.com', '16986484179'),
('Isabela', 'Santos', '2006-11-27', 'Rua Tácito Mancini, 210', 'isabela.santos@gmail.com', '16987002879'),
('Pedro', 'Martins', '2002-04-19', 'Avenida Fioravante Magro, 77', 'pedro.martins@gmail.com', '16996265859'),
('Lívia', 'Ribeiro', '2005-08-09', 'Rua Fausto Raphael Gaiofatto, 33', 'livia.ribeiro@outlook.com', '16987223194'),
('Caio', 'Almeida', '2003-01-22', 'Rua Dante Zechin, 512', 'caio.almeida@outlook.com', '16981974860'),
('Beatriz', 'Lima', '2004-05-30', 'Rua Antonio Massao Shimura, 1500', 'beatriz.lima@gmail.com', '16986207974'),
('Rafael', 'Gonçalves', '2006-03-08', 'Rua Coronel Francisco Schmidt, 98', 'rafael.goncalves@gmail.com', '16998554551'),
('Ana', 'Carvalho', '2005-07-25', 'Rua Daniel Ribeiro Moraes, 64', 'ana.carvalho@outlook.com', '16986581889');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

-- LIVRO -- INSIRA 10 LIVROS -- DADOS REAIS 
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('A Metamorfose', 'Franz Kafka', 'Companhia das Letras', '1915', '978-8571646858', 6, 6, 40.00, 'Disponível'),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Record', '1967', '978-8501110367', 10, 10, 95.00, 'Disponível'),
('O Nome do Vento', 'Patrick Rothfuss', 'Arqueiro', '2007', '978-8599296493', 8, 8, 65.00, 'Disponível'),
('It: A Coisa', 'Stephen King', 'Suma de Letras', '1986', '978-8560280940', 5, 5, 115.00, 'Disponível'),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Rocco', '1997', '978-8532530783', 12, 12, 35.00, 'Disponível'),
('Percy Jackson e o Ladrão de Raios', 'Rick Riordan', 'Intrínseca', '2005', '978-6555606539', 9, 9, 37.00, 'Disponível'),
('Jogos Vorazes', 'Suzanne Collins', 'Rocco', '2008', '978-6555321449', 7, 7, 110.00, 'Disponível'),
('O Código Da Vinci', 'Dan Brown', 'Arqueiro', '2003', '978-6555658118', 6, 6, 45.00, 'Disponível'),
('A Menina que Roubava Livros', 'Markus Zusak', 'Intrínseca', '2005', '978-8598078175', 8, 8, 55.00, 'Disponível'),
('As Crônicas de Nárnia', 'C.S. Lewis', 'WMF Martins Fontes', '1956', '978-8578270698', 10, 10, 100.00, 'Disponível');

-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

-- Inserindo Emprestimos -- 10 EMPRESTIMOS, não repetir em
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
VALUES
(17, 4, '2025-10-09', '2025-10-24', 'Em andamento'),
(3, 14, '2025-10-10', '2025-10-25', 'Em andamento'),
(10, 7, '2025-10-11', '2025-10-26', 'Em andamento'),
(5, 19, '2025-10-12', '2025-10-27', 'Em andamento'),
(12, 1, '2025-10-13', '2025-10-28', 'Em andamento'),
(8, 16, '2025-10-14', '2025-10-29', 'Em andamento'),
(2, 11, '2025-10-15', '2025-10-30', 'Em andamento'),
(14, 6, '2025-10-16', '2025-10-31', 'Em andamento'),
(19, 9, '2025-10-17', '2025-11-01', 'Em andamento'),
(6, 20, '2025-10-18', '2025-11-02', 'Em andamento');

ALTER TABLE Aluno 
ADD COLUMN situacao BOOLEAN DEFAULT TRUE;

ALTER TABLE Livro
ADD COLUMN situacao BOOLEAN DEFAULT TRUE;

ALTER TABLE emprestimo 
ADD COLUMN situacao BOOLEAN DEFAULT TRUE;

ALTER TABLE emprestimo
DROP COLUMN status_emprestimo;

CREATE OR REPLACE VIEW v_emprestimos_status AS
SELECT
		em.id_emprestimo,
        em.id_aluno,
        a.nome || ' ' || a.sobrenome AS nome,
        em.id_livro,
        l.titulo AS titulo,
        em.data_emprestimo,
        em.data_devolucao,
    CASE
        WHEN CURRENT_DATE > em.data_devolucao THEN 'Em atraso'
        ELSE 'Em andamento'
    END AS status_emprestimo
FROM Emprestimo em
JOIN Aluno a ON a.id_aluno = em.id_aluno
JOIN Livro l ON l.id_livro = em.id_livro
WHERE em.situacao = TRUE
ORDER BY em.id_emprestimo ASC;



SELECT * FROM Aluno;
SELECT * FROM Livro;
SELECT * FROM Emprestimo;
SELECT * FROM v_emprestimos_status;


-- DROP VIEW v_emprestimos_status;
-- DROP SEQUENCE seq_ra;
-- DROP TABLE Aluno CASCADE;
-- DROP TABLE Livro CASCADE;
-- DROP TABLE Emprestimo CASCADE;