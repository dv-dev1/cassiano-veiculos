# MazyOS+

> O sistema operacional do seu negócio dentro do Claude Code — agora com
> régua de qualidade visual.

Você acaba de instalar o MazyOS+. Em alguns minutos, sua empresa vai ter
uma memória própria, uma identidade visual aplicada em tudo que o sistema
gerar, e 15 skills prontas pra fazer marketing, SEO, ads e operação
rodarem com você dirigindo.

E quando o assunto for interface — site de cliente, landing page, página
de captura — o sistema constrói com direção estética de verdade e confere
o resultado no browser antes de te mostrar.

Bora voar.

---

## Ligando o sistema

Dois caminhos. Escolhe o que combina contigo.

### Pelo Claude (mais rápido)

Abre o Claude Code em qualquer pasta e cola:

```
Clona o https://github.com/dv-dev1/mazyos-plus.git na pasta atual,
entra nela e roda o /instalar.
```

Ele clona, entra na pasta nova e dispara a entrevista de setup. Você só
responde.

### Pelo terminal (mais previsível)

```
git clone https://github.com/dv-dev1/mazyos-plus.git
cd mazyos-plus
code .
```

Na janela do VS Code que abrir: terminal integrado → `claude` → `/instalar`.

---

Quando o `/instalar` terminar, renomeia a pasta pro nome do teu negócio
(fecha o VS Code, renomeia no Explorer/Finder, abre de novo). A pasta não
fica como "mazyos-plus" — ela é o teu negócio agora.

O `/instalar` roda uma vez só. Te entrevista sobre o negócio, monta a
memória, liga as ferramentas de frontend e configura o sistema. Depois
disso, é só usar.

---

## O sistema

**Núcleo** — o jeito de operar o dia a dia
`/abrir` carrega o contexto antes de cada sessão de trabalho · `/salvar`
faz commit + push no GitHub · `/atualizar` varre o projeto e atualiza a
memória · `/novo-projeto` cria pasta isolada pra cada cliente ou
iniciativa · `/mapear-rotinas` descobre o que você repete e transforma em
skill personalizada.

**Conteúdo e SEO** — vitrine pública da empresa
`/carrossel` cria carrosséis 1080×1350 com identidade da marca (com ou sem
foto IA) · `/publicar-tema` pega um tema e entrega artigo de blog +
carrossel + 3 legendas amarradas · `/seo` roda fluxo completo de 8 passos
(demanda, concorrência, GMB, on-page, conteúdo, ads, monitoramento, GEO) ·
`/responder-avaliacoes` escreve respostas humanas pras reviews do Google ·
`/aprovar-post` publica blog + Instagram + Facebook num comando.

**Anúncios pagos** — onde o dinheiro entra
`/anuncio-google` monta a campanha inteira em CSV pronto pra importar no
Google Ads Editor · `/relatorio-ads` lê os exports de Google + Meta e
devolve relatório semanal com alertas e recomendações.

**Produção** — ferramentas do dia a dia
`/analisar-dados` lê CSV/XLSX/PDF e gera resumo executivo ·
`/email-profissional` rascunha email a partir de contexto livre.

---

## A régua visual

Essa é a diferença pro MazyOS original.

Qualquer interface que o sistema construir passa por uma esteira
obrigatória, sem você precisar pedir — uma skill constrói, duas julgam:

**Constrói com a skill `impeccable`.** Direção estética deliberada,
tipografia com personalidade, escolhas assumidas. Lê o
`identidade/design-guide.md` antes de decidir qualquer cor. Se você trouxer
referência (Pinterest, print de um site que curtiu), ela entra no brief — e
é ela que separa o resultado da cara de IA. Se você não trouxer, o sistema
pede.

Uma skill constrói, outra julga. O sistema **não** empilha skills de design
concorrentes: duas direções estéticas rodando ao mesmo tempo viram briga de
regra no meio da tarefa, não qualidade. A `design-taste-frontend` entra do
outro lado da mesa — a régua anti-cara-de-IA dela virou critério do
evaluator.

**Confere com o `frontend-design-evaluator`.** Antes de te mostrar
qualquer coisa, o sistema sobe a página no browser de verdade, olha nos
três tamanhos (desktop, tablet, celular), interage com os hovers, e dá nota
de 0 a 10 em quatro critérios:

| Critério | Peso |
|---|---|
| Design Quality | 40% |
| Originality | 30% |
| Craft | 15% |
| Functionality | 15% |

Ele penaliza explicitamente padrão de "AI slop" — gradiente roxo, card
branco com sombra, hero centralizado, grid uniforme, "Get Started" como
único CTA. Somados a esses, os tells que a `design-taste-frontend` catalogou
testando landing page gerada por IA: eyebrow numerado (`001 · Serviços`),
print de produto falso feito de `<div>`, faixa de decoração no rodapé do
hero, "Scroll pra explorar", nome de cliente "João da Silva", número
redondo demais (`99,9%`), e o em-dash (`—`), que é a assinatura mais
denunciável de texto escrito por IA — esse o evaluator conta no DOM em vez
de tentar enxergar no print.

**Abaixo de 7 não sai.** O sistema aplica as melhorias e roda de novo, até
três vezes. Passou de 7, você recebe o trabalho junto com a nota.

**E confere a animação com o `motion-reviewer`.** O evaluator julga por
screenshot — e animação é invisível num print. Curva de easing, duração,
interruptibilidade, de onde o popover nasce: nada disso aparece numa foto.
Então tem um segundo juiz, esse lendo o código do motion, com régua do
[Emil Kowalski](https://animations.dev) (o autor do Sonner e do Vaul).

Isso não é teoria. Num ensaio com um cliente fictício, a página passou no juiz
visual com 7,45 e **levou Block do juiz de motion** — que achou seis defeitos
reais que o screenshot não mostrava, incluindo o botão de WhatsApp sem nenhum
feedback ao toque no celular, que era o único objetivo da página.

Ele bloqueia na hora: `transition: all`, entrada com `scale(0)` (nada
aparece do nada), `ease-in` em UI (atrasa justo o instante que o usuário
olha), animação acima de 300ms sem motivo, popover crescendo do centro em
vez de crescer do botão que o abriu, e `prefers-reduced-motion` ausente. A
primeira sugestão de conserto dele é sempre **deletar a animação** — e
costuma ser a certa.

Se você descrever o efeito de um jeito vago ("aquele negócio que quica
quando abre"), a `animation-vocabulary` acha o nome exato ("Pop in") antes
de qualquer código. Brief preciso é o que separa o resultado do genérico.

O ponto de tudo: quem construiu é o pior juiz do que construiu. Os dois
juízes existem pra corrigir esse viés antes do cliente ver.

---

## Ferramentas

**As skills de design já vêm dentro do repo.** Você clona e elas funcionam —
sem instalar nada, sem rede:

| Peça | De onde vem |
|---|---|
| `impeccable` (constrói) | embutida, `.claude/skills/impeccable/` |
| `design-taste-frontend` (régua) | embutida, `.claude/skills/design-taste-frontend/` |
| `frontend-design-evaluator` (julga o visual) | embutido, `.claude/agents/` |
| `motion-reviewer` (julga o motion) | embutido, `.claude/agents/` |
| `review-animations` (a régua do motion) | embutida, `.claude/skills/review-animations/` |
| `animation-vocabulary` (nomeia efeito) | embutida, `.claude/skills/animation-vocabulary/` |
| `playwright-cli` (browser) | o `/instalar` baixa |

O browser é o único que precisa de instalação, porque baixa binário — e quem
roda é o `/instalar`, você não digita nada.

As skills de terceiros vêm embutidas com a licença original
([impeccable](https://github.com/pbakaus/impeccable) é Apache-2.0;
[taste-skill](https://github.com/leonxlnx/taste-skill) e
[emilkowalski/skills](https://github.com/emilkowalski/skills) são MIT). O
preço de embutir é que elas não atualizam sozinhas: procedência, versão e o
passo a passo pra atualizar estão em `.claude/skills/PROCEDENCIA.md`.

---

## A tese

IA não é uma ferramenta que sua empresa usa. É o sistema operacional em que
ela roda.

A diferença não é velocidade. É capacidade nova — uma pessoa com IA
constrói o que antes exigia time inteiro. Cada processo crítico que hoje
roda em open loop (decide → executa → não mede → repete cego) vira closed
loop dentro do MazyOS+ (decide → executa → captura → realimenta → ajusta
sozinho).

O trabalho visual é o mesmo princípio. Gerar interface sem medir é open
loop — sai bonito às vezes, genérico na maioria, e você só descobre qual
foi quando o cliente reclama. O evaluator fecha o loop.

O sistema não substitui você. Vira parte da sua empresa.

---

## Como o MazyOS+ pensa

`_memoria/` é o cérebro. Tudo que importa do seu negócio mora aqui — quem é
a empresa, como ela fala, o que tá em foco essa semana. O Claude lê isso
antes de cada resposta. Quanto melhor a memória, melhor o sistema.

`identidade/` é o rosto. Cores, fontes, logo, padrão visual. Todo
carrossel, slide, site e peça que o sistema gera respeita isso — e a
identidade tem a palavra final, inclusive contra o gosto da skill de design.

`marketing/`, `saidas/` e `scripts/` são o resultado. O sistema produz,
versiona no GitHub, fica tudo seu.

---

## Origem

Construído em cima do [MazyOS](https://github.com/mazzeoia/mazyos), de
[@mazzeoia](https://github.com/mazzeoia). O núcleo — memória, identidade,
skills de marketing e o `/instalar` — é dele. O que foi somado aqui é a
régua visual: o `frontend-design-evaluator`, o encaixe com a
[impeccable](https://github.com/pbakaus/impeccable) de
[@pbakaus](https://github.com/pbakaus) e a
[taste-skill](https://github.com/leonxlnx/taste-skill) de
[@leonxlnx](https://github.com/leonxlnx), e a obrigatoriedade do fluxo
inteiro no trabalho de interface.
