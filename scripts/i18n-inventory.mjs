import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Inventory source copy without changing execution identifiers or data structures.
const seen = new Set();
const strings = new Set();
export function visitFile(file) {
  if (seen.has(file) || !fs.existsSync(file)) return;
  seen.add(file);
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const name = node.moduleSpecifier.text;
      if (name.startsWith('.') || name.startsWith('@/')) {
        const base = name.startsWith('@/') ? path.resolve('src', name.slice(2)) : path.resolve(path.dirname(file), name);
        for (const ext of ['.tsx', '.ts']) if (fs.existsSync(base + ext)) visitFile(base + ext);
      }
    }
    if (ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, ' ').trim();
      if (/[a-zA-Z]/.test(value)) strings.add(value);
    }
    if (ts.isStringLiteral(node) && /[A-Z]|\s[a-z]/.test(node.text) && !/^(?:@|\.|\/|#|\[)/.test(node.text)) {
      strings.add(node.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
for (const file of ['src/app/page.tsx', 'src/app/platform/page.tsx', 'src/app/enterprise/page.tsx', 'src/app/layout.tsx']) visitFile(path.resolve(file));
fs.writeFileSync('i18n-inventory.json', JSON.stringify({ files: [...seen].map(file => path.relative('.', file).replaceAll('\\', '/')), strings: [...strings] }, null, 2) + '\n');
console.log(`${seen.size} files, ${strings.size} source strings`);
