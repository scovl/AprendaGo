import { Module } from '../../types';

export const genericsModule: Module = {
  id: 'generics',
  title: 'Generics',
  description: 'Generics (Go 1.18+): type parameters, constraints, inferência e casos de uso reais.',
  icon: 'Braces',
  color: '#8E44AD',
  lessons: [
    {
      id: 'gen-introducao',
      title: 'Introdução a Generics',
      description: 'Type parameters, any, comparable, funções e tipos genéricos.',
      estimatedMinutes: 45,
      vesa: {
        visaoGeral: {
          recursos: [
            'https://go.dev/doc/tutorial/generics',
            'https://go.dev/blog/intro-generics',
          ],
        },
        experimentacao: {
          desafio: 'Implemente Map, Filter e Reduce genéricos. Depois, crie um Set[T comparable] com Add, Contains, Remove, Union e Intersection.',
          dicas: [
            'Map[T, U any]([]T, func(T) U) []U',
            'Set usa map[T]struct{} internamente (memoria mínima)',
            'Reduce[T, U any]([]T, U, func(U, T) U) U',
          ],
          codeTemplate: 'package main\n\nfunc Map[T, U any](s []T, fn func(T) U) []U {\n\t// Implemente\n\treturn nil\n}\n\nfunc Reduce[T, U any](s []T, init U, fn func(U, T) U) U {\n\t// Implemente\n\tvar zero U\n\treturn zero\n}',
        },
        socializacao: {
          discussao: 'Generics resolvem quais problemas? Quando NÃO usar?',
          pontos: [
            'Antes: sort.IntSlice, sort.StringSlice, sort.Float64Slice...',
            'Agora: uma função Sort[T constraints.Ordered]',
            'Não use quando interface simples resolve o problema',
          ],
          diasDesafio: 'Dias 69–76',
          sugestaoBlog: 'Generics em Go: Map, Filter, Reduce e coleções type-safe',
          hashtagsExtras: '#golang #generics',
        },
        aplicacao: {
          projeto: 'Pacote de coleções genéricas: Set[T], Queue[T] e Cache[K, V] com TTL.',
          requisitos: [
            'Set: Add, Remove, Contains, Union, Intersection',
            'Queue: Enqueue, Dequeue, Peek, Len',
            'Cache: Get, Set com TTL, Delete, cleanup automático',
          ],
          criterios: ['Type safety em compilação', 'Testes unitários', 'Benchmark vs interface{}'],
        },
      },
    },
    {
      id: 'gen-constraints',
      title: 'Constraints Avançadas',
      description: 'constraints.Ordered, union types, ~T, limitações e design patterns.',
      estimatedMinutes: 40,
      vesa: {
        visaoGeral: {
          recursos: [
            'https://pkg.go.dev/golang.org/x/exp/constraints',
            'https://go.dev/blog/intro-generics',
          ],
        },
        experimentacao: {
          desafio: 'Implemente BinarySearch e MergeSort genéricos usando constraints.Ordered. Compare performance com sort.Slice.',
          dicas: [
            'go get golang.org/x/exp para usar constraints',
            'Crie sua constraint: type Numeric interface { ~int | ~float64 }',
            '~ é essencial para aceitar type aliases',
          ],
        },
        socializacao: {
          discussao: 'Go acertou no design de generics? Quais limitações surpreenderam?',
          pontos: [
            'Métodos não podem ter type params próprios',
            'Sem specialization (tratamento especial por tipo)',
            'Comparado com C++ templates: muito mais simples',
            'Go priorizou simplicidade — trade-off válido',
          ],
          diasDesafio: 'Dias 69–76',
          sugestaoBlog: 'Constraints em Go: ~T, union types e limitações dos generics',
          hashtagsExtras: '#golang #generics #constraints',
        },
        aplicacao: {
          projeto: 'Biblioteca de algoritmos genéricos: BinarySearch, MergeSort e MinHeap.',
          requisitos: [
            'BinarySearch[T constraints.Ordered]',
            'MergeSort[T constraints.Ordered]',
            'MinHeap[T constraints.Ordered] com Push/Pop/Peek',
          ],
          criterios: ['Corretos', 'Performance competitiva', 'Testes com edge cases'],
        },
      },
    },
  ],
};
