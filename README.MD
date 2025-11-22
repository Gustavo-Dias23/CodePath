# 🚀 CodePath Assist - Global Solution 2025

> **O Futuro do Trabalho:** Avaliação Técnica Humanizada com IA Socrática.

![License](https://img.shields.io/badge/License-MIT-blue)
![React Native](https://img.shields.io/badge/React_Native-v0.76-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Expo](https://img.shields.io/badge/Expo-Go-black)

## 📖 Sobre o Projeto

O **CodePath Assist** é uma plataforma mobile desenvolvida para a Global Solution de Engenharia de Software (Mobile Development & IoT).

[cite_start]O projeto reimagina o processo de contratação técnica, substituindo os testes de "passou/não passou" (como LeetCode) por uma abordagem focada no **processo de pensamento** do candidato[cite: 1, 2, 18].

### 🎯 O Problema
[cite_start]Entrevistas de live coding tradicionais são falhas: elas testam a memorização e geram ansiedade, muitas vezes reprovando bons candidatos apenas porque travaram sob pressão, sem avaliar sua capacidade de aprendizado ou colaboração[cite: 2, 3, 4].

### 🚀 A Solução: O Tutor Socrático
[cite_start]Uma aplicação onde a IA atua como um "mentor" durante o teste técnico[cite: 6, 7].
1.  **Assistência Progressiva:** Se o candidato trava, ele pode pedir dicas. [cite_start]A IA não dá a resposta, mas guia o raciocínio (Direção -> Conceito -> Correção)[cite: 13, 24].
2.  [cite_start]**Avaliação Comportamental:** O sistema registra não apenas o código final, mas *quantas* dicas foram necessárias e *como* o candidato reagiu aos obstáculos[cite: 19, 21].
3.  **Persistência de Dados:** Todo o histórico e métricas de desempenho são salvos localmente (AsyncStorage).

---

## 📱 Funcionalidades

### 1. Seleção de Desafios (Face do Recrutador)
* [cite_start]Lista de problemas técnicos contextualizados com a vaga (ex: "Otimização de Rotas" para Logística, "Segurança em API" para Fintech)[cite: 5, 9].

### 2. Ambiente de Código Assistido (Face do Candidato)
* Editor de texto para resolução do problema.
* **Botão "Pedir Dica":** Libera ajudas progressivas simulando um mentor sênior.
    * [cite_start]*Nível 1:* Dica de Direção (Socrática)[cite: 13].
    * [cite_start]*Nível 2:* Dica Conceitual[cite: 14].
    * [cite_start]*Nível 3:* Dica de Correção de Rumo[cite: 15].

### 3. Relatório de Competência
* Dashboard que exibe quais desafios foram concluídos.
* Métrica de "Dicas Utilizadas" para avaliar a autonomia vs. colaboração do candidato.
* [cite_start]Persistência automática via `AsyncStorage`.

---

## 🛠 Tecnologias Utilizadas

* **Framework:** [React Native](https://reactnative.dev/) (via Expo)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Persistência:** [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
* **Navegação:** React Navigation (Native Stack)

---

## 📂 Estrutura do Projeto


src/
├── screens/
│   ├── HomeScreen.tsx      # Lista de Desafios Disponíveis
│   ├── ChallengeScreen.tsx # Ambiente de Teste com Tutor Socrático
│   └── ReportScreen.tsx    # Relatório de Desempenho (AsyncStorage)
├── services/
│   └── storage.ts          # Lógica de persistência de dados
└── App.tsx                 # Configuração de rotas

## 🚀 Como Rodar o Projeto
#### Pré-requisitos
Node.js instalado.

### Passo a Passo
#### Clone o repositório:
git clone https://github.com/Gustavo-Dias23/CodePath

cd CodePath

#### Instale as dependências:
npm install

#### Execute o projeto: Para rodar no Navegador (Recomendado para demonstração):
npx expo start --web

#### Para rodar no Celular (via Expo Go):
npx expo start

## 👥 Integrantes do Grupo
Breno Silva - RM97864
Enrico Marquez - RM99325
Gustavo Dias - RM550820
