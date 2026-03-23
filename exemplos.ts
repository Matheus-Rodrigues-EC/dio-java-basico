// ==========================================
// EXEMPLOS EM TYPESCRIPT
// ==========================================

// ------------------------------------------
// 1) FUNCIONÁRIO + "BANCO DE DADOS" SIMULADO
// ------------------------------------------

// Como TypeScript puro não acessa banco sozinho,
// Vamos simular um banco em memória usando Map.

class FuncionarioDB {
  matricula: number;
  nome: string;
  endereco: string;
  salario: number;

  // "Banco de dados" em memória
  private static banco: Map<number, FuncionarioDB> = new Map();
  private static databaseAberto = false;

  constructor(
    matricula: number = 0,
    nome: string = "",
    endereco: string = "",
    salario: number = 0
  ) {
    this.matricula = matricula;
    this.nome = nome;
    this.endereco = endereco;
    this.salario = salario;
  }

  static openDatabase(): void {
    if (!this.databaseAberto) {
      this.databaseAberto = true;
      console.log("Banco de dados aberto.");
    } else {
      console.log("Banco já estava aberto.");
    }
  }

  static closeDatabase(): void {
    if (this.databaseAberto) {
      this.databaseAberto = false;
      console.log("Banco de dados fechado.");
    } else {
      console.log("Banco já estava fechado.");
    }
  }

  inserirFuncionario(): void {
    if (!FuncionarioDB.databaseAberto) {
      throw new Error("Banco de dados não está aberto.");
    }

    if (FuncionarioDB.banco.has(this.matricula)) {
      throw new Error(`Já existe funcionário com matrícula ${this.matricula}.`);
    }

    FuncionarioDB.banco.set(this.matricula, new FuncionarioDB(
      this.matricula,
      this.nome,
      this.endereco,
      this.salario
    ));

    console.log(`Funcionário ${this.nome} inserido com sucesso.`);
  }

  consultarFuncionario(matricula: number): boolean {
    if (!FuncionarioDB.databaseAberto) {
      throw new Error("Banco de dados não está aberto.");
    }

    const funcionario = FuncionarioDB.banco.get(matricula);

    if (!funcionario) {
      return false;
    }

    this.matricula = funcionario.matricula;
    this.nome = funcionario.nome;
    this.endereco = funcionario.endereco;
    this.salario = funcionario.salario;

    return true;
  }

  exibirDados(): void {
    console.log(`Matrícula = ${this.matricula}`);
    console.log(`Nome = ${this.nome}`);
    console.log(`Endereço = ${this.endereco}`);
    console.log(`Salário = ${this.salario}`);
  }
}


// ------------------------------------------
// 2) CLASSE SALÁRIOFUNCIONARIO
// ------------------------------------------

class SalarioFuncionario {
  private funcionario: number;
  private salario: number;

  constructor() {
    this.funcionario = 0;
    this.salario = 0;
  }

  alterarSalario(
    pFuncionario: number,
    pSalario: number,
    pCargoResponsavel: string
  ): string {
    if (pCargoResponsavel === "Diretor") {
      if (pSalario === 0) {
        return "Salário inválido";
      } else {
        this.funcionario = pFuncionario;
        this.salario = pSalario;
        return "Salário alterado";
      }
    } else {
      return "Alteração não autorizada";
    }
  }

  consultarSalario(pCargoResponsavel: string): number {
    if (pCargoResponsavel === "Diretor") {
      return this.salario;
    } else {
      return 0;
    }
  }
}


// ------------------------------------------
// 3) CÁLCULO DE ÁREA
// ------------------------------------------

// Em TypeScript dá para fazer a sobrecarga do
// Java usando assinatura e implementação única.

class CalculoArea {
  calculoArea(base: number, altura: number): number;
  calculoArea(altura: number): number;

  calculoArea(valor1: number, valor2?: number): number {
    if (valor2 === undefined) {
      const baseDez = 10;
      return valor1 * baseDez;
    }

    if (valor1 === 0) {
      return this.calculoArea(valor2);
    }

    return valor1 * valor2;
  }
}


// ------------------------------------------
// 4) HERANÇA: FUNCIONARIO, VENDEDOR, DIRETOR
// ------------------------------------------

class Funcionario {
  matricula: number;
  nome: string;
  salario: number;

  constructor(matricula: number, nome: string, salario: number) {
    this.matricula = matricula;
    this.nome = nome;
    this.salario = salario;
  }
}

class Vendedor extends Funcionario {
  comissao: number;

  constructor(
    matricula: number,
    nome: string,
    salario: number,
    comissao: number
  ) {
    super(matricula, nome, salario);
    this.comissao = comissao;
  }
}

class Diretor extends Funcionario {
  bonificacao: number;

  constructor(
    matricula: number,
    nome: string,
    salario: number,
    bonificacao: number
  ) {
    super(matricula, nome, salario);
    this.bonificacao = bonificacao;
  }
}

function exibirDados(pFunc: Funcionario): void {
  console.log(`matricula = ${pFunc.matricula}`);
  console.log(`nome = ${pFunc.nome}`);
  console.log(`salario = ${pFunc.salario}`);
}


// ------------------------------------------
// 5) EXEMPLO COM CONSTRUTOR
// ------------------------------------------

class FuncionarioComConstrutor {
  matricula: number;
  nome: string;
  departamento: string;
  salario: number;

  constructor(
    ultimaMatricula: number,
    departamentoDefault: string,
    salarioMinimo: number
  ) {
    this.matricula = ultimaMatricula + 1;
    this.nome = "";
    this.departamento = departamentoDefault;
    this.salario = salarioMinimo + salarioMinimo * 0.1;
  }

  registrarFuncionario(pNome: string): boolean {
    if (pNome.trim() === "") {
      return false;
    }

    this.nome = pNome;
    return true;
  }

  exibirDados(): void {
    console.log(`Matrícula = ${this.matricula}`);
    console.log(`Nome = ${this.nome}`);
    console.log(`Departamento = ${this.departamento}`);
    console.log(`Salário = ${this.salario}`);
  }
}


// ------------------------------------------
// 6) MAIN - EXECUÇÃO DOS EXEMPLOS
// ------------------------------------------

function main(): void {
  console.log("==================================");
  console.log("1) EXEMPLO COM FUNCIONÁRIO E BANCO");
  console.log("==================================");

  FuncionarioDB.openDatabase();

  const funcDB = new FuncionarioDB(1, "Antonio", "Fortaleza", 1800.0);
  funcDB.inserirFuncionario();

  const consulta = new FuncionarioDB();
  const encontrou = consulta.consultarFuncionario(1);

  if (encontrou) {
    consulta.exibirDados();
  } else {
    console.log("Funcionário não encontrado.");
  }

  FuncionarioDB.closeDatabase();

  console.log("\n==================================");
  console.log("2) EXEMPLO DE ALTERAÇÃO DE SALÁRIO");
  console.log("==================================");

  const salarioFunc = new SalarioFuncionario();

  console.log(salarioFunc.alterarSalario(101, 3500, "Diretor"));
  console.log("Salário consultado:", salarioFunc.consultarSalario("Diretor"));
  console.log(salarioFunc.alterarSalario(101, 4000, "Gerente"));

  console.log("\n==========================");
  console.log("3) EXEMPLO DE CÁLCULO ÁREA");
  console.log("==========================");

  const area = new CalculoArea();

  console.log("Área com base e altura (5, 4):", area.calculoArea(5, 4));
  console.log("Área passando só altura (7):", area.calculoArea(7));
  console.log("Área com base = 0 e altura = 8:", area.calculoArea(0, 8));

  console.log("\n=========================");
  console.log("4) EXEMPLO DE HERANÇA");
  console.log("=========================");

  const func1 = new Funcionario(123, "Antonio", 1800.0);
  exibirDados(func1);

  console.log("---");

  const vend1 = new Vendedor(534, "Pedro", 2400.0, 1200.0);
  exibirDados(vend1);
  console.log(`comissao = ${vend1.comissao}`);

  console.log("---");

  const dir1 = new Diretor(535, "Jose", 3600.0, 1800.0);
  exibirDados(dir1);
  console.log(`bonificacao = ${dir1.bonificacao}`);

  console.log("\n===================================");
  console.log("5) EXEMPLO DE CONSTRUTOR");
  console.log("===================================");

  const funcionarioNovo = new FuncionarioComConstrutor(100, "TI", 1412);
  const registrado = funcionarioNovo.registrarFuncionario("Marina");

  if (registrado) {
    funcionarioNovo.exibirDados();
  } else {
    console.log("Nome inválido. Funcionário não registrado.");
  }
}

main();