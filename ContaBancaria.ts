export default class ContaBancaria {
    private numeroConta: string = "";
    private agencia: string = "";
    private saldo: number = 0;
    private extrato: string[] = [];

    constructor(
        numeroConta: string,
        agencia: string,
        saldo: number,
        extrato: string[],
    ) {
        this.numeroConta = numeroConta;
        this.agencia = agencia;
        this.saldo = saldo;
        this.extrato = extrato;
    }

    public consultarNumeroConta() {
        return this.numeroConta;
    }

    public consultarAgencia() {
        return this.agencia;
    }

    public consultarSaldo() {
        return this.saldo;
    }

    public consultarExtrato() {
        return this.extrato;
    }

    private registrarOperacao(descricao: string) {
        this.extrato.push(descricao);
    }

    public depositar(valor: number): string {
        if (valor <= 0) {
            return `Você não pode depositar um valor menor que 0`;
        }

        this.saldo += valor;

        this.registrarOperacao(`deposito de ${valor} realizado`);

        return `Valor de ${valor} depositado com sucesso, seu saldo atual é ${this.saldo}`;
    }

    public sacar(valor: number): string {
        if (valor > this.saldo) {
            return `Saldo insuficiente!, seu saldo atual é de: ${this.saldo}`;
        }

        this.saldo -= valor;

        this.registrarOperacao(`saque de ${valor} realizado`);

        return `Saque de ${valor} realizado, seu saldo atual é de ${this.saldo}`;
    }

    public transferir(valor: number, contaDestino: string): string {
        if (valor < 0.01) {
            return `Você não pode transferir 0 ou um valor negativo!`;
        }

        if (this.saldo < valor) {
            return `Saldo insuficiente!, seu saldo atual é de: ${this.saldo}`;
        }

        this.saldo -= valor;

        this.registrarOperacao(
            `tranferencia de ${valor} feita para a conta ${contaDestino}`,
        );

        return `Valor de ${valor} depositado na conta ${contaDestino} com sucesso!`;
    }
}
