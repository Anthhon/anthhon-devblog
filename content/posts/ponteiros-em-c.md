---
title: "Ponteiros em C: o que ninguém te conta"
date: 2025-01-15
description: "Ponteiros são a fundação do C — mas a maioria dos tutoriais para no básico. Vamos ver o que realmente acontece na memória."
tags: ["C", "ponteiros", "memória", "tutorial"]
categories: ["C Programming"]
---

## O que é um ponteiro, de verdade?

Todo mundo aprende a definição: *"um ponteiro é uma variável que guarda um endereço de memória."* Correto. Mas o que isso significa na prática?

Quando você escreve:

```c
int x = 42;
int *ptr = &x;
```

`ptr` não é mágico. É um número inteiro. Na maioria das arquiteturas 64-bit modernas, é um inteiro de 8 bytes que contém um endereço — a localização de `x` na RAM.

## Vendo na prática com GDB

Compile com símbolos de debug:

```bash
gcc -g -o exemplo exemplo.c
gdb ./exemplo
```

Dentro do GDB:

```gdb
(gdb) break main
(gdb) run
(gdb) info locals
(gdb) x/xw &x
```

O comando `x/xw` mostra o conteúdo da memória no endereço de `x` — e você vê `0x0000002a`, que é 42 em hexadecimal.

## Por que isso importa?

Entender que ponteiros são endereços te ajuda a:

1. **Debugar segfaults** — você sabe que está acessando um endereço inválido
2. **Entender arrays** — `array[i]` é literalmente `*(array + i)`
3. **Ler assembly** — instruções como `mov rax, [rbx]` fazem sentido imediato
4. **Evitar UB** — você sabe por que dangling pointers são perigosos

## Aritmética de ponteiros

```c
int arr[] = {10, 20, 30, 40};
int *p = arr;

printf("%d\n", *p);       // 10
printf("%d\n", *(p + 1)); // 20  — avança sizeof(int) bytes
printf("%d\n", *(p + 2)); // 30
```

Quando você faz `p + 1`, o compilador avança o endereço em `sizeof(*p)` bytes — no caso de `int`, 4 bytes. Não 1 byte, 4.

## Próximos passos

No próximo post, vamos abrir o binário no GDB e ver exatamente o que o compilador gerou para esse código — instrução por instrução.
