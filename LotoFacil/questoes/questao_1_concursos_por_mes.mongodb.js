/* global use, db */
// Questão 1 — Quantos concursos tivemos por mês?

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

  // 2. Agrupa por ano + mês e conta os concursos
  {
    $group: {
      _id: {
        ano: { $year: '$dataSorteio' },
        mes: { $month: '$dataSorteio' }
      },
      totalConcursos: { $sum: 1 }
    }
  },

  // 3. Ordena cronologicamente
  {
    $sort: {
      '_id.ano': 1,
      '_id.mes': 1
    }
  },

  // 4. Formata o resultado
  {
    $project: {
      _id: 0,
      anoMes: {
        $concat: [
          { $toString: '$_id.ano' },
          '-',
          {
            $cond: {
              if: { $lt: ['$_id.mes', 10] },
              then: { $concat: ['0', { $toString: '$_id.mes' }] },
              else: { $toString: '$_id.mes' }
            }
          }
        ]
      },
      totalConcursos: 1
    }
  }
]);
