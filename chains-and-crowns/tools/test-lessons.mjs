// Vérifie chaque exercice de l'École avec le vrai moteur : position légale, objectif atteignable, coups acceptés légaux.
// Utilisation : node tools/test-lessons.mjs
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { module: { exports: {} } };
vm.createContext(ctx);
vm.runInContext(readFileSync(join(root, 'js/engine.js'), 'utf8') + '\nthis.Engine = Engine;', ctx);
vm.runInContext(readFileSync(join(root, 'js/lessons.js'), 'utf8'), ctx);
const { Engine } = ctx;
const { LESSONS } = ctx.module.exports;
const School = vm.runInContext(readFileSync(join(root, 'js/school-rules.js'), 'utf8') + '\nSchoolRules;', ctx);

let errors = 0, count = 0;
for (const ch of LESSONS) for (const l of ch.lessons) l.exercises.forEach((ex, i) => {
    count++;
    const label = `${ch.id}/${l.id}#${i + 1}`;
    const { state, goal, task, hint } = School.prepare(ex);
    const fail = (msg) => { errors++; console.log('✗', label, msg); };
    if (Engine.kingSquare(state.board, 'w') < 0 || Engine.kingSquare(state.board, 'b') < 0) return fail('roi manquant');
    if (Engine.inCheck(state, Engine.other(state.turn))) return fail('le camp qui n\'est pas au trait est en échec (position illégale)');
    const legal = Engine.legalMoves(state);
    if (state.turn !== 'b') fail('l\'élève doit mener la Résistance (noirs)');
    if (goal.accept) for (const a of goal.accept) if (!legal.some((m) => School.key(m) === a)) fail(`coup accepté illégal : ${a}`);
    const sols = legal.filter((m) => School.check(state, m, goal).ok);
    if (!sols.length) return fail('aucune solution');
    console.log('✓', label, `${goal.type} → ${sols.map((m) => School.key(m)).join(', ')} | ${task} | ${hint}`);
});
console.log(`\n${count} exercices, ${errors} erreur(s).`);
process.exit(errors ? 1 : 0);
