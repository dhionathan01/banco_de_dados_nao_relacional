
/* global use, db */
// 02 — Transforma a RAW layer e materializa a CLEAN layer

use('lotofacil_raw');

db.concursos.aggregate([

  {
    $addFields: {

      dataSorteio: {
        $dateFromString: {
          dateString: "$Data Sorteio",
          format: "%d/%m/%Y",
          onError: null,
          onNull: null
        }
      },

      premioEstimado: {
        $toDouble: {
          $replaceAll: {
            input: {
              $replaceAll: {
                input: {
                  $replaceAll: {
                    input: "$Estimativa Prêmio",
                    find: "R$",
                    replacement: ""
                  }
                },
                find: ".",
                replacement: ""
              }
            },
            find: ",",
            replacement: "."
          }
        }
      }

    }
  },

  {
    $project: {

      concurso: "$Concurso",

      dataSorteio: 1,

      dezenas: [
        "$Bola1",
        "$Bola2",
        "$Bola3",
        "$Bola4",
        "$Bola5",
        "$Bola6",
        "$Bola7",
        "$Bola8",
        "$Bola9",
        "$Bola10",
        "$Bola11",
        "$Bola12",
        "$Bola13",
        "$Bola14",
        "$Bola15"
      ],

      ganhadores15: "$Ganhadores 15 acertos",
      ganhadores14: "$Ganhadores 14 acertos",
      ganhadores13: "$Ganhadores 13 acertos",
      ganhadores12: "$Ganhadores 12 acertos",
      ganhadores11: "$Ganhadores 11 acertos",

      premioEstimado: 1,

      cidadeUf: "$Cidade / UF"
    }
  },

  {
    $out: {
      db: "lotofacil_analytics",
      coll: "concursos_clean"
    }
  }

])
