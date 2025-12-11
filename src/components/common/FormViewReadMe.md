# FormField (Vue 3 + TypeScript + Bootstrap 5)

Un componente de formulario altamente reutilizable que unifica
**inputs**, **selects**, **checkboxes**, **radios**, **switch**,
**range**, **color pickers**, **date/time**, **file inputs**,
**search**, **textarea**, **combobox**, y más.

Compatible con: - `v-model` - Tipos nativos de inputs HTML5 - Selects
simples y múltiples - Opciones para radio, checkbox, combobox y select -
Bootstrap 5 (estilos automáticos)

------------------------------------------------------------------------

## 🚀 Instalación

Coloca el componente en tu proyecto:

    src/components/FormField.vue

Asegúrate de tener Bootstrap 5 instalado en tu proyecto Vue.

------------------------------------------------------------------------

## ✅ Uso básico

### Input de texto

``` vue
<FormField id="nombre" label="Nombre" v-model="form.nombre" />
```

### Textarea

``` vue
<FormField id="descripcion" type="textarea" label="Descripción" v-model="form.descripcion" />
```

### Select

``` vue
<FormField
  id="pais"
  type="select"
  label="País"
  :options="[
    { label: 'México', value: 'MX' },
    { label: 'España', value: 'ES' },
  ]"
  v-model="form.pais"
/>
```

### Select múltiple

``` vue
<FormField
  id="frutas"
  type="multiple"
  label="Frutas favoritas"
  :options="[
    { label: 'Manzana', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]"
  v-model="form.frutas"
/>
```

### Combobox (select puro de Bootstrap)

``` vue
<FormField
  id="ciudad"
  type="combobox"
  label="Ciudad"
  :options="[
    { label: 'CDMX', value: 'cdmx' },
    { label: 'Madrid', value: 'madrid' },
  ]"
  v-model="form.ciudad"
/>
```

### Checkbox

``` vue
<FormField
  id="activo"
  type="checkbox"
  label="¿Activo?"
  v-model="form.activo"
/>
```

### Radios

``` vue
<FormField
  id="genero"
  type="radio"
  label="Género"
  :options="[
    { label: 'Hombre', value: 'H' },
    { label: 'Mujer', value: 'M' },
  ]"
  v-model="form.genero"
/>
```

### Switch

``` vue
<FormField id="notificaciones" type="switch" label="Notificaciones" v-model="form.notificaciones" />
```

### Range

``` vue
<FormField id="nivel" type="range" min="0" max="10" step="1" v-model="form.nivel" />
```

### Color picker

``` vue
<FormField id="color" type="color" v-model="form.color" />
```

### Date / Time

``` vue
<FormField id="fecha" type="date" v-model="form.fecha" />
<FormField id="hora" type="time" v-model="form.hora" />
<FormField id="fechaHora" type="datetime-local" v-model="form.fechaHora" />
```

### File input

``` vue
<FormField id="archivo" type="file" v-model="form.archivo" />
```

### Search

``` vue
<FormField id="buscar" type="search" placeholder="Buscar..." v-model="form.buscar" />
```

------------------------------------------------------------------------

## 📌 Props

  -------------------------------------------------------------------------
  Prop             Tipo                                      Descripción
  ---------------- ----------------------------------------- --------------
  `id`             `string`                                  ID único del
                                                             campo

  `label`          `string`                                  Texto de la
                                                             etiqueta

  `type`           `FieldType`                               Tipo de input

  `placeholder`    `string`                                  Placeholder

  `modelValue`     `any`                                     Valor para
                                                             usar con
                                                             `v-model`

  `options`        `{ label, value }[]`                      Opciones para
                                                             select, radio,
                                                             combobox

  `disabled`       `boolean`                                 Deshabilitar

  `readonly`       `boolean`                                 Solo lectura

  `min/max/step`   `number|string`                           Para rangos
                                                             numéricos

  `hint`           `string`                                  Texto pequeño
                                                             debajo del
                                                             campo
  -------------------------------------------------------------------------

------------------------------------------------------------------------

## 📤 Eventos emitidos

El componente emite:

-   `update:modelValue`
-   `input`
-   `change`

Por lo que funciona perfectamente con:

``` vue
v-model="variable"
```

------------------------------------------------------------------------

## 🧩 Tipos soportados

    text
    number
    email
    password
    textarea
    select
    multiple
    checkbox
    radio
    switch
    range
    color
    date
    datetime-local
    file
    search
    time
    combobox

------------------------------------------------------------------------

## 🧱 Estructura interna del componente

El componente: - Resuelve dinámicamente qué etiqueta HTML usar. - Maneja
casos especiales (checkbox, radio, file, select múltiple). - Normaliza
el valor antes de emitirlo. - Integra clases Bootstrap
automáticamente. - Se puede extender fácilmente para agregar más tipos.

------------------------------------------------------------------------

## 📘 Licencia

Libre para uso personal y comercial.

------------------------------------------------------------------------

Si necesitas que genere una **versión extendida**, **documentación
técnica**, o **ejemplos avanzados**, ¡solo dímelo!
