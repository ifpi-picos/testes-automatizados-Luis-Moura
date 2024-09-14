import { beforeEach, describe, expect, test } from "bun:test";
import ContaBancaria from "./ContaBancaria.ts";

describe("Testando classe ContaBancaria", () => {
    let conta: ContaBancaria;
    beforeEach(() => {
        conta = new ContaBancaria("1234-1", "1", 500, []);
    });

    test("Testando depositar valor positivo", () => {
        expect(conta.depositar(500)).toBe(
            `Valor de ${500} depositado com sucesso, seu saldo atual é ${1000}`,
        );

        expect(conta.consultarExtrato()[0]).toBe(
            `deposito de ${500} realizado`,
        );
    });

    test("Testando depositar valor negativo", () => {
        expect(conta.depositar(-1)).toBe(
            `Você não pode depositar um valor menor que 0`,
        );

        expect(conta.consultarSaldo()).toBe(500);
    });

    test("Testando saque", () => {
        expect(conta.sacar(400)).toBe(
            `Saque de ${400} realizado, seu saldo atual é de ${100}`,
        );

        expect(conta.consultarExtrato()[0]).toBe(`saque de ${400} realizado`);
    });

    test("Testando saque maior que o saldo", () => {
        expect(conta.sacar(1000)).toBe(
            `Saldo insuficiente!, seu saldo atual é de: ${500}`,
        );
    });

    test("Testando tranferencia", () => {
        expect(conta.transferir(500, "1234-1")).toBe(
            `Valor de ${500} depositado na conta ${"1234-1"} com sucesso!`,
        );

        expect(conta.consultarExtrato()[0]).toBe(
            `tranferencia de ${500} feita para a conta ${"1234-1"}`,
        );
    });

    test("Testando transferencia menor que 0.01", () => {
        expect(conta.transferir(-0.1, "1234-1")).toBe(
            `Você não pode transferir 0 ou um valor negativo!`,
        );
    });

    test("Testando transferencia de valor maior que o saldo", () => {
        expect(conta.transferir(1000, "1234-1")).toBe(
            `Saldo insuficiente!, seu saldo atual é de: ${500}`,
        );
    });

    test("Testando consultar saldo", () => {
        expect(conta.consultarSaldo()).toBe(500);
    });

    test("Testando o extrato adicionando novas ações", () => {
        conta.depositar(500);
        conta.sacar(500);
        conta.transferir(500, "1234-1");

        expect(conta.consultarExtrato()).toEqual([
            `deposito de ${500} realizado`,
            `saque de ${500} realizado`,
            `tranferencia de ${500} feita para a conta ${"1234-1"}`,
        ]);
    });
});
