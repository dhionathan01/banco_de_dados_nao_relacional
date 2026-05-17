/* global use, db */
// Questão 2 — Quais os concursos tivemos em 2021?

use('loto_facil_vscode');

db.loto_facil_raw.aggregate([
  // 1. Converte a string "dd/mm/yyyy" em Date
  {
    $addFields: {
      dataSorteio: {
        $dateFromString: {
          dateString: '$Data Sorteio',
          format: '%d/%m/%Y'
        }
      }
    }
  },

  // 2. Filtra apenas os concursos do ano 2021
  {
    $match: {
      $expr: { $eq: [{ $year: '$dataSorteio' }, 2021] }
    }
  },

  // 3. Ordena pelo número do concurso
  {
    $sort: { Concurso: 1 }
  },

  // 4. Projeta apenas os campos relevantes
  {
    $project: {
      _id: 0,
      concurso: '$Concurso',
      dataSorteio: '$Data Sorteio',
      dezenas: [
        '$Bola1', '$Bola2', '$Bola3', '$Bola4', '$Bola5',
        '$Bola6', '$Bola7', '$Bola8', '$Bola9', '$Bola10',
        '$Bola11', '$Bola12', '$Bola13', '$Bola14', '$Bola15'
      ]
    }
  }
]);
