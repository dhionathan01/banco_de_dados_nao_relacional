/* global use, db */
// Questão 5 — Qual a média de ganhadores com 14, 13, 12 e 11 pontos?

use('loto_facil_vscode');

db.loto_facil_raw.aggregate([
  // 1. Converte os campos de string para número
  {
    $addFields: {
      ganhadores14: { $toInt: '$Ganhadores 14 acertos' },
      ganhadores13: { $toInt: '$Ganhadores 13 acertos' },
      ganhadores12: { $toInt: '$Ganhadores 12 acertos' },
      ganhadores11: { $toInt: '$Ganhadores 11 acertos' }
    }
  },

  // 2. Calcula a média de cada faixa sobre todos os concursos
  {
    $group: {
      _id: null,
      media14acertos: { $avg: '$ganhadores14' },
      media13acertos: { $avg: '$ganhadores13' },
      media12acertos: { $avg: '$ganhadores12' },
      media11acertos: { $avg: '$ganhadores11' }
    }
  },

  // 3. Formata o resultado com 2 casas decimais
  {
    $project: {
      _id: 0,
      media14acertos: { $round: ['$media14acertos', 2] },
      media13acertos: { $round: ['$media13acertos', 2] },
      media12acertos: { $round: ['$media12acertos', 2] },
      media11acertos: { $round: ['$media11acertos', 2] }
    }
  }
]);
