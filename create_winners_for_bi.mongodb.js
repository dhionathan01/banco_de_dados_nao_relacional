/* global use, db */
// Winners para Power BI — uma linha por localização por concurso
// Permite filtrar por ano e localização no Power BI

use('lotofacil_analytics');

db.concursos_clean.aggregate([

  // 1. Converte ganhadores15 de string para número
  {
    $addFields: {
      ganhadores15Num: { $toInt: '$ganhadores15' }
    }
  },

  // 2. Filtra apenas concursos com mais de 1 ganhador
  {
    $match: {
      ganhadores15Num: { $gt: 1 }
    }
  },

  // 3. Divide cidadeUf ("BA; SP; MG") em array ["BA", "SP", "MG"]
  {
    $addFields: {
      localizacoes: {
        $split: ['$cidadeUf', '; ']
      }
    }
  },

  // 4. Gera uma linha por localização
  {
    $unwind: '$localizacoes'
  },

  // 5. Projeta campos limpos — uma linha = um concurso + uma UF
  {
    $project: {
      _id: 0,
      concurso: 1,
      ano:  { $year:  '$dataSorteio' },
      mes:  { $month: '$dataSorteio' },
      dataSorteio: {
        $dateToString: { format: '%Y-%m-%d', date: '$dataSorteio' }
      },
      uf: '$localizacoes',
      ganhadores15: '$ganhadores15Num',
      premioEstimado: 1
    }
  },

  // 6. Ordena por ano e concurso
  {
    $sort: { ano: 1, concurso: 1 }
  },

  {
    $out: 'winners_powerBI'
  }

]);
