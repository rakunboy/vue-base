# Arquitectura de repositorios: Plantilla base + proyectos independientes

Este documento describe una estrategia recomendada para mantener una **plantilla base** versionada en Git y reutilizarla en **proyectos independientes**, permitiendo actualizar la plantilla sin perder la autonomía de cada proyecto.

---

## 🎯 Objetivo

- Mantener un **repositorio central** con la plantilla (UI, componentes, layout)
- Crear **proyectos reales independientes** basados en esa plantilla
- Poder **actualizar la plantilla** en cada proyecto cuando sea necesario
- Evitar acoplar backend o lógica específica a la plantilla

---

## 🧱 Estructura de repositorios

### Repo A — Plantilla Base

Características:

- Contiene **solo frontend / UI / componentes reutilizables**
- No incluye backend
- No incluye lógica de negocio
- Evoluciona con mejoras visuales y estructurales

Ejemplos de contenido:

- Layouts
- Componentes Vue
- Estilos
- Dashboards base
- Helpers visuales

---

### Repo B, C, D… — Proyectos reales

Características:

- Cada proyecto es un **repositorio independiente**
- Parte inicialmente de la plantilla base
- Agrega su propia lógica, backend y configuraciones
- Decide **cuándo** actualizar desde la plantilla

---

## 🔀 Estrategia Git recomendada

Se utiliza el concepto de:

- `origin` → repositorio del **proyecto real**
- `upstream` → repositorio de la **plantilla base**

Esto permite mantener dos fuentes claras:

- El proyecto es dueño de su historia (`origin`)
- La plantilla es una fuente de actualizaciones (`upstream`)

---

## 🚀 Flujo de creación de un nuevo proyecto

### 1️⃣ Clonar la plantilla base

```bash
git clone https://github.com/tu-org/plantilla-base.git mi-proyecto
cd mi-proyecto
```

En este punto el proyecto aún apunta a la plantilla como `origin`.

---

### 2️⃣ Cambiar el `origin` al repositorio del proyecto

```bash
git remote remove origin
git remote add origin https://github.com/tu-org/mi-proyecto.git
```

Resultado:

- `origin` → repositorio del proyecto
- La plantilla **deja de ser el origin**

---

### 3️⃣ Agregar la plantilla como `upstream`

```bash
git remote add upstream https://github.com/tu-org/plantilla-base.git
```

Verificar remotes:

```bash
git remote -v
```

Resultado esperado:

```
origin    https://github.com/tu-org/mi-proyecto.git (fetch/push)
upstream  https://github.com/tu-org/plantilla-base.git (fetch)
```

---

## 🔄 Actualizar la plantilla en un proyecto

Cuando la plantilla base tenga mejoras:

### Opción A — Merge (más simple)

```bash
git fetch upstream
git merge upstream/main
```

### Opción B — Rebase (historial más limpio)

```bash
git fetch upstream
git rebase upstream/main
```

> Nota: si existen cambios en los mismos archivos, Git solicitará resolver conflictos manualmente.

---

## ⚠️ Buenas prácticas

- ❌ No agregar backend a la plantilla
- ❌ No hacer push del proyecto al repo de la plantilla
- ✅ Mantener la plantilla genérica
- ✅ Versionar la plantilla (tags: `v1.0.0`, `v1.1.0`, etc.)
- ✅ Documentar cambios importantes en la plantilla

---

## 🚫 Alternativas no recomendadas

### Dos `origin`

Git no está pensado para manejar dos `origin` principales. Esto suele provocar:

- Confusión al hacer push
- Errores en CI/CD
- Riesgo de sobrescribir repositorios

---

### Submodules

Los submodules solo son recomendables si se requiere aislamiento total, pero:

- Añaden complejidad
- Aumentan fricción para el equipo

Para una plantilla viva y proyectos activos, **no es la mejor opción**.

---

## 🏁 Conclusión

Este enfoque permite:

- Reutilizar una plantilla base viva
- Mantener proyectos independientes
- Actualizar componentes sin romper lógica
- Escalar a múltiples proyectos con consistencia

Es un patrón probado y utilizado en sistemas modernos de plantillas y design systems.
