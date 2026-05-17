/* global use, db */
// MongoDB Playground
// Cria a database "loto_facil_raw_vs_code" e importa os dados do CSV Lotofácil

const fs   = require('fs');

// ── Configurações ──────────────────────────────────────────────────────────
const DATABASE   = 'lotofacil_raw';
const COLLECTION = 'concursos';

// Caminho absoluto para o CSV — ajuste se mover o repositório.
const CSV_PATH = 'c:\\Users\\dhion_26s925f\\Documents\\git\\banco_de_dados_nao_relacional\\LotoFacil\\database\\Lotofácil.csv';

// ── Seleciona / cria o banco ───────────────────────────────────────────────
use(DATABASE);
db.getCollection(COLLECTION).drop();

// ── Parser CSV (separador ";", suporta campos com aspas duplas) ────────────
function parseCSVLine(line) {
  const fields = [];
  let cur      = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ';' && !inQuotes) {
      fields.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  fields.push(cur.trim());
  return fields;
}

function parseCSV(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove BOM (UTF-8 with BOM)
  content = content.replace(/^\uFEFF/, '');
  const lines   = content.replace(/\r/g, '').split('\n').filter(l => l.trim() !== '');
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map(line => {
    const vals = parseCSVLine(line);
    const doc  = {};
    headers.forEach((h, i) => {
      doc[h] = (vals[i] !== undefined && vals[i] !== '') ? vals[i] : null;
    });
    return doc;
  });
}

// ── Importação ─────────────────────────────────────────────────────────────
const documents = parseCSV(CSV_PATH);
const result    = db.getCollection(COLLECTION).insertMany(documents);

console.log(
  `Importados ${Object.keys(result.insertedIds).length} documentos` +
  ` em "${DATABASE}.${COLLECTION}"`
);
