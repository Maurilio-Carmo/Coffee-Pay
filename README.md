# ☕ Coffee Pay

Página pessoal de apoio ao meu trabalho open source — contribuições via **PIX** com QR Code dinâmico e **GitHub Sponsors**.

**[maurilio-carmo.github.io/Coffee-Pay](https://maurilio-carmo.github.io/Coffee-Pay/)**

---

## O que é

Uma página simples e direta para quem quiser apoiar o meu trabalho. O visitante escolhe um valor, escaneia o QR Code ou copia o código PIX, e pronto. Sem cadastro, sem redirecionamentos, sem intermediários.

---

## Como funciona

O payload PIX é gerado inteiramente no front-end seguindo o padrão **EMV/BR Code** do Banco Central. Nenhum dado é enviado a servidores externos — tudo acontece no navegador do visitante.

A arquitetura segue **MVC com ES Modules** nativos, sem frameworks ou bundlers.

---

## Tecnologias

* HTML5 · CSS3 · JavaScript ES6+
* QR Code gerado via `qrcodejs` (auto-hospedado)
* Hospedado no GitHub Pages

---

## 📄 Licença

Apache License 2.0
