// generate_missing_units.js
// This script creates placeholder MDX files for all missing primary education units (UT01‑UT09)
// for grades 1º‑6º in the Primaria Docs‑as‑Code project.

const fs = require('fs');
const path = require('path');

const grades = [1,2,3,4,5,6];
const units = Array.from({length:9}, (_,i) => `UT0${i+1}`);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive:true});
  }
}

function writeMDX(filePath, grade, unit) {
  const content = `---
id: "${grade}_ut${unit}"
title: "Unidad ${unit.slice(-2)} – Contenido provisional"
sidebar_label: "${unit}"
---

# Theory

> *Contenido teórico pendiente.*

## Practice

- Ejercicio 1: descripción.
- Ejercicio 2: descripción.

## Mission

> **Misión:** describir la actividad gamificada.

<img src="/img/grades/${grade}/placeholder.svg" alt="Ilustración de la unidad" />
`;
  fs.writeFileSync(filePath, content, 'utf8');
}

grades.forEach(grade => {
  const gradeDir = path.join('docs', `${grade}pri`);
  units.forEach(unit => {
    const unitDirName = `ut${unit.slice(-2)}-placeholder`;
    const unitDir = path.join(gradeDir, unitDirName);
    ensureDir(unitDir);
    const mdxPath = path.join(unitDir, `${unit}.mdx`);
    if (!fs.existsSync(mdxPath)) {
      writeMDX(mdxPath, grade, unit);
      console.log(`Created ${mdxPath}`);
    }
  });
});

console.log('All missing unit files have been generated.');
