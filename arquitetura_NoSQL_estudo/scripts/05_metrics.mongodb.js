
/* global use, db */
// 05 — Calcula KPIs gerais e materializa em metrics

use('lotofacil_analytics');

db.concursos_clean.aggregate([

  {
    $group: {

      _id: null,

      totalConcursos: {
        $sum: 1
      },

      mediaGanhadores15: {
        $avg: "$ganhadores15"
      },

      mediaGanhadores14: {
        $avg: "$ganhadores14"
      },

      mediaGanhadores13: {
        $avg: "$ganhadores13"
      },

      mediaGanhadores12: {
        $avg: "$ganhadores12"
      },

      mediaGanhadores11: {
        $avg: "$ganhadores11"
      },

      maiorPremio: {
        $max: "$premioEstimado"
      }

    }
  },

  {
    $project: {

      _id: 0,

      totalConcursos: 1,

      mediaGanhadores15: 1,
      mediaGanhadores14: 1,
      mediaGanhadores13: 1,
      mediaGanhadores12: 1,
      mediaGanhadores11: 1,

      maiorPremio: 1
    }
  },

  {
    $out: "metrics"
  }

])
