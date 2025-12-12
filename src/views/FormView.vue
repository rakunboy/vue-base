<template>
  <!-- <ToastMessage ref="toastRef" /> -->
  <div class="p-4 w-100">
    <h2 class="mb-4">Forms</h2>
  </div>

  <CardCustom>
    <form class="needs-validation">
      <FormField id="text1" label="Mi campo" v-model="form.texto" />
      <FormField id="text2" label="Color" type="color" v-model="form.color" />
      <FormField id="text3" label="Date" type="date" v-model="form.fecha" />
      <FormField id="text4" label="Date Time" type="datetime-local" v-model="form.fechaCompleta" />
      <FormField id="text5" label="Email" type="email" v-model="form.correo" />
      <!-- <FormField id="text6" label="File" type="file" /> -->
      <FormField id="text7" label="Número" type="number" v-model="form.numero" />
      <FormField id="text8" label="Contraseña" type="password" />
      <FormField id="terms" label="Acepto términos" type="checkbox" v-model="form.terms" />
      <FormField
        id="sexo"
        type="radio"
        :options="[
          { label: 'M', value: 'M' },
          { label: 'F', value: 'F' },
        ]"
        v-model="form.sexo"
      />
      <FormField id="text11" label="Rango" type="range" v-model="form.rango" />
      <FormField id="text12" label="Búsqueda" type="search" v-model="form.busqueda" />
      <FormField id="text13" label="Hora" type="time" v-model="form.hora" />
      <FormField id="text14" label="Text Area" type="textarea" v-model="form.textoLargo" />
      <FormField
        id="pais"
        label="País"
        type="combobox"
        :options="[
          { label: 'México', value: 'MX' },
          { label: 'España', value: 'ES' },
        ]"
        v-model="form.pais"
      />
      <FormField id="text17" label="Switch" type="switch" />
      <!-- <FormField
        id="value"
        label="País"
        type="multiple"
        :options="[
          { label: 'México', value: 'MX' },
          { label: 'España', value: 'ES' },
        ]"
        v-model="form.roles"
      /> -->
      <button class="btn btn-primary btn-sm me-2" @click.prevent="send">Enviar</button>
    </form>
  </CardCustom>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardCustom from '@/components/common/CardCustom.vue'
import FormField from '@/components/common/FormField.vue'
import { useToast } from '@/plugins/toast-plugin'

const form = ref({
  texto: '',
  color: '',
  fecha: new Date(),
  fechaCompleta: new Date(),
  correo: '',
  numero: 0,
  sexo: 'M',
  rango: 0,
  busqueda: 'asdasd',
  hora: '',
  textoLargo: '',
  pais: '',
  roles: [],
  terms: false,
})

const toast = useToast()

const send = () => {
  // const id =
  toast.showToast({
    message: 'Guardado exitosamente',
    variant: 'success',
    duration: 3000,
    // actions: [{ label: 'Deshacer', onClick: (t) => console.log(t.id) }],
  })

  // toast.showToast({
  //   message: 'Hola desde cualquier lado!',
  //   variant: 'success',
  // })
  console.log(form.value)
}
</script>
