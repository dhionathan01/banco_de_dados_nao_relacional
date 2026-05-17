/* global use, db */
// Questão 4 — Quantos concursos pagaram o prêmio principal para mais de um ganhador?

use('loto_facil_vscode');

db.loto_facil_raw.aggregate([
  // 1. Converte "Ganhadores 15 acertos" de string para número
  {
    $addFields: {
      ganhadores15: { $toInt: '$Ganhadores 15 acertos' }
    }
  },

  // 2. Filtra concursos com mais de 1 ganhador no prêmio principal
  {
    $match: {
      ganhadores15: { $gt: 1 }
    }
  },

  // 3. Conta o total
  {
    $count: 'totalConcursos'
  }
]);
