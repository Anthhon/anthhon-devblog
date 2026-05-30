---
title: "GDB - Conceitos básicos"
date: 2023-04-15T19:32:37-03:00
description: "Conhecendo os comandos básicos do GDB."
tags: ["C", "debugging", "GDB", "conceitos"]
categories: ["Estudos"]
---

## Como debugar código C usando GDB

O **GNU Debugger** (também conhecido como GDB) é um depurador que permite ao usuário
ver "o que está acontecendo" dentro de um programa enquanto ele é executado.

GDB pode ser usado para depurar programas escritos em `C`, `C++`, `Fortran` e 
`Modula-2`.

## Código de exemplo

```c
#include <stdio.h>

int main()
{
    int i, num, j;
    printf("Digite um número: ");
    scanf("%d", &num);

    for (i = 1; i < num; i++)
        j = j * i;

    printf("%d! é igual a: %d\n", num, j);
}
```

O código recebe um número do usuário através do comando `scanf` e calcula o seu 
fatorial.

Porém, esse código contém intencionalmente um erro: quando o número 6 é 
inserido, o programa retorna 0 quando deveria retornar 720.

```
6! é igual a: 0
```

Por que isso acontece? É o que vamos tentar descobrir usando o GDB!

## Compilando o código

Para usar o GDB no seu código, você precisa usar o argumento `-g` durante a 
compilação, que permite ao compilador coletar informações essenciais para o 
processo de depuração, veja o exemplo abaixo:

```
$ cc -g factorial.c -o factorial
```

## Inicializando o GDB

Inicialize o GDB com o seguinte comando:

```
$ gdb factorial.c
```

Se você não tiver o GDB instalado no seu sistema, basta usar o comando:

```
$ sudo apt install gdb
```

## Definindo um breakpoint

Um *breakpoint* é basicamente um sinal que define onde seu código deve parar 
durante a execução, evitando que ele pule a parte que você deseja examinar.

Para definir um novo breakpoint, use o comando `break` ou sua versão abreviada 
`b`:

```
(gdb) break número_da_linha
```

No nosso caso, como queremos examinar o laço do código, vamos definir o 
*breakpoint* na linha 9:

```
(gdb) break 9
Breakpoint 1 at 0x11d3: file factorial.c, line 9.
```

## Executando o programa

Para executar o programa, use o comando `run [args]` (os argumentos podem ser 
usados normalmente, como se você estivesse executando o programa fora do GDB). 
Como no nosso caso não são necessários argumentos, vou usar apenas `run`:

```
run
Starting program: /home/usuario/pasta/factorial
```

Com o código em execução, ele rodará normalmente até atingir o primeiro 
`breakpoint` definido e exibirá a seguinte mensagem:

```
Breakpoint 1, main () at factorial.c:7
7           for (i = 1; i < num; i++)
```

A partir daí, você usará alguns comandos para depurar, conforme explicado nos 
tópicos a seguir...

## Exibindo valores de variáveis

Para verificar o valor de uma variável, use o comando `print` junto com o nome da variável (também pode ser abreviado como `p`). Por exemplo:

```
(gdb) print i
$1 = 1
(gdb) print j
$2 = 3042592
(gdb) print num
$3 = 6
```

Como você pode ver, a variável `j` não foi inicializada corretamente. Portanto, 
ela terá um valor "lixo" padrão, o que resultará em um valor inesperado no 
fatorial.

Para corrigir o problema, basta definir a variável `j` como 1, recompilar o 
programa e executá-lo novamente. O problema parece resolvido... mas mesmo 
depois disso, algo ainda faz com que o fatorial errado seja retornado.


