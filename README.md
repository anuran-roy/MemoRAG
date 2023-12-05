# MemoRAG

## Description

A small barebones set of scripts/files that are used to create a simple RAG pipeline. Easily hackable and extensible - **yes, 100% hackable!**

MemoRAG is a barebones implementation of an ExpressJS server with RAG pipeline without using LangChain or any other LLM Framework. It contains all base classes for calling LLMs, data processing, etc - built from scratch. It's my starting point for learning production-scale RAG

> **NOTE**: This is a work in progress. I'll be adding more features as I learn more about RAG and LLMs

## Installation

1. Clone this repository

```bash
git clone https://github.com/anuran-roy/memorag.git
```

2. Install the dependencies

```bash
npm i
```

3. Run the server

a. For development

```bash
npm run dev
```

b. For production
```bash
npm run start
```

## Tech Stack

-   NodeJS
-   ExpressJS
-   TypeScript
-   Qdrant for Vector DB
-   DrizzleORM for ORM
-   PostgreSQL for DB
