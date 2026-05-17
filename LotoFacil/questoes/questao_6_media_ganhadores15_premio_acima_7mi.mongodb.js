/* global use, db */
// Questão 6 — Qual a média de ganhadores com 15 pontos que foram premiados
//              em concursos com mais de 7 milhões de prêmio principal?

use('loto_facil_vscode');

db.loto_facil_raw.aggregate([
  // 1. Converte os campos de string para número
  {
    $addFields: {
      ganhadores15: { $toInt: '$Ganhadores 15 acertos' },
      // Remove "R$", pontos de milhar e troca vírgula por ponto
      rateio15Num: {
        $toDouble: {
          $replaceAll: {
            input: {
              $replaceAll: {
                input: {
                  $replaceAll: {
                    input: '$Rateio 15 acertos',
                    find: 'R$',
                    replacement: ''
                  }
                },
                find: '.',
                replacement: ''
              }
            },
            find: ',',
            replacement: '.'
          }
        }
      }
    }
  },

  // 2. Filtra apenas concursos com prêmio principal > 7.000.000
  {
    $match: {
      rateio15Num: { $gt: 7000000 }
    }
  },

  // 3. Calcula a média de ganhadores com 15 acertos
  {
    $group: {
      _id: null,
      mediaGanhadores15: { $avg: '$ganhadores15' },
      totalConcursos: { $sum: 1 }
    }
  },

  // 4. Formata o resultado
  {
    $project: {
      _id: 0,
      mediaGanhadores15: { $round: ['$mediaGanhadores15', 2] },
      totalConcursos: 1
    }
  }
]);
