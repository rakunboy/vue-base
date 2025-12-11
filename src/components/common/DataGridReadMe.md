# 📄 DataGrid --- Componente Vue 3

`DataGrid` es un componente reutilizable para mostrar datos en formato
tabular dentro de un contenedor visual (`CardCustom`).\
Permite generar columnas dinámicamente, aplicar formatters, usar slots
personalizados para celdas y añadir acciones por fila.

Este componente está optimizado para ser simple, flexible y altamente
reutilizable.

------------------------------------------------------------------------

# 📦 Ejemplo de uso

``` ts
const demo: Table = {
  fields: [
    { name: 'id', label: 'ID' },
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ],
  data: [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
    { id: 2, name: 'Ana López', email: 'ana@example.com' },
    { id: 3, name: 'Luis Soto', email: 'luis@example.com' },
  ],
}
```

Uso en la vista:

``` vue
<DataGrid :data="demo" title="Usuarios" />
```

------------------------------------------------------------------------

# 🧩 Props

### `data: Table`

Objeto que contiene la definición de las columnas y los datos.

### `title?: string`

Título opcional que se muestra por defecto en el encabezado.

------------------------------------------------------------------------

# 🗂️ Tipos utilizados

``` ts
export interface Table {
  fields: Field[]
  data: TableData[]
}

export interface Field {
  name: string                       // key del objeto
  label?: string                     // cómo se muestra
  sortable?: boolean                 // reservado para ordenamiento futuro
  class?: string                     // clases CSS
  width?: string                     // ancho (ej: "120px")
  formatter?: (value: any, row: any) => string | number
}

export interface TableData {
  id: number
  name: string
  email: string
}
```

------------------------------------------------------------------------

# 🎨 Renderizado de columnas

El componente renderiza cada columna en base a:

``` ts
{
  name: 'email',
  label: 'Email',
  class: 'text-center',
  width: '180px'
}
```

Si `label` no está definido, se usa el nombre de la propiedad (`name`).

------------------------------------------------------------------------

# ✨ Formatters

Cada columna puede formatearse usando la propiedad `formatter`.

``` ts
{
  name: 'name',
  formatter: (value) => value.toUpperCase()
}
```

------------------------------------------------------------------------

# 🎯 Slots disponibles

El componente expone un conjunto de slots para personalizar diferentes
partes de la tabla.

------------------------------------------------------------------------

## 🔹 `header`

Permite reemplazar el título por defecto.

``` vue
<template #header>
  <h3 class="fw-bold">Listado de usuarios</h3>
</template>
```

------------------------------------------------------------------------

## 🔹 `submenu`

Se muestra en la parte superior derecha, antes de la tabla.

``` vue
<template #submenu>
  <button class="btn btn-primary">Agregar usuario</button>
</template>
```

------------------------------------------------------------------------

## 🔹 Slots dinámicos por celda: `cell-{field}`

Puedes personalizar el contenido de cualquier columna.

Ejemplo para la columna `email`:

``` vue
<template #cell-email="{ value, row }">
  <a :href="`mailto:${value}`">{{ value }}</a>
</template>
```

------------------------------------------------------------------------

## 🔹 `actions`

Si este slot existe, se agrega una columna adicional a la derecha.

``` vue
<template #actions="{ row }">
  <button
    class="btn btn-sm btn-warning me-1"
    @click="edit(row)"
  >
    Editar
  </button>

  <button
    class="btn btn-sm btn-danger"
    @click="remove(row)"
  >
    Eliminar
  </button>
</template>
```

------------------------------------------------------------------------

# 🖼️ Ejemplo completo

``` vue
<DataGrid :data="demo" title="Usuarios">

  <template #submenu>
    <button class="btn btn-success">Nuevo usuario</button>
  </template>

  <template #cell-email="{ value }">
    <strong>{{ value }}</strong>
  </template>

  <template #actions="{ row }">
    <button @click="edit(row)" class="btn btn-sm btn-primary">Editar</button>
  </template>

</DataGrid>
```

------------------------------------------------------------------------

# 🧱 Estilos

``` css
.ta-right {
  text-align: right;
}
```

El diseño principal utiliza Bootstrap 5 (`table-dark`, `table-hover`,
etc.) y `CardCustom`.

------------------------------------------------------------------------

# 📌 Notas finales

-   Es un componente minimalista, pero fácilmente extensible (sorting,
    paginación, filtros, selección de filas, etc.)
-   Pensado para mantener el layout limpio mediante slots
-   Altamente reutilizable en distintos módulos del sistema
