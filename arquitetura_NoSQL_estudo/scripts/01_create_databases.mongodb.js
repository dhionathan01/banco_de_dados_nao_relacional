
/* global use, db */
// 01 — Cria as databases e coleções da arquitetura

// RAW Layer
use('lotofacil_raw');
db.createCollection('concursos');

// Analytics Layer
use('lotofacil_analytics');
db.createCollection('concursos_clean');
db.createCollection('monthly_stats');
db.createCollection('winners');
db.createCollection('metrics');
db.createCollection('high_prize_metrics');
