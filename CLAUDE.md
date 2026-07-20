# MazyOS — Sistema operacional do negócio

Sua empresa roda em cima desse arquivo. Aqui ficam as regras de operação
do MazyOS — como o Claude lê o contexto, aprende com correções, mantém
tudo atualizado e cria skills novas conforme a operação evolui.

Esse arquivo é editável. Quando o `/instalar` rodar, ele complementa o
final dessa página com as regras específicas do seu negócio.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (quando existirem
e estiverem preenchidos):

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Ao
sugerir prioridades, formatos ou abordagens, considerar o foco atual
descrito em `estrategia.md`.

Pra qualquer tarefa visual (carrossel, post, landing page), consultar
`identidade/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas
usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill. Se
não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o
usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o
padrão de repetição for claro.

---

## Trabalho de frontend — obrigatório

Vale pra **qualquer** interface: site de cliente, landing page, portfólio,
página de captura, componente, app. Sempre que a tarefa produzir HTML/CSS
que alguém vai olhar, os passos abaixo são obrigatórios. Não são opcionais
e não dependem do usuário pedir.

**Uma skill constrói, as outras julgam.** A `impeccable` constrói — só ela.
A `design-taste-frontend` não é invocada junto: a régua dela virou critério
do evaluator, que julga depois. Nunca invocar duas skills pra construir a
mesma peça: duas direções estéticas ao mesmo tempo viram briga de regra no
meio da tarefa, não qualidade.

Do lado de quem julga, dois juízes com escopos que não se sobrepõem: o
`frontend-design-evaluator` olha o **visual** (screenshot, 3 viewports) e a
`review-animations` olha o **motion** (código). O primeiro não consegue ver
easing num print; o segundo não opina sobre cor.

### 1. Carregar o contexto antes de construir

A `impeccable` lê `PRODUCT.md` e `DESIGN.md` da raiz do projeto. Esses dois
arquivos são a ponte entre o MazyOS e a skill. **Sem eles ela para e abre
uma entrevista** que o `/instalar` e o `/novo-projeto` já fizeram — puro
retrabalho, e o motivo de nunca invocar a skill "crua" aqui dentro.

- **Projeto de cliente:** o `/novo-projeto` já gera os dois. Conferir se
  existem antes de começar.
- **Não existem ainda:** gerar a partir de `_memoria/empresa.md`,
  `identidade/design-guide.md` e o briefing do projeto — **antes** de
  invocar a skill. Nunca deixar a skill perguntar o que o MazyOS já sabe.
- `identidade/design-guide.md` **manda.** Quando o design-guide fixa uma
  decisão (cor, fonte, border-radius), ela vence a preferência da skill.
  O `DESIGN.md` é a tradução do design-guide pro formato que a skill lê —
  se os dois divergirem, o design-guide é a fonte da verdade e o `DESIGN.md`
  é que está desatualizado.

Referência que o usuário trouxer (Pinterest, print de site, link) entra no
brief. É o que mais separa o resultado da cara de IA. Se ele não trouxe
nenhuma, **pedir antes de começar**.

### 2. Construir com a skill `impeccable`

Antes de escrever qualquer linha de código de interface, invocar a skill
**`impeccable`** (já vem embutida no repo, em `.claude/skills/impeccable/`).
Ela força direção estética deliberada, tipografia com personalidade e
escolhas assumidas — em vez do padrão genérico que sai por default.

Comandos que mais importam aqui:

| Comando | Quando usar |
|---|---|
| `/impeccable craft` | Página ou seção nova, do zero |
| `/impeccable shape` | Feature nova dentro de algo que já existe |
| `/impeccable polish` | Refino de peça pronta |
| `/impeccable animate` | Motion, micro-interação, scroll reveal |
| `/impeccable audit` | Acessibilidade, contraste, responsivo |

Landing page e site de cliente são **register `brand`** (o design É o
produto), não `product`. O `PRODUCT.md` gerado pelo `/novo-projeto` já
marca isso — conferir se estiver escrevendo o arquivo na mão.

**Animação do site é aqui.** A `impeccable` cobre motion em `animate.md`,
`interaction-design.md` e `overdrive.md`. Vale a regra dela — uma animação
de assinatura bem feita vale mais que micro-interação espalhada, e
`prefers-reduced-motion` não é opcional. Quem julga o resultado é a
`review-animations` (passo 4).

Não instalar skill de GSAP por fora. O que falta nunca é a API da
biblioteca. E cuidado com as que vivem dentro de repo de vídeo (o
`heygen-com/hyperframes` e afins): elas ensinam timeline **pausada**, feita
pra um renderizador pular frame a frame. Site precisa do contrário —
animação que toca no scroll, no hover, no load.

**Se o usuário descrever um efeito de forma vaga** ("aquele negócio que
quica quando abre", "tipo o scroll do iPhone"), invocar a skill
`animation-vocabulary` pra achar o termo exato antes de construir. Ela só
nomeia, não desenha. Brief preciso é o que separa o resultado do genérico —
"Pop in com origem no gatilho" leva a impeccable a um lugar melhor que
"deixa mais interativo".

### 3. Avaliar com o agent `frontend-design-evaluator`

Terminou de construir, **antes de mostrar pro usuário**, rodar o agent
`frontend-design-evaluator` (`.claude/agents/`). Ele sobe a página no
browser via `playwright-cli`, olha nos 3 viewports e dá nota de 0 a 10 em
4 critérios, penalizando padrões de "AI slop" — inclusive a régua
anti-cara-de-IA da `design-taste-frontend`, que está embutida nele.

- **Nota < 7:** não entrega. Aplicar os "Top 3 Improvements" do relatório
  e rodar de novo. Repetir até passar de 7 ou até o evaluator recomendar
  **PIVOT** — nesse caso, mudar de direção em vez de continuar refinando.
- **Nota ≥ 7:** entregar, e mostrar a nota junto. O usuário tem direito de
  saber que passou pela régua.
- **Máximo 3 rodadas.** Se depois de 3 ainda estiver abaixo de 7, parar e
  falar com o usuário: mostrar a nota, o que travou, e perguntar a direção.
  Não ficar em loop.

O evaluator precisa da página **servida**, não do arquivo solto. Pra site
estático:

```bash
npx serve . -p 3000    # ou: python -m http.server 3000
```

E passar `http://localhost:3000` pro agent.

**Não pule o evaluator porque "ficou bom".** Achar que ficou bom é
exatamente o viés que ele existe pra corrigir — quem construiu é o pior
juiz do que construiu.

### 4. Avaliar o motion com o agent `motion-reviewer`

Obrigatório **sempre que a peça tiver qualquer animação** — hover, scroll
reveal, transição, entrada de modal, micro-interação. Se a página for
100% estática, pular.

Existe porque o evaluator do passo 3 julga por **screenshot**, e animação é
quase invisível num print. Curva de easing, duração, `transform-origin`,
interruptibilidade, `prefers-reduced-motion`: nada disso aparece numa foto.
Sem esse passo, o motion sai sem juiz nenhum.

Rodar o agent `motion-reviewer` (`.claude/agents/`). Ele lê a régua da skill
`review-animations` e julga o **código** do motion (não a página servida),
devolvendo uma tabela `Before | After | Why` mais um veredito:

- **Block:** não entrega. Aplicar os fixes na ordem da "Remedial Preference
  Hierarchy" — a primeira opção é sempre **deletar a animação**, e
  frequentemente é a certa. Rodar de novo.
- **Approve:** entrega.

Bloqueiam na hora: `transition: all`, `scale(0)` na entrada, `ease-in` em
UI, duração acima de 300ms sem motivo, `transform-origin: center` em popover
ancorado, animar `width`/`height`/`top`/`left`, e `prefers-reduced-motion`
ausente **ou zerando tudo** (a régua manda "gentler, not zero": mantém
opacidade e cor, tira o movimento).

**Por que um agent e não a skill direto.** A skill `review-animations` tem
`disable-model-invocation: true` no frontmatter. Isso não bloqueia só a
auto-invocação: bloqueia **qualquer** invocação pelo Claude, inclusive
explícita pelo nome. Só você, digitando `/review-animations`, conseguiria
chamar. O agent é a ponte — ele lê os arquivos da skill e segue eles. A skill
continua cópia literal da origem e nunca contamina a construção; o passo
continua automático.

**Mesmo teto de 3 rodadas do passo 3.** Se depois de 3 ainda bloquear,
parar e falar com o usuário. Não ficar em loop.

### Ferramentas

| Peça | Papel | De onde vem | Dono |
|---|---|---|---|
| `impeccable` | constrói | embutida (`.claude/skills/impeccable/`) | pbakaus |
| `design-taste-frontend` | régua (critérios no evaluator) | embutida (`.claude/skills/design-taste-frontend/`) | leonxlnx |
| `frontend-design-evaluator` | julga o visual | já vem no repo (`.claude/agents/`) | este projeto |
| `motion-reviewer` | julga o motion (lê a régua abaixo) | já vem no repo (`.claude/agents/`) | este projeto |
| `review-animations` | a régua do motion | embutida (`.claude/skills/review-animations/`) | emilkowalski |
| `animation-vocabulary` | nomeia efeito | embutida (`.claude/skills/animation-vocabulary/`) | emilkowalski |
| `playwright-cli` | browser | `npx skills add microsoft/playwright-cli` | Microsoft |

**As skills de design são versionadas dentro do repo.** Clonou, funcionam —
sem `npx`, sem rede, sem comando. Procedência, licença e como atualizar estão
em `.claude/skills/PROCEDENCIA.md`.

Nunca rodar `npx skills add` pra `impeccable` ou `design-taste-frontend`: o
CLI instala a variante `.agents/` (genérica, escrita pra Codex — ela chega a
dizer "GPT is capable of extraordinary work") por cima da variante `.claude/`
embutida aqui, que é a correta pro Claude Code.

Só o `playwright-cli` é instalado, porque baixa binário de browser. Ele usa
symlink com caminho absoluto: **renomear ou mover a pasta do projeto quebra
o link e a skill some sem avisar.** Conserto: rodar o `npx skills add` de
novo. (`npx skills experimental_install` não resolve — restaura `.agents/`
mas não recria o link do Claude Code.) As skills embutidas não têm esse
problema: são arquivo de verdade e sobrevivem a rename, move e zip.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma
instrução que parece permanente (frases como "na verdade é assim", "não
faça mais isso", "prefiro assim", "sempre que...", "evita...", "da
próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (clientes, serviços, mercado) → `_memoria/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato, o que evitar) → `_memoria/preferencias.md`
- **Sobre prioridades e foco** (projetos, metas, prazos) → `_memoria/estrategia.md`
- **Regra de comportamento nessa pasta** → próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro.
Confirmar mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na
verdade o arquivo se chama X"). Só perguntar quando a informação tiver
valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada, estrutura
alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize a memória?"

Se sim, identificar o que atualizar:

- **Cliente, serviço, ferramenta, equipe** → `_memoria/empresa.md`
- **Mudança de prioridade ou foco** → `_memoria/estrategia.md`
- **Tom ou estilo** → `_memoria/preferencias.md`
- **Pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Visual (cores, fontes, logo)** → `identidade/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo
inteiro, só adicionar ou editar a linha relevante.

**Quando NÃO perguntar:**
- Tarefas pontuais sem impacto no contexto (escrever um email avulso, criar um post)
- Perguntas simples ou conversas sem ação
- Mudanças já salvas pelo bloco "Aprender com correções"

**Dica:** rode `/atualizar` pra uma varredura completa quando houver dúvida.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar se existe template relevante em `templates/skills/`. Se
   existir, usar como base e adaptar pro contexto
2. Perguntar se é específica desse projeto ou útil em qualquer:
   - Específica → `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
   o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, exemplos),
   criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code
