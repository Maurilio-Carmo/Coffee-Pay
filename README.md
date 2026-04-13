# ☕ Coffee Pay

Página pessoal de apoio ao meu trabalho open source — contribuições via **PIX** com QR Code dinâmico e **GitHub Sponsors**.

**[Visualizar página do Coffee Pay](https://maurilio-carmo.github.io/Coffee-Pay/)**

---

## O que é

Uma página simples e direta para quem quiser apoiar o meu trabalho. O visitante escolhe um valor predefinido ou digita um valor livre, escaneia o QR Code gerado na hora ou copia o código PIX pelo botão "Copia e Cola" — e pronto. Sem cadastro, sem redirecionamentos, sem intermediários.

---

## Como funciona

O payload PIX é gerado inteiramente no front-end seguindo o padrão **EMV/BR Code** do Banco Central, incluindo cálculo de CRC-16 e montagem dos campos obrigatórios. Nenhum dado é enviado a servidores externos — tudo acontece no navegador do visitante.

A arquitetura segue **MVC com ES Modules** nativos, separando claramente modelo de dados, renderização e controle de eventos, sem frameworks ou bundlers.

---

## Tecnologias

* HTML5 · CSS3 · JavaScript ES6+ (ES Modules)
* Geração de payload PIX no padrão EMV/BR Code
* QR Code renderizado via `qrcodejs` (auto-hospedado)
* Hospedado no GitHub Pages

---

## 📄 Licença

Apache License 2.0
