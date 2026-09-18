---
name: playwright-navigation
description: >-
  Use esta skill quando for necessário realizar navegação web, interação com elementos de páginas, auditoria visual de UI, preenchimento de formulários, automação E2E ou capturas de tela utilizando as ferramentas do Playwright MCP.
---

# Navegação e Automação Web com Playwright MCP

Esta skill instrui o agente sobre como utilizar as ferramentas do **Playwright MCP** (`@playwright/mcp`) para navegar em aplicações web, inspecionar a árvore de elementos, interagir com componentes visuais e validar comportamentos em tempo de execução.

---

## Quando Utilizar

- **Navegação Web**: Acessar URLs, navegar entre páginas e acompanhar redirecionamentos.
- **Interação de Interface**: Clicar em botões, preencher campos de texto, selecionar opções, rolar a página.
- **Inspeção e Captura de Dados**: Extrair informações da DOM, obter a árvore de acessibilidade ou inspecionar seletores CSS/XPath.
- **Validação Visual**: Tirar capturas de tela (screenshots) para confirmar layout, renderização ou estado da página.
- **Testes de Fluxos E2E**: Simular a jornada do usuário em ambientes web (login, formulários, rotas autenticadas).

---

## Fluxo de Trabalho Recomendado

### 1. Inicialização e Navegação
- Utilize a ferramenta de navegação para abrir a URL desejada.
- Garanta que a página carregue completamente antes de tentar interagir com elementos.

### 2. Inspeção do Estado da Página
- Obtenha o snapshot da página ou a árvore de acessibilidade para identificar os seletores exatos ou papéis ARIA (ex.: `role="button"`, `name="Enviar"`).
- Prefira seletores resilientes baseados em papel ARIA, rótulos de texto ou atributos `data-testid` em vez de caminhos CSS frágeis.

### 3. Interação com Elementos
- **Cliques**: Verifique se o elemento está visível e clicável antes de acionar a ação.
- **Preenchimento de Campos**: Limpe ou preencha os inputs conforme necessário e valide o valor inserido.
- **Seleção e Navegação**: Trate formulários e navegações com aguardo por respostas assíncronas.

### 4. Captura Visual e Validação
- Tire screenshots para registrar o estado atual da interface ou comprovar falhas visuais/sucessos de testes.
- Valide títulos, textos visíveis e feedback de erros ou mensagens de sucesso.

---

## Boas Práticas e Recomendações

1. **Seletores Resilientes**: Priorize o uso de `getByRole`, `getByText`, `getByLabel` ou `data-testid`.
2. **Espera Implícita e Assíncrona**: Sempre aguarde a renderização de elementos dinâmicos antes de realizar interações subsequentes.
3. **Tratamento de Exceções**: Se um elemento não for encontrado, inspecione a árvore DOM atual atualizando a leitura da página antes de re-tentar.
4. **Resolução e Viewport**: Mantenha uma resolução padrão adequada (ex.: 1280x720 ou 1920x1080) quando capturar evidências visuais.
