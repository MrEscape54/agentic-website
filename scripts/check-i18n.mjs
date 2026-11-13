import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

function messageKey(source) {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index++) hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  return `m${(hash >>> 0).toString(16)}`;
}
const catalogs = Object.fromEntries(['en', 'es', 'pt'].map(locale => [locale, JSON.parse(fs.readFileSync(`messages/${locale}.json`, 'utf8'))]));
function leaves(value, prefix = '') {
  return Object.entries(value).flatMap(([key, child]) => typeof child === 'string' ? [[`${prefix}${key}`, child]] : leaves(child, `${prefix}${key}.`));
}
const english = leaves(catalogs.en);
for (const locale of ['es', 'pt']) {
  const translated = leaves(catalogs[locale]);
  assert.deepEqual(translated.map(([key]) => key).sort(), english.map(([key]) => key).sort(), `Catalog keys differ: ${locale}`);
  for (const [key, value] of translated) assert(value.trim(), `${locale}: empty translation ${key}`);
}
for (const [key, source] of Object.entries(catalogs.en.copy)) assert.equal(key, messageKey(source), `Incorrect source key for ${source}`);

const missing = new Map();
for (const relative of fs.readdirSync('src', {recursive: true}).filter(file => file.endsWith('.tsx'))) {
  const file = `src/${relative}`;
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes('@/i18n/useText')) continue;
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isCallExpression(node) && node.expression.getText(source) === 't' && node.arguments.length === 1 && ts.isStringLiteral(node.arguments[0])) {
      const copy = node.arguments[0].text.trim().replace(/\s+/g, ' ');
      if (copy && !catalogs.en.copy[messageKey(copy)]) missing.set(copy, {file, key: messageKey(copy)});
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
if (missing.size) {
  console.error('Add these entries to all three copy catalogs:', Object.fromEntries(missing));
  process.exitCode = 1;
} else console.log(`Validated ${Object.keys(catalogs.en.copy).length} source-copy keys, three catalogs and literal translation references.`);
