
/* global use, db */
// 06 — KPIs de concursos com prêmio > 7 milhões e materializa em high_prize_metrics

use('lotofacil_analytics');

db.concursos_clean.aggregate([

  {
    $match: {
      premioEstimado: {
        $gt: 7000000
      }
    }
  },

  {
    $group: {

      _id: null,

      mediaGanhadores15: {
        $avg: "$ganhadores15"
      },

      totalConcursos: {
        $sum: 1
      }

    }
  },

  {
    $project: {
      _id: 0,
      mediaGanhadores15: 1,
      totalConcursos: 1
    }
  },

  {
    $out: "high_prize_metrics"
  }

])
