<template>
  <div class="form-group mb-3">
    <!-- Label -->
    <label v-if="label" :for="id" class="form-label">
      {{ label }}
    </label>

    <!-- COMBOBOX (real Bootstrap select) -->
    <select
      v-if="type === 'combobox'"
      :id="id"
      class="form-select"
      :disabled="disabled"
      :readonly="readonly"
      :value="props.modelValue"
      @change="onNativeChange"
    >
      <option value="" disabled>Seleccione una opción</option>

      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>

    <!-- RADIO (custom rendering) -->
    <div v-else-if="type === 'radio'">
      <div v-for="opt in options" :key="opt.value" class="form-check">
        <input
          class="form-check-input"
          type="radio"
          :name="id"
          :id="`${id}-${opt.value}`"
          :value="opt.value"
          :checked="propsModelEquals(opt.value)"
          @change="onNativeChange"
        />
        <label class="form-check-label" :for="`${id}-${opt.value}`">
          {{ opt.label }}
        </label>
      </div>
    </div>

    <!-- GENERIC: input / textarea / select -->
    <component
      v-else
      :is="resolvedComponent"
      v-bind="inputProps"
      :value="componentValueProp"
      @input="onNativeInput"
      @change="onNativeChange"
    >
      <!-- opciones para select -->
      <template v-if="isSelect" #default>
        <option
          v-for="opt in options"
          :key="opt.value"
          :value="opt.value"
          :selected="isOptionSelected(opt.value)"
        >
          {{ opt.label }}
        </option>
      </template>
    </component>

    <!-- Small helper (opcional) -->
    <small v-if="hint" class="form-text text-muted">{{ hint }}</small>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'multiple'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'range'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'file'
  | 'search'
  | 'time'
  | 'combobox'

/* -------------------------
 * Props & emits
 * ------------------------- */
const props = defineProps<{
  id: string
  type?: FieldType
  label?: string
  placeholder?: string
  modelValue?: any
  disabled?: boolean
  readonly?: boolean
  options?: Array<{ label: string; value: any }>
  hint?: string
  min?: number | string
  max?: number | string
  step?: number | string
}>()

const emit = defineEmits(['update:modelValue', 'input', 'change'])

/* -------------------------
 * Helpers: computed values
 * ------------------------- */
const options = computed(() => props.options ?? [])

const isSelect = computed(() => props.type === 'select' || props.type === 'multiple')

const resolvedComponent = computed(() => {
  switch (props.type) {
    case 'textarea':
      return 'textarea'
    case 'select':
      return 'select'
    case 'multiple':
      return 'select'
    case 'checkbox':
      return 'input'
    case 'switch':
      return 'input'
    case 'range':
      return 'input'
    case 'color':
      return 'input'
    case 'date':
      return 'input'
    case 'datetime-local':
      return 'input'
    case 'file':
      return 'input'
    case 'search':
      return 'input'
    case 'time':
      return 'input'
    default:
      return 'input'
  }
})

/* props for the component/is */
const inputProps = computed(() => {
  const base: any = {
    id: props.id,
    placeholder: props.placeholder,
    disabled: props.disabled,
    readonly: props.readonly,
    class: '',
    min: props.min,
    max: props.max,
    step: props.step,
  }

  switch (props.type) {
    case 'textarea':
      return { ...base, class: 'form-control', rows: 4 }

    case 'select':
      return { ...base, class: 'form-select' }

    case 'multiple':
      return { ...base, class: 'form-select', multiple: true }

    case 'checkbox':
      return { ...base, class: 'form-check-input', type: 'checkbox' }

    case 'switch':
      return { ...base, class: 'form-check-input form-switch', type: 'checkbox' }

    case 'range':
      return { ...base, class: 'form-range', type: 'range' }

    case 'color':
      return { ...base, class: 'form-control form-control-color', type: 'color' }

    case 'date':
      return { ...base, class: 'form-control', type: 'date' }

    case 'datetime-local':
      return { ...base, class: 'form-control', type: 'datetime-local' }

    case 'file':
      return { ...base, class: 'form-control', type: 'file' }

    case 'search':
      return { ...base, class: 'form-control', type: 'search' }

    case 'time':
      return { ...base, class: 'form-control', type: 'time' }

    default:
      return { ...base, class: 'form-control', type: props.type ?? 'text' }
  }
})

/* -------------------------
 * v-model binding helpers
 * ------------------------- */
/* We expose the model through emits. Some input types (file, checkbox, select[multiple])
   require special handling from native events. */
const componentValueProp = computed(() => {
  // For select multiple we don't set `value` prop directly (handled via selected options)
  if (props.type === 'multiple') return undefined
  // For checkbox/switch, value is controlled by checked attribute (not via value)
  if (props.type === 'checkbox' || props.type === 'switch') return undefined
  if (props.type === 'file') return undefined
  // For combobox we use input value separately
  if (props.type === 'combobox') return undefined
  return props.modelValue
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modelForInput = computed(() => {
  // used for combobox input display
  if (props.type === 'combobox') {
    // if the model is an object/value, try to display label if match exists, else value
    const match = options.value.find(
      (o) => o.value === props.modelValue || o.label === props.modelValue,
    )
    return match ? match.label : (props.modelValue ?? '')
  }
  return props.modelValue ?? ''
})

function propsModelEquals(val: any) {
  return props.modelValue === val
}

function isOptionSelected(val: any) {
  if (props.type === 'multiple' && Array.isArray(props.modelValue)) {
    return props.modelValue.indexOf(val) !== -1
  }
  return props.modelValue === val
}

/* -------------------------
 * Native event handlers
 * ------------------------- */
function normalizeEventValue(e: Event) {
  const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  if (!target) return undefined

  if (props.type === 'file') {
    // FileList (may be empty)
    return (target as HTMLInputElement).files
  }

  if (props.type === 'checkbox' || props.type === 'switch') {
    return (target as HTMLInputElement).checked
  }

  if (props.type === 'multiple') {
    const sel = target as HTMLSelectElement
    return Array.from(sel.selectedOptions).map((o) => (o as HTMLOptionElement).value)
  }

  // combobox handled separately (input's value)
  return (target as HTMLInputElement).value
}

function onNativeInput(e: Event) {
  const val = normalizeEventValue(e)
  // For combobox input we want the actual typed string (not mapped value)
  if (props.type === 'combobox') {
    // emit the literal input (string) and also update modelValue with that string
    emitModel(val)
    return
  }
  // For text-like inputs, receive and emit
  if (props.type === 'file') {
    // typically file emits on change, ignore on input if any
    return
  }
  emitModel(val)
}

function onNativeChange(e: Event) {
  const val = normalizeEventValue(e)
  // Files, checkboxes, selects and radio come through change
  emitModel(val)
}

/* wrapper to centralize emits */
function emitModel(val: any) {
  emit('update:modelValue', val)
  emit('input', val)
  emit('change', val)
}
</script>

<style scoped>
/* estilos mínimos opcionales */
.form-control-color {
  height: 2.2rem;
  padding: 0.25rem;
}
</style>
