# Consultools — Front End

Sistema web voltado para consultoria de produtividade, com foco na organização de empresas, funcionários, máquinas, turnos e postos de trabalho. O módulo principal é o **controle de ponto**, onde os próprios colaboradores registram suas atividades para documentar e melhorar a eficiência operacional.

🔗 **[Acesse o projeto em produção](https://consultools-front.vercel.app)**

---

## Sobre o sistema

O Consultools foi desenvolvido para atender às necessidades de empresas que trabalham com consultoria de processos. A plataforma centraliza o gerenciamento de:

- **Empresas** — cadastro e configuração das organizações atendidas
- **Funcionários** — controle de colaboradores por empresa
- **Máquinas** — registro e organização dos equipamentos
- **Turnos** — definição e gerenciamento de escalas de trabalho
- **Postos de trabalho** — mapeamento das estações de cada colaborador
- **Controle de ponto** — registro de atividades criado pelos próprios funcionários para documentar tempo e produtividade

---

## Stack

- **React** + **TypeScript** — base do projeto
- **Vite** — bundler e servidor de desenvolvimento
- **Tailwind CSS** — estilização
- **ESLint** + **Prettier** — padronização de código
- **Vercel** — deploy em produção

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Daniel25778/consultools-front.git

# Entre na pasta
cd consultools-front

# Instale as dependências
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e configure as variáveis:

```bash
cp .env.example .env
```

Preencha as variáveis conforme necessário antes de rodar o projeto.

### Rodando em desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

### Build para produção

```bash
npm run build
```

---

## Arquitetura e boas práticas

- Componentes organizados com foco em reutilização
- Configuração de ESLint customizada em `.eslint-rules/` para manter consistência no código
- Suporte a PWA via `dev-dist/`
- Roteamento configurado no `vercel.json` para SPA

---
