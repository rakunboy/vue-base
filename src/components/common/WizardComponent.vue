<template>
  <div class="wizard-container bg-dark text-light p-4 rounded">

    <!-- Stepper -->
    <div class="wizard-steps d-flex justify-content-between mb-4">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="wizard-step"
        :class="{
          active: index === currentStep,
          done: index < currentStep
        }"
      >
        <div class="step-circle">
          <i v-if="index < currentStep" class="bi bi-check"></i>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <small class="step-label">{{ step.title }}</small>
      </div>
    </div>

    <!-- ERROR -->
    <div
      v-if="errorMessage"
      class="alert alert-danger py-2 mb-3"
    >
      <i class="bi bi-exclamation-circle me-2"></i>
      {{ errorMessage }}
    </div>

    <!-- Content -->
    <div class="wizard-content mb-4">
      <slot :step="currentStep"></slot>
    </div>

    <!-- Actions -->
    <div class="d-flex justify-content-between">
      <button
        class="btn btn-outline-secondary"
        :disabled="currentStep === 0"
        @click="prev"
      >
        Anterior
      </button>

      <button
        v-if="!isLastStep"
        class="btn btn-primary"
        @click="next"
      >
        Siguiente
      </button>

      <button
        v-else
        class="btn btn-success"
        @click="finish"
      >
        Finalizar
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface WizardStep {
  title: string
  validate?: () => boolean
  errorMessage?: string
}

const props = defineProps<{
  steps: WizardStep[]
}>()

const emit = defineEmits<{
  (e: 'finish'): void
}>()

const currentStep = ref(0)
const errorMessage = ref<string | null>(null)

const isLastStep = computed(
  () => currentStep.value === props.steps.length - 1
)

function next() {
  const step = props.steps[currentStep.value]
  if (!step) return

  if (step.validate && !step.validate()) {
    errorMessage.value =
      step.errorMessage ?? 'Completa los datos requeridos'
    return
  }

  errorMessage.value = null
  currentStep.value++
}

function prev() {
  errorMessage.value = null
  currentStep.value--
}

function finish() {
  errorMessage.value = null
  emit('finish')
}

defineExpose({
  next,
  prev,
  currentStep
})
</script>

<style scoped>
.wizard-steps {
  position: relative;
}

.wizard-step {
  text-align: center;
  flex: 1;
  position: relative;
}

.step-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #343a40;
  border: 2px solid #6c757d;
  margin: 0 auto 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wizard-step.active .step-circle {
  border-color: #0d6efd;
  background: #0d6efd;
}

.wizard-step.done .step-circle {
  background: #198754;
  border-color: #198754;
}

.step-label {
  font-size: 0.75rem;
  color: #adb5bd;
}

.wizard-step.active .step-label {
  color: #fff;
}
</style>
