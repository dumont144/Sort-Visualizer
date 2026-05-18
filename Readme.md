# 🎯 Sort Visualizer

Um visualizador interativo de algoritmos de ordenação construído com **React + Vite + Tailwind CSS**. Veja como cada algoritmo funciona em tempo real, com estatísticas de comparações, trocas e tempo de execução.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5-646cff.svg)

## ✨ Features

- 🎨 **6 algoritmos implementados**: Bubble, Insertion, Selection, Merge, Quick e Heap Sort
- ⚡ **Animações em tempo real** com controle de velocidade
- 📊 **Estatísticas ao vivo**: comparações, trocas e tempo
- 🎛️ **Controles interativos**: tamanho do array, velocidade, embaralhar
- 🌗 **Modo escuro nativo** com paleta cuidadosamente escolhida
- 📱 **Totalmente responsivo**
- ♿ **Acessível** (navegação por teclado, ARIA labels)

## 🚀 Demo

```bash
npm install
npm run dev
```

Abra [[http://localhost:5173](https://sortvisualizertech.netlify.app) ]no navegador.

## 📚 Algoritmos

| Algoritmo | Complexidade Média | Complexidade Pior Caso | Espaço |
|-----------|-------------------|------------------------|--------|
| Bubble Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n²) | O(log n) |
| Heap Sort | O(n log n) | O(n log n) | O(1) |

## 🛠️ Stack

- **React 18** – UI declarativa
- **Vite** – Build ultra-rápido
- **Tailwind CSS** – Estilização utility-first
- **Generators (JS)** – Para pausar e visualizar cada passo dos algoritmos

## 🏗️ Arquitetura

Os algoritmos são implementados como **generator functions** que produzem (`yield`) cada operação visual (comparação, troca, marcação). Isso desacopla a lógica do algoritmo da renderização, permitindo controlar velocidade, pausar e replayar facilmente.

```
src/
├── algorithms/      # Cada algoritmo como generator
├── components/      # Componentes React
├── hooks/           # Hooks customizados (useSortPlayer)
├── App.jsx
└── main.jsx
```

## 📦 Scripts

```bash
npm run dev      # Modo desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
```

## 📄 Licença

MIT © Seu Nome
MIT © Felipe Monte

---

⭐ Se gostou, deixa uma star no repositório!
