mongoexport --db lotofacil_analytics --collection monthly_stats \
  --type csv --fields "_id,ano,mes,totalConcursos" \
  --out monthly_stats.csv

mongoexport --db lotofacil_analytics --collection winners \
  --type csv --fields "concurso,dataSorteio,ganhadores15,premioEstimado" \
  --out winners.csv

mongoexport --db lotofacil_analytics --collection metrics \
  --type csv --fields "totalConcursos,mediaGanhadores15,maiorPremio" \
  --out metrics.csv
