# Lordran's Lore — Guia de Bosses de Dark Souls Remastered

Site est&aacute;tico (HTML, CSS e JavaScript puro) com um guia de sobreviv&ecirc;ncia para os principais chefes de *Dark Souls Remastered*, do Undead Asylum ao Kiln of the First Flame.

## Como visualizar

N&atilde;o h&aacute; build nem depend&ecirc;ncias. Basta abrir o `index.html` em um navegador, ou servir a pasta com qualquer servidor est&aacute;tico:

```bash
python3 -m http.server 8000
```

e acessar `http://localhost:8000`.

## Estrutura de arquivos

```
.
├── index.html   → estrutura e conteúdo da página
├── style.css    → todo o estilo visual (temas, layout, animações)
├── script.js    → comportamento interativo (tema, curtidas, embers)
└── README.md    → este arquivo
```

## Funcionalidades

### 1. Alternância de tema claro/escuro
Bot&atilde;o fixo no canto superior direito (&iacute;cone de lua/sol) que alterna entre o tema escuro padr&atilde;o e um tema claro em tom de pergaminho.
- A escolha do usu&aacute;rio &eacute; salva no `localStorage`, ent&atilde;o o tema persiste entre visitas.
- Um pequeno script &eacute; executado no `<head>`, antes do restante da p&aacute;gina carregar, para aplicar o tema salvo imediatamente e evitar o "flash" do tema errado ao abrir a p&aacute;gina.
- A implementa&ccedil;&atilde;o troca apenas um atributo (`data-theme="light"`) no `<html>`; todas as cores do site s&atilde;o vari&aacute;veis CSS (`:root`), ent&atilde;o o tema inteiro muda sem duplicar regras de estilo.

### 2. Sistema de curtidas ("fogueiras")
Cada boss tem um bot&atilde;o de curtida em formato de chama.
- Clicar acende a chama, incrementa o contador e aplica uma pequena anima&ccedil;&atilde;o de "acender" (`kindle`).
- Clicar novamente remove a curtida e decrementa o contador.
- O estado (curtido ou n&atilde;o, e a contagem) &eacute; salvo por boss no `localStorage`, ent&atilde;o &eacute; lembrado mesmo depois de fechar o navegador.
- O texto "curtida" / "curtidas" muda automaticamente no singular/plural conforme o n&uacute;mero.

### 3. Anima&ccedil;&atilde;o ambiente de bras&otilde;es (embers)
Part&iacute;culas geradas dinamicamente via JavaScript sobem a tela lentamente, remetendo &agrave;s cinzas de Blighttown/Izalith.
- Cada part&iacute;cula recebe posi&ccedil;&atilde;o horizontal, dura&ccedil;&atilde;o, atraso e desvio aleat&oacute;rios, para que a anima&ccedil;&atilde;o nunca se repita de forma id&ecirc;ntica.
- Respeita a prefer&ecirc;ncia de acessibilidade `prefers-reduced-motion`: se o usu&aacute;rio pediu menos movimento no sistema operacional, nenhuma part&iacute;cula &eacute; criada.

### 4. Design responsivo
O layout se adapta a telas pequenas: os cards de boss passam de layout em linha (n&uacute;mero + conte&uacute;do lado a lado) para empilhado verticalmente, e o bot&atilde;o de tema encolhe levemente em telas de celular.

### 5. Acessibilidade
- O bot&atilde;o de curtida usa `aria-pressed` para indicar seu estado (curtido/n&atilde;o curtido) a leitores de tela.
- O bot&atilde;o de tema tem `aria-label` din&acirc;mico, que muda de "Alternar para modo claro" para "Alternar para modo escuro" conforme o tema atual.
- Elementos puramente decorativos (&eacute;mbers, cantos ornamentais, &iacute;cone do sol) usam `aria-hidden="true"` para n&atilde;o poluir a navega&ccedil;&atilde;o por leitor de tela.
- Estilos de foco vis&iacute;vel (`:focus-visible`) para navega&ccedil;&atilde;o por teclado.

### 6. Conte&uacute;do
Guia com 10 chefes, em ordem de progress&atilde;o no jogo, cada um com localiza&ccedil;&atilde;o e uma dica pr&aacute;tica de estrat&eacute;gia:

| # | Boss | Localiza&ccedil;&atilde;o |
|---|------|---------------|
| I | Asylum Demon | Undead Asylum |
| II | Bell Gargoyles | Undead Parish |
| III | Chaos Witch Quelaag | Blighttown |
| IV | Iron Golem | Sen's Fortress |
| V | Ornstein & Smough | Anor Londo |
| VI | Seath the Scaleless | Duke's Archives |
| VII | The Four Kings | New Londo Ruins |
| VIII | Gravelord Nito | Tomb of Giants |
| IX | Bed of Chaos | Lost Izalith |
| X | Gwyn, Lord of Cinder | Kiln of the First Flame |

## Tecnologias

- **HTML5** semântico (`header`, `main`, `article`, `footer`).
- **CSS3** com vari&aacute;veis customizadas (`custom properties`) para tematiza&ccedil;&atilde;o, `flexbox` para layout, `@keyframes` para as anima&ccedil;&otilde;es e `@media` queries para responsividade e acessibilidade.
- **JavaScript** puro (sem frameworks ou bibliotecas), organizado em m&oacute;dulos com IIFEs (*Immediately Invoked Function Expressions*) para isolar escopo: um para os embers, um para o tema e um para as curtidas.
- **Web Storage API** (`localStorage`) para persist&ecirc;ncia de dados no navegador, sem necessidade de backend/banco de dados.
- Fontes do **Google Fonts** (Cinzel para t&iacute;tulos, EB Garamond para texto corrido).
