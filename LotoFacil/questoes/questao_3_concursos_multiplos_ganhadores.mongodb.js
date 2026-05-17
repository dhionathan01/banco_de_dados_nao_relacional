/* global use, db */
// Questão 3 — Quais os concursos que pagaram o prêmio principal para mais de um ganhador?

use('loto_facil_vscode');

db.loto_facil_raw.aggregate([
  // 1. Converte o campo "Ganhadores 15 acertos" de string para número
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

  // 3. Ordena pelo número do concurso
  {
    $sort: { Concurso: 1 }
  },

  // 4. Projeta os campos relevantes
  {
    $project: {
      _id: 0,
      concurso: '$Concurso',
      dataSorteio: '$Data Sorteio',
      ganhadores15: 1,
      cidadeUF: '$Cidade / UF',
      rateio15: '$Rateio 15 acertos'
    }
  }
]);
