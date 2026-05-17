
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
    $project: {
      ano: "$_id.ano",
      mes: "$_id.mes",
      totalConcursos: 1
    }
  },

  {
    $sort: {
      ano: 1,
      mes: 1
    }
  },

  {
    $out: "monthly_stats"
  }

])
