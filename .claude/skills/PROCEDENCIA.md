# Skills de terceiros embutidas

As skills de design vêm **dentro do repo**, versionadas. Você clona e elas
funcionam — sem `npx`, sem rede, sem comando nenhum.

Isso é uma decisão consciente, com um custo: elas **não atualizam sozinhas**.
Este arquivo existe pra que ninguém precise adivinhar de onde elas vieram nem
como atualizar.

---

## O que está embutido

| Skill | Papel | Origem | Licença |
|---|---|---|---|
| `impeccable/` | constrói interface | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Apache-2.0 |
| `design-taste-frontend/` | régua anti-cara-de-IA | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) | MIT |
| `review-animations/` | julga o motion | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT |
| `animation-vocabulary/` | nomeia efeito de motion | [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT |

**Versão embutida:**

- `impeccable` — commit `8259c28209b92792005cec14dad573df39f68eaf` (2026-07-14),
  copiado de `.claude/skills/impeccable/` do repo de origem
- `design-taste-frontend` — commit `7b3782a65f89eb53ab67af4ac40b689704e5a876`
  (2026-07-16), copiado de `skills/taste-skill/SKILL.md` do repo de origem
- `review-animations` e `animation-vocabulary` — commit
  `6bf24434f7730ad169077756cf9c7cd7bd675fc6` (2026-07-15), copiados de
  `skills/<nome>/` do repo de origem

**Por que só 2 das 6 do emilkowalski.** O repo tem 6 skills; as outras 4
ficaram de fora de propósito. `emil-design-eng` e `apple-design` **constroem**
interface e auto-invocam — competiriam com a `impeccable` pelo papel de
construtora, e a `apple-design` ainda imporia a estética da Apple por cima do
`identidade/design-guide.md`. `improve-animations` e
`find-animation-opportunities` fazem o que a `review-animations` já faz.
Se um dia alguém quiser reavaliar, o critério é esse: **uma constrói, as
outras julgam.**

**Modificações:** nenhuma. Os arquivos são cópia literal da origem. Se algum
dia forem modificados, registrar aqui — a Apache-2.0 exige sinalizar alteração.

As licenças originais estão em `impeccable/LICENSE` e
`design-taste-frontend/LICENSE`. Não remover.

---

## Por que a variante `.claude/`, e não o `npx skills add`

O repo da `impeccable` publica uma variante por agente (`.claude/`, `.agents/`,
`.cursor/`, ...). O `npx skills add` instala a variante **`.agents/`**, que é a
genérica. Ela não é a melhor pra cá:

| | `.agents/` (o que o `npx` instala) | `.claude/` (o que está embutido) |
|---|---|---|
| Frontmatter | sem | `user-invocable: true` + `allowed-tools` |
| Invocação | `$impeccable craft` | `/impeccable craft` |
| Texto | "**GPT** is capable of extraordinary work" | "**Claude** is capable of extraordinary work" |
| Correções de modelo | seção "**Codex**-specific defects" | sem seção de modelo |
| Caminho dos scripts | `.agents/skills/impeccable/scripts/` | `.claude/skills/impeccable/scripts/` |

Embutir a variante `.claude/` entrega a versão certa pro agente certo.

**Bônus:** o `npx skills add` cria symlink com caminho **absoluto**. Renomear
ou mover a pasta do projeto quebra o link e a skill some sem dar erro. Skill
embutida é arquivo de verdade — sobrevive a rename, move, zip e clone.

---

## Como atualizar

Não existe comando mágico. É cópia manual, e é rápido:

```bash
# 1. Pegar a origem num diretório temporário
git clone --depth 1 https://github.com/pbakaus/impeccable /tmp/impeccable
git clone --depth 1 https://github.com/leonxlnx/taste-skill /tmp/taste-skill
git clone --depth 1 https://github.com/emilkowalski/skills /tmp/emilskills

# 2. Substituir (o --delete tira arquivo que sumiu na origem)
rsync -a --delete /tmp/impeccable/.claude/skills/impeccable/ .claude/skills/impeccable/
cp /tmp/impeccable/LICENSE .claude/skills/impeccable/LICENSE
cp /tmp/taste-skill/skills/taste-skill/SKILL.md .claude/skills/design-taste-frontend/SKILL.md
rsync -a --delete /tmp/emilskills/skills/review-animations/ .claude/skills/review-animations/
rsync -a --delete /tmp/emilskills/skills/animation-vocabulary/ .claude/skills/animation-vocabulary/
cp /tmp/emilskills/LICENSE .claude/skills/review-animations/LICENSE
cp /tmp/emilskills/LICENSE .claude/skills/animation-vocabulary/LICENSE

# 3. Anotar os commits novos neste arquivo
git -C /tmp/impeccable log -1 --format="%H (%ad)" --date=short
git -C /tmp/taste-skill log -1 --format="%H (%ad)" --date=short
git -C /tmp/emilskills log -1 --format="%H (%ad)" --date=short
```

Ao atualizar as do emilkowalski, conferir que a `review-animations` continua
com `disable-model-invocation: true` no frontmatter. É isso que impede ela de
aparecer sozinha e virar uma segunda opinião no meio da construção:

```bash
grep -c "disable-model-invocation: true" .claude/skills/review-animations/SKILL.md
```

**Não remova essa flag pra "facilitar a invocação".** Ela é o que garante que a
skill nunca contamine uma construção — a `impeccable` é a única que constrói.
O Claude não consegue invocar a skill diretamente por causa dela (a flag bloqueia
qualquer invocação pelo modelo, não só a automática); quem faz a ponte é o agent
`motion-reviewer`, que lê estes arquivos e segue eles. Se a flag sumir, a skill
volta a poder aparecer sozinha no meio de um `craft`.

Se o `SKILL.md` ou o `STANDARDS.md` mudarem de nome ou de estrutura na origem,
ajustar o `.claude/agents/motion-reviewer.md`, que aponta pros dois por caminho.

Depois de atualizar, **conferir se o caminho dos scripts continua o mesmo**:

```bash
grep -o "node [^ ]*scripts/context.mjs" .claude/skills/impeccable/SKILL.md
```

Tem que responder `.claude/skills/impeccable/scripts/context.mjs`. Se apontar
pra `.agents/`, você copiou a variante errada.

Teste rápido de que a skill está viva:

```bash
node .claude/skills/impeccable/scripts/context.mjs
```

Num projeto sem `PRODUCT.md` ele responde `NO_PRODUCT_MD` — isso é sucesso,
significa que o script rodou.

**Quando atualizar:** sem pressa. Skill de design não tem CVE. Uma olhada a
cada poucos meses, ou quando a origem anunciar algo que interessa.

---

## O que NÃO está embutido

O `playwright-cli` continua vindo pelo `npx skills add` (Fase 3.5 do
`/instalar`). Ele baixa binário de browser — isso não cabe num repo git.
