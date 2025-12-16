<template>
  <div class="p-3">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import type { CalendarOptions, EventInput } from '@fullcalendar/core'

/* ---------------------------
   Eventos locales
---------------------------- */
const events = ref<EventInput[]>([
  {
    id: '1',
    title: 'Reunión',
    start: '2025-12-15T10:00:00',
    end: '2025-12-15T11:00:00',
    backgroundColor: '#0d6efd'
  },
  {
    id: '2',
    title: 'Evento personal',
    start: '2025-12-17',
    allDay: true,
    backgroundColor: '#198754'
  }
])

/* ---------------------------
   Opciones del calendario
---------------------------- */
const calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',

  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },

  editable: true,
  selectable: true,
  events: events.value,

  eventDrop(info) {
    console.log('Movido:', info.event.id, info.event.start)
  },

  eventResize(info) {
    console.log('Redimensionado:', info.event.id)
  },

  eventClick(info) {
    console.log('Click:', info.event.title)
  }
}
</script>

<style>
/* Opcional: mejora visual con Bootstrap */
.fc {
  background-color: #fff;
}
</style>
