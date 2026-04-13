# 💛 donate-page

Página de doação open source do Maurílio — suporte via **PIX** com QR Code dinâmico e **GitHub Sponsors**.

---

## Estrutura do projeto

```
donate-page/
├── components/          # HTML parciais (carregados via fetch)
│   ├── header.html
│   ├── pix-card.html
│   ├── github-card.html
│   └── footer.html
├── data/
│   └── config.json      # Chave PIX, beneficiário, cidade, mensagem e valores
├── css/
│   ├── index.css        # Importa todos os estilos
│   ├── base.css         # Variáveis, reset e animações
│   ├── header.css       # Estilos do cabeçalho
│   ├── components.css   # Cards, botões, QR Code
│   ├── footer.css       # Footer e toast
│   ├── mobile.css       # Responsivo ≤ 480px
│   └── desktop.css      # Responsivo ≥ 481px
├── src/
│   ├── main.js          # Entry point — orquestra MVC
│   ├── PixModel.js      # Geração do payload PIX (EMV/BR Code)
│   ├── QRService.js     # Renderização do QR Code
│   ├── ComponentLoader.js # Carregamento de HTML parciais
│   └── ViewController.js  # Controle de UI e eventos
├── index.html           # Raiz da aplicação
├── .gitignore
└── README.md
```

---

## Padrões utilizados

- **MVC** — Model (`PixModel`), View (`components/`), Controller (`ViewController`)
- **SOLID** — cada classe tem responsabilidade única e depende de abstrações
- **ES Modules** — `import/export` nativo, sem bundler
- Sem frameworks, sem dependências externas além do `qrcodejs` (CDN)

---

## Configuração

Edite `data/config.json` para atualizar os dados sem mexer no código:

```json
{
  "pix": {
    "key": "sua-chave-pix",
    "beneficiary": "Nome Curto (max 25 chars)",
    "beneficiaryDisplay": "Nome completo para exibição",
    "city": "Sua Cidade",
    "message": "Mensagem do PIX"
  },
  "github": {
    "username": "seu-usuario",
    "sponsorsUrl": "https://github.com/sponsors/seu-usuario"
  },
  "page": {
    "initials": "MC",
    "title": "Título da página",
    "subtitle": "Subtítulo da página",
    "footer": "Texto do rodapé"
  },
  "amounts": [
    { "value": 5,  "label": "café" },
    { "value": 15, "label": "almoço" },
    { "value": 30, "label": "apoio" }
  ]
}
```

---

## Deploy no GitHub Pages

1. Suba o projeto em um repositório público no GitHub
2. Acesse **Settings → Pages**
3. Em **Source**, selecione `main` e pasta `/ (root)`
4. Salve — a página estará disponível em `https://seu-usuario.github.io/nome-do-repo`

> **Atenção:** como o projeto usa `fetch` para carregar componentes, ele deve ser servido por um servidor HTTP. O GitHub Pages faz isso automaticamente. Para testes locais, use a extensão **Live Server** no VS Code.

---

## Licença

MIT
