---
title: "Diferenças entre o Heap e o Stack"
date: 2026-04-05
description: "Uma abordagem rápida e simples sobre os conceitos básicos de como funcionam os principais segmentos da memória."
tags: ["C", "memória", "fundamentos", "conceitos"]
---

## Segmentação de Memória

Quando compilamos um código, o binário gerado utiliza cinco segmentos 
diferentes da memória do computador, segmentos esses chamados de: *text*, 
*data*, *bss*, *heap* e *stack*.

Todos esses segmentos tem sua devida importância e utilidade, portanto, nesse 
material vamos tentar elaborar um pouco sobre o funcionamento de cada um deles.

Entender bem o funcionamento desses setores da memória acaba sendo benéfico a 
qualquer programador que vá lidar com linguagens de baixo nível, que exigem 
maior compreensão do comportamento e da manipulação da memória.

## Text, Data e BSS

```
+--------------+
|     Stack    |
+--------------+
|       ↓      |
|              |
|       ↑      |
+--------------+
|     Heap     |
+--------------+
|      BSS     |
+--------------+
|     Data     |
+--------------+
|     Text     |
+--------------+
```

Podemos entender a memória usada pelo programa com um mapa mental simples, 
fácil de decorar (mesmo que não em detalhes), como o apresentado acima. A 
interpretação é a seguinte: as seções `text`, `data` e `BSS` ficam nos blocos 
inferiores e são responsáveis por armazenar:

- `text`: O código do programa compilado em instruções legíveis pela máquina
- `data`: Variáveis **definidas** antes ou durante o processo de compilação
- `BSS (Block Starting Symbols)`: Variáveis **inicializadas** durante o processo 
de compilação

Para entender como esses conceitos se aplicam dentro do código de um programa 
escrito em C, vejamos o exemplo:

```c
#include <stdio.h>

// Variáveis globais (pertencem ao segmento 'data')
int global_x = 100;
float global_y = 100.0f;

int main(void)
{
    // Variáveis locais e estáticas (pertencem ao segmento 'data')
    static int static_x;

    printf("global_x: %i\n", global_x);
    printf("global_y: %f\n", global_y);
    printf("static_y: %i\n", static_x);

    return 0;
}
```

No código estamos alocando algumas variáveis glovais, estáticas e locais, para 
logo em seguida exibí-las para o usuário.

Quando compilado e executado, o executável e suas instruções residem no segmento 
`text`, enquanto as variáveis todas existem no segmento `data` e `BSS` 
(inicializadas e não-inicializadas respectivamente)

## Heap

Esse segmento é usado especificamente quando queremos armazenar informações de 
tamanho dinâmico. Sempre que você cria uma variável ou objeto de tamanho 
indefinido, ou que possa mudar de tamanho durante a execução, é bem provável que 
essa variável esteja no *Heap*.

Esse segmento geralmente é gerenciado por funções como: `malloc()`, `realloc()` 
e `free()`.

```c
#include <stdio.h>

int main(void)
{
	// Aloca espaço para 10 elementos do tipo 'char' e 
    // guarda o ponteiro para o início do bloco de memória alocado
    // dentro de 'array'
	char *array = malloc(sizeof(*array) * 10);

    // Libera a memória usada por 'array' devolta para o sistema
	if (array != NULL){
		free(array);
	}

	return 0;
}
```

Um detalhe importante: o `heap` cresce em direção ao `stack`. Se você alocar 
muitos elementos na memória dinâmica, pode ocorrer um "choque" entre os dois 
segmentos quando o espaço acabar, gerando um erro chamado *Stack Overflow*, que 
geralmente encerra a execução do programa abruptamente.

## Stack

Dentre todos os segmentos descritos, o stack é provavelmente o mais complexo de 
entender, pois possui um comportamento bem específico.

Toda vez que o programa chama uma função, cria variáveis locais ou retorna de 
um método durante a execução, estamos adicionando ou removendo o que chamamos 
de stack frame. Isso acaba criando um comportamento do tipo LIFO (Last In, 
First Out).

```c
void func(void)
{
    int local_var = 10;
}

int main(void){
    // Chama a função 'func' e cria uma nova pilha na stack
    func();
	return 0;
}
```

## Principais diferenças entre stack e heap

- **Gerenciamento:** No stack, a alocação e desalocação são feitas 
automaticamente pelo compilador. Já no heap, o próprio programador é responsável 
por isso.

- **Problemas comuns:** Problemas de *overflow* de memória são mais prováveis no stack, 
enquanto no heap os principais problemas envolvem segurança e fragmentação de 
memória.

- **Flexibilidade:** O stack não é flexível, a memória usada nele não pode ser 
redimensionada. Já no heap, o tamanho pode ser alterado dinamicamente.
