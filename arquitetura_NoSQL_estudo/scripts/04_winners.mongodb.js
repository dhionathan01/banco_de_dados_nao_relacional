
/* global use, db */
// 04 — Filtra concursos com múltiplos ganhadores e materializa em winners

use('lotofacil_analytics');

db.concursos_clean.aggregate([

  {
    $match: {
      ganhadores15: {
        $gt: 1
      }
    }
  },

  {
    $project: {
      concurso: 1,
      dataSorteio: 1,
      ganhadores15: 1,
      premioEstimado: 1
    }
  },

  {
    $sort: {
      ganhadores15: -1
    }
  },

  {
    $out: "winners"
  }

])
