/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('LotoFácil');

// Insert a few documents into the sales collection.
db.loto_facil_raw.aggregate([
  {
    $addFields: {
      dataSorteio: {
        $dateFromString: {
          dateString: "$Data Sorteio",
          format: "%d/%m/%Y"
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
      _id: 1,
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
      premioEstimado: 1
    }
  },
  {
    $out: "lotofacil_clean"
  }
])
