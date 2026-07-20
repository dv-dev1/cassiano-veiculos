---
name: novo-projeto
description: >
  Cria uma pasta de projeto nova com `CLAUDE.md` dedicado, depois de uma entrevista curta sobre
  o projeto (cliente, objetivo, entregas previstas). Use quando o usuário disser "novo projeto",
  "novo cliente", "/novo-projeto", "começar projeto pra X" ou pedir pra estruturar um trabalho novo.
---

# /novo-projeto — Pasta de projeto novo com contexto dedicado

Quando o usuário começa um projeto novo (cliente, iniciativa, produto), cria uma pasta com `CLAUDE.md` próprio que herda contexto da raiz e adiciona o que é específico do projeto.

## Workflow

### Passo 1 — Entrevista (4 perguntas)

1. "Qual o nome do projeto ou cliente?"
2. "É um cliente novo, projeto interno ou iniciativa pessoal?"
3. "Qual o objetivo principal? (uma frase)"
4. "Que tipo de entrega vai ter? (ex: ads, site, conteúdo, automação, proposta — pode ser mais de uma)"

### Passo 2 — Decidir local

Baseado na resposta 2:

- **Cliente novo:** criar em `clientes/<Nome>/` (ou na pasta equivalente do perfil — ler `CLAUDE.md` da raiz pra confirmar a convenção)
- **Projeto interno:** criar em `projetos/<nome>/` (criar `projetos/` se não existir)
- **Iniciativa pessoal:** perguntar onde o usuário prefere

### Passo 3 — Estrutura básica

Criar a pasta com:

- `CLAUDE.md` do projeto (instruções herdadas + específicas)
- `briefing.md` (com o que foi coletado na entrevista)
- Subpastas conforme as entregas mencionadas (ex: se mencionou "ads e conteúdo", criar `ads/` e `conteudo/`)

### Passo 4 — Conteúdo do `CLAUDE.md` do projeto

Template:

```markdown
# [Nome do projeto]

> Projeto criado em [data]. Pasta dedicada — instruções aqui sobrescrevem as da raiz quando relevantes.

## Sobre

[Objetivo da resposta 3]

## Tipo

[Cliente novo / Projeto interno / Iniciativa pessoal]

## Entregas previstas

- [entrega 1 da resposta 4]
- [entrega 2 da resposta 4]
- ...

## Onde salvar o que

- Briefings e contexto: nessa pasta na raiz
- Entregas: cada subpasta criada (ads/, conteudo/, site/, etc.)

## Contexto que herda da raiz

Esse projeto herda automaticamente o tom de voz, marca e contexto do negócio definidos em `_memoria/` e `identidade/` da raiz. Não duplicar essas informações aqui.

## Específico desse projeto

[Vazio — preencher com regras que valem só pra esse projeto, conforme for descobrindo]
```

### Passo 4.5 — Se a entrega inclui site, landing page ou interface

Só roda quando a resposta 4 mencionar algo visual (site, landing page,
página de captura, portfólio, app). Se não mencionou, pular direto pro
Passo 5.

A skill `impeccable` (quem constrói interface no MazyOS — ver `CLAUDE.md`
da raiz) lê `PRODUCT.md` e `DESIGN.md` na raiz do projeto. **Se não achar,
ela para e abre a própria entrevista** — perguntando de novo o que acabou
de ser perguntado aqui. Gerar os dois arquivos agora mata esse retrabalho e
faz a skill já começar sabendo a marca.

Escrever direto, sem perguntar mais nada. Todo o material já está em mãos:
`briefing.md` (a entrevista acima), `_memoria/empresa.md`,
`_memoria/preferencias.md` e `identidade/design-guide.md`.

#### `PRODUCT.md` na raiz da pasta do projeto

```markdown
# Product

## Register

brand

## Platform

web

## Users
[Quem é o cliente do cliente. Puxar do perfil de cliente em
`_memoria/empresa.md` e do objetivo (resposta 3). Contexto real e a tarefa
que a pessoa quer resolver, não persona genérica.]

## Product Purpose
[O que o site precisa fazer e como é o sucesso. Derivar da resposta 3.]

## Positioning
[A afirmação estratégica que toda seção reforça. Uma só.]

## Conversion & proof
- CTA primário e secundário: [...]
- A frase que o visitante lembra depois de 10 segundos: [...]
- Belief ladder: [...]
- Prova disponível: [depoimento, case, foto de trabalho — referenciar por caminho]

## Brand Personality
[Voz e tom, vindos de `_memoria/preferencias.md`. Personalidade em 3
palavras.]

## Anti-references
[O que o site NÃO pode parecer. Puxar de "O que NUNCA fazer" do
`identidade/design-guide.md` e do "o que evitar" de
`_memoria/preferencias.md`.]

## Design Principles
[3-5 princípios estratégicos do projeto. "Mostrar o trabalho, não
descrever", "preço na cara". NÃO são regras visuais — cor e fonte moram
no DESIGN.md.]

## Accessibility & Inclusion
[WCAG AA como padrão. Somar necessidade real do público, se houver.]
```

`Register` é `brand` pra site de cliente e landing page — nesses casos o
design É o produto. Só usar `product` se a entrega for painel, dashboard ou
ferramenta interna. O valor vai sozinho na linha, sem comentário do lado.

#### `DESIGN.md` na raiz da pasta do projeto

É a tradução do `identidade/design-guide.md` pro formato que a skill lê.
Levar cores, tipografia, border-radius, botões, sombras e o "O que NUNCA
fazer".

**O `design-guide.md` continua sendo a fonte da verdade.** O `DESIGN.md` é
cópia de trabalho — se a marca mudar, atualiza o design-guide e regenera
esse arquivo, nunca o contrário.

Se o `identidade/design-guide.md` ainda estiver vazio (o `/instalar` deixa
em branco quando o usuário não tinha identidade), **não inventar cor nem
fonte**. Escrever o `PRODUCT.md` normalmente, pular o `DESIGN.md`, e avisar:

> "O `identidade/design-guide.md` tá em branco, então não gerei o
> `DESIGN.md` — preferi não inventar cor e fonte pra tua marca. Quando for
> construir o site, a `impeccable` vai propor uma paleta e aí a gente fixa
> ela no design-guide de uma vez."

### Passo 5 — Resumo

Responder pro usuário:

```
Pasta criada: [caminho]
✓ CLAUDE.md do projeto
✓ briefing.md
✓ Subpastas: [lista]
[✓ PRODUCT.md + DESIGN.md — contexto pronto pra skill de design, só quando a entrega inclui interface]

Quando for trabalhar nesse projeto, abre o terminal já dentro da pasta — assim eu carrego o CLAUDE.md específico junto com o da raiz.
```

## Regras

- Nome de pasta: usar o nome como o usuário falou, sem normalizar agressivamente (manter acentos, espaços viram hífen, mas o nome reconhecível)
- Não criar subpastas que não foram pedidas ("pra organizar melhor"). Só o que foi mencionado nas entregas
- Se o cliente/projeto já existe (pasta com mesmo nome), avisar e perguntar se é pra adicionar dentro ou criar com sufixo
