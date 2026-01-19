<template>
  <button
    ref="buttonRef"
    type="button"
    class="btn"
    :class="[
      `btn-${variant}`,
      `btn-${size}`,
      { disabled }
    ]"
    :disabled="disabled"
    @mouseenter="onHoverIn"
    @mouseleave="onHoverOut"
    @click="onClick"
  >
    <BootstrapIcon
      v-if="icon"
      :icon="icon"
      :size="iconSize"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import BootstrapIcon from './BootstrapIcon.vue'


type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  icon?: string
  iconSize?: number
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'sm',
  iconSize: 20,
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)

/* ===============================
   Animaciones
================================ */

onMounted(() => {
  if (!buttonRef.value) return

  gsap.set(buttonRef.value, {
    scale: 1,
    transformOrigin: 'center'
  })
})

const onHoverIn = () => {
  if (!buttonRef.value || props.disabled) return

  gsap.to(buttonRef.value, {
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out'
  })
}

const onHoverOut = () => {
  if (!buttonRef.value || props.disabled) return

  gsap.to(buttonRef.value, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out'
  })
}

const onClick = (event: MouseEvent) => {
  if (props.disabled || !buttonRef.value) return

  gsap.fromTo(
    buttonRef.value,
    { scale: 0.95 },
    {
      scale: 1,
      duration: 0.15,
      ease: 'power2.out'
    }
  )

  emit('click', event)
}
</script>
