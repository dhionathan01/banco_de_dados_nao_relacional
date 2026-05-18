
/* global use, db */
// 03 — Agrega concursos por mês e materializa em monthly_stats

use('lotofacil_analytics');

db.concursos_clean.aggregate([

  {
    $group: {
      _id: {
        ano: {
          $year: "$dataSorteio"
        },
        mes: {
          $month: "$dataSorteio"
        }
      },

      totalConcursos: {
        $sum: 1
      }
    }
  },

  {
    $sort: {
      '_id.ano': 1,
      '_id.mes': 1
    }
  },

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
  },

  {
    $out: "monthly_stats_powerBI"
  }

])
