# ☕ Coffee Pay

Página de apoio open source do Maurílio — contribuições via **PIX** com QR Code dinâmico e **GitHub Sponsors**.

**[https://maurilio-carmo.github.io/Coffee-Pay/](https://maurilio-carmo.github.io/Coffee-Pay/)**

Toda a operação é executada no front-end (client-side). Sem backend, sem dependências externas.

---

## ✔️ Funcionalidades

* QR Code PIX gerado dinamicamente no padrão EMV/BR Code
* Valores predefinidos + campo de valor livre
* Botão "Copiar código PIX" (copia e cola)
* Link direto para GitHub Sponsors
* Skeleton de carregamento e tema escuro premium
* Totalmente configurável via `data/config.json`

---

## 🏗️ Estrutura

```
├── components/          # HTML parciais carregados via fetch
├── css/                 # Estilos modulares (base, skeleton, header, etc.)
├── data/
│   └── config.json      # Chave PIX, valores, textos e links
├── icons/               # Favicon SVG
├── lib/
│   └── qrcode.min.js    # Biblioteca QR Code auto-hospedada
└── src/
    ├── main.js           # Entry point — orquestra MVC
    ├── PixModel.js       # Geração do payload PIX (EMV/BR Code)
    ├── QRService.js      # Renderização do QR Code
    ├── ComponentLoader.js
    └── ViewController.js
```

---

## ⚙️ Configuração

Edite `data/config.json` para personalizar sem mexer no código:

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
    "subtitle": "Subtítulo",
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

## 🚀 Deploy no GitHub Pages

1. Suba o projeto em um repositório público
2. Acesse **Settings → Pages**
3. Em **Source**, selecione `main` e pasta `/ (root)`
4. Salve — disponível em `https://seu-usuario.github.io/nome-do-repo`

> Para testes locais, use a extensão **Live Server** no VS Code — o projeto usa `fetch` para carregar componentes e precisa de um servidor HTTP.

---

## 📄 Licença

MIT
