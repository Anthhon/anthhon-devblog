---
title: "O que acontece na stack quando você chama uma função"
date: 2025-01-08
description: "Toda chamada de função cria um stack frame. Vamos dissecar o que o processador faz passo a passo — com assembly e GDB."
tags: ["assembly", "stack", "C", "x86-64", "GDB"]
categories: ["Low-Level Dev"]
---

## Stack frames: a estrutura invisível do seu programa

Cada vez que você chama uma função em C, o processador cria uma estrutura na stack chamada **stack frame** (ou *activation record*). Dentro dela ficam:

- Os argumentos passados para a função (dependendo da ABI)
- O endereço de retorno — onde a execução volta depois
- As variáveis locais da função
- O valor antigo de `rbp` (base pointer)

## O código

```c
#include <stdio.h>

int soma(int a, int b) {
    int resultado = a + b;
    return resultado;
}

int main(void) {
    int r = soma(3, 4);
    printf("%d\n", r);
    return 0;
}
```

## O assembly gerado

Compile com:

```bash
gcc -O0 -fno-omit-frame-pointer -S -o exemplo.s exemplo.c
```

Você verá algo assim para `soma`:

```asm
soma:
    push    rbp           ; salva o frame pointer do caller
    mov     rbp, rsp      ; estabelece o novo frame pointer
    mov     DWORD PTR [rbp-4], edi   ; guarda argumento 'a'
    mov     DWORD PTR [rbp-8], esi   ; guarda argumento 'b'
    mov     eax, DWORD PTR [rbp-4]
    add     eax, DWORD PTR [rbp-8]
    mov     DWORD PTR [rbp-12], eax  ; guarda 'resultado'
    mov     eax, DWORD PTR [rbp-12]
    pop     rbp           ; restaura o frame pointer
    ret                   ; retorna para o caller
```

## Visualizando no GDB

```gdb
(gdb) break soma
(gdb) run
(gdb) info frame          ; mostra informações do frame atual
(gdb) x/16xw $rsp         ; mostra 16 words na stack
(gdb) backtrace           ; mostra a call stack
```

Experimente. Ver a stack em tempo real vai mudar como você pensa sobre funções.
