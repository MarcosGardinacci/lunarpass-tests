<!-- # CT-RF01-001 — Buscar missões filtrando por uma única base lunar (fluxo principal)

> Gerado em: 2026-09-18  
> Executado via: Playwright MCP · http://localhost:3000/  
> Requisito: RF-01 — Buscar missões por base lunar (Funcionalidade: Busca de Missões)  
> Documento de referência: `docs/storefront-rfs.md`

---

## Caso de Teste

| Campo | Conteúdo |
|---|---|
| **ID do Caso de Teste** | CT-RF01-001 |
| **Título** | Buscar missões filtrando por uma única base lunar a partir do formulário da página inicial |
| **Funcionalidade / Requisito** | RF-01 — Buscar missões por base lunar (Funcionalidade: Busca de Missões) |
| **Pré-condições** | • A aplicação está disponível em http://localhost:3000/ <br>• O catálogo possui ao menos uma missão cadastrada para a Base Lunar Alpha <br>• O viajante está na página inicial (rota `/`) |
| **Dados de entrada** | Base lunar selecionada: **Base Lunar Alpha** |

---

## Passos, Resultado Esperado e Resultado Obtido

| # | Passo | Resultado Esperado | Resultado Obtido |
|---|---|---|---|
| 1 | Acessar http://localhost:3000/ | A página inicial do Lunar Pass é carregada com o formulário de busca visível | ✅ Página carregada. Título: `Lunar Pass — Passagens para a Lua`. Formulário de busca presente. |
| 2 | Localizar o grupo de seleção de bases lunares no formulário | O formulário apresenta exatamente quatro opções de bases lunares: Base Lunar Alpha, Base Lunar Orion, Base Lunar Aurora e Base Lunar Selene | ✅ Grupo **"Bases lunares"** exibe quatro checkboxes com os nomes exatos: `Base Lunar Alpha`, `Base Lunar Orion`, `Base Lunar Aurora`, `Base Lunar Selene` |
| 3 | Selecionar o checkbox **"Base Lunar Alpha"** | O checkbox fica marcado; os demais permanecem desmarcados | ✅ Checkbox `Base Lunar Alpha` marcado (`[checked]`). Os outros três permanecem desmarcados. |
| 4 | Clicar no botão **"Buscar missões"** | A aplicação navega para a página de resultados, aplicando o filtro pela base selecionada | ✅ Navegação para `/missions?base=alpha`. Título da nova página: `Missões disponíveis · Lunar Pass` |
| 5 | Verificar a quantidade de resultados exibida na página de resultados | A página apresenta a quantidade de missões encontradas (ex.: "N missão(ões) disponível(is)") | ✅ Heading `h1` exibe: **"1 missão disponível"** |
| 6 | Verificar se os resultados indicam qual base está sendo usada como filtro | A página indica explicitamente a base lunar utilizada como critério de filtro | ⚠️ A base está indicada, porém o texto exibido é **"Base Base Lunar Alpha"** (a palavra "Base" aparece duplicada). O filtro também é visível no dropdown "Bases lunares" com o valor `Base Lunar Alpha`. |
| 7 | Verificar se as missões listadas pertencem à base selecionada | Todas as missões exibidas devem ser da Base Lunar Alpha | ✅ A missão `LP-0127A` exibe `Base Lunar Alpha` / `Mar da Tranquilidade` como destino — compatível com o filtro aplicado |

---

## Resultado Final

| Campo | Conteúdo |
|---|---|
| **Status** | ⚠️ **Falhou parcialmente** |
| **Observações / Divergências** | **Defeito identificado no Passo 6:** O parágrafo de contexto abaixo do heading de resultados exibe o texto `Base Base Lunar Alpha`, com a palavra "Base" duplicada. O comportamento esperado, segundo RF-01, é que os resultados *indiquem quais bases estão sendo usadas como filtro* — a indicação existe, mas o texto está malformado. Todos os demais critérios do fluxo principal foram atendidos corretamente: as quatro bases aparecem no formulário com nomes corretos, a seleção de filtro funciona, a navegação ocorre, a contagem de resultados é exibida e as missões listadas correspondem à base filtrada. |

---

## Evidências de execução (Playwright MCP)

- **URL página inicial:** http://localhost:3000/
- **URL página de resultados:** http://localhost:3000/missions?base=alpha
- **Base selecionada:** Base Lunar Alpha
- **Missão retornada:** LP-0127A · Foguete Starship · 10 jan 2027 → 17 jan 2027 · 4/4 assentos · USD 1,000.00/passageiro
- **Texto exato do h1:** `1 missão disponível`
- **Texto exato do parágrafo de filtro:** `Base Base Lunar Alpha` ← **defeito tipográfico** -->
