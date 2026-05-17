
# Arquitetura MongoDB — Projeto Lotofácil

## Objetivo

Este projeto demonstra uma arquitetura analítica usando MongoDB, aplicando conceitos de:

- RAW Layer
- CLEAN Layer
- ANALYTICS Layer
- KPIs
- Aggregations
- Materialized Collections

---

# Arquitetura

```txt
lotofacil_raw
   └── concursos

lotofacil_analytics
   ├── concursos_clean
   ├── monthly_stats
   ├── winners
   ├── metrics
   └── high_prize_metrics
```

---

# Conceitos

## RAW Layer

Database responsável por armazenar os dados originais.

### Database
```txt
lotofacil_raw
```

### Collection
```txt
concursos
```

### Características
- Dados originais
- Sem transformação
- Auditoria
- Reprocessamento
- Fonte oficial

---

## CLEAN Layer

Camada de dados tratados e padronizados.

### Collection
```txt
concursos_clean
```

### Transformações
- Datas convertidas para Date
- Valores monetários convertidos para Number
- Campos padronizados
- Estrutura otimizada para analytics

---

## ANALYTICS Layer

Camada de agregações e métricas.

### monthly_stats
Concursos por mês.

### winners
Concursos com múltiplos vencedores.

### metrics
KPIs gerais do dataset.

### high_prize_metrics
KPIs de concursos acima de 7 milhões.

---

# Fluxo ETL

```txt
RAW → CLEAN → ANALYTICS
```

---

# Scripts

Os scripts estão organizados na pasta:

```txt
scripts/
```

---

# Scripts disponíveis

| Script | Objetivo |
|---|---|
| 01_create_databases.mongodb.js | criação das databases |
| 02_create_clean.mongodb.js | criação da clean layer |
| 03_monthly_stats.mongodb.js | agregação mensal |
| 04_winners.mongodb.js | múltiplos vencedores |
| 05_metrics.mongodb.js | KPIs gerais |
| 06_high_prize_metrics.mongodb.js | KPIs acima de 7 milhões |

---

# Como executar

Abrir o mongosh:

```bash
mongosh
```

Executar:

```js
load("scripts/02_create_clean.mongodb.js")
```

---

# Benefícios dessa arquitetura

- Separação de responsabilidades
- Escalabilidade
- Facilidade para dashboards
- Performance analítica
- Reprocessamento simples
- Organização profissional

---

# Tecnologias

- MongoDB
- MongoDB Compass
- Mongo Shell (mongosh)

---

# Conceitos aplicados

- ETL
- Aggregation Pipeline
- Materialized Views
- KPIs
- Data Analytics
- Data Engineering
