---
title: Como eu crio sites com IA sem deixar a IA fazer todo o trabalho
description: "O fluxo que testei na Barca e uso nos meus projetos: prototipar fora da ferramenta, refinar com calma, e só então construir. Usar IA em massa piora o resultado."
date: 2026-08-13
category: Processo
draft: false
created: 2026-08-14 14:00
updated: 2026-08-18T22:36
---

No começo eu fazia o que todo mundo faz. Abria a ferramenta, descrevia a página inteira e mandava gerar.

Saía sempre a mesma coisa. Genérico, repetitivo, com seção que existe só pra preencher espaço. E aí eu passava mais tempo consertando do que teria passado fazendo na mão.

Demorei pra entender que o problema não era o prompt. Era o momento em que eu chamava a IA.

## O fluxo que funcionou

Esse é o processo que eu uso hoje na Barca. Testei primeiro na [Biblioteca Pop](https://assine.bibliotecapop.com) e depois apresentei pro resto do time de web.

Primeiro eu extraio o design system real do cliente. Cor, tipografia, espaçamento, borda, componente. Documento [numa nota](/blog/obsidian-como-contexto-pra-ia), uma por clube. Parece burocracia até a terceira vez que eu preciso prototipar algo pro mesmo cliente e não preciso extrair nada de novo.

Depois eu prototipo em HTML e CSS, fora da ferramenta final. Um arquivo estático, com o design system dentro e a copy que o squad já aprovou. Iterar visualmente aqui é bem mais rápido do que iterar dentro do [Framer](https://framer.com).

Aí eu refino com calma. Layout, contraste, hierarquia, as manias específicas daquele cliente. Essa é a parte que ninguém mostra nos vídeos, e é a que decide se a página vai parecer feita por alguém.

Só no fim eu construo no Framer, seção por seção, usando o protótipo como alvo.

## A parte contraintuitiva

Pedir pra IA copiar uma página inteira de uma vez sai fraco. Pedir pra ela resolver uma seção específica sai bom.

Mesmo modelo, mesmo prompt, mesma referência. O que muda é o tamanho do pedaço.

É que quanto maior o escopo, mais ela preenche com média. E média em design é aquele bufê de hotel: tem de tudo, dá pra comer, e ninguém lembra no dia seguinte.

Tem um motivo prático também. Mexer direto na página de um cliente que está no ar é risco à toa. Já aconteceu de sobrar um elemento duplicado preso na home ao vivo por causa disso. Validar fora primeiro custa vinte minutos.

## Isso não é sobre Framer

O fluxo funciona em qualquer ferramenta, porque o que ele muda é onde você coloca a decisão.

Quando você prototipa fora, você decide como a página vai ser antes de pedir pra alguém construir. Quando você pede direto na ferramenta, você terceiriza a decisão e depois negocia com o resultado.

E teve uma coisa que eu não esperava: esse processo me fez desenhar melhor. Escrever o design system pra IA me obrigou a [nomear coisa que eu antes só sentia](/blog/codigo-para-designer-dirigir-ia). Quando você precisa dizer qual é o espaçamento entre seções, descobre se tinha uma regra ou se estava improvisando.

## Onde ela ajuda e onde ela atrapalha

A IA não substituiu nenhuma etapa do meu processo. Ela acelerou a execução das que eu já sabia fazer, e ficou péssima nas que eu tentei pular.

Se o seu resultado com IA está genérico, provavelmente não é o prompt. É que você pediu a página inteira antes de decidir como ela deveria ser.
