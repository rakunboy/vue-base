<template>
  <div class="fs-browser bg-dark text-light rounded p-3">

    <!-- Toolbar -->
    <div class="d-flex align-items-center justify-content-between mb-3">
      <div class="btn-group">
        <button class="btn btn-outline-secondary btn-sm" @click="goBack" :disabled="!canBack">
          <i class="bi bi-arrow-left"></i>
        </button>
        <button class="btn btn-outline-secondary btn-sm" @click="goForward" :disabled="!canForward">
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>

      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" @click="createFolder">
          <i class="bi bi-folder-plus"></i>
        </button>
        <button class="btn btn-outline-secondary btn-sm" @click="createFile">
          <i class="bi bi-file-earmark-plus"></i>
        </button>

        <div class="btn-group">
          <button
            class="btn btn-outline-secondary btn-sm"
            :class="{ active: view === 'grid' }"
            @click="view = 'grid'"
          >
            <i class="bi bi-grid"></i>
          </button>
          <button
            class="btn btn-outline-secondary btn-sm"
            :class="{ active: view === 'list' }"
            @click="view = 'list'"
          >
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <nav class="breadcrumb mb-3">
      <span
        v-for="(b, i) in breadcrumb"
        :key="b.id ?? 'root'"
        class="breadcrumb-item"
        :class="{ clickable: i < breadcrumb.length - 1 }"
        @click="navigateTo(b.id)"
      >
        {{ b.name }}
      </span>
    </nav>

    <!-- GRID VIEW -->
    <div v-if="view === 'grid'" class="fs-grid">
      <div
        v-for="item in currentItems"
        :key="item.id"
        class="fs-item"
        :class="{ selected: selectedIds.has(item.id) }"
        draggable
        @dblclick="open(item)"
        @click="select(item, $event)"
        @contextmenu.prevent="openContext($event, item)"
      >
        <i :class="itemIcon(item)" class="fs-icon"></i>

        <input
          v-if="renamingId === item.id"
          ref="renameInput"
          v-model="renameValue"
          class="form-control form-control-sm text-center"
          @blur="confirmRename"
          @keydown.enter="confirmRename"
        />

        <div v-else class="fs-name">
          {{ item.name }}
        </div>

        <i
          class="bi bi-star-fill favorite"
          v-if="favorites.has(item.id)"
        ></i>
      </div>
    </div>

    <!-- LIST VIEW -->
    <table v-else class="table table-dark table-hover">
      <tbody>
        <tr
          v-for="item in currentItems"
          :key="item.id"
          :class="{ 'table-active': selectedIds.has(item.id) }"
          @dblclick="open(item)"
          @click="select(item, $event)"
          @contextmenu.prevent="openContext($event, item)"
        >
          <td width="32">
            <i :class="itemIcon(item)"></i>
          </td>
          <td>
            <input
              v-if="renamingId === item.id"
              ref="renameInput"
              v-model="renameValue"
              class="form-control form-control-sm"
              @blur="confirmRename"
              @keydown.enter="confirmRename"
            />
            <span v-else>{{ item.name }}</span>
          </td>
          <td width="40">
            <i
              v-if="favorites.has(item.id)"
              class="bi bi-star-fill text-warning"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- CONTEXT MENU -->
    <div
      v-if="context.visible"
      class="context-menu"
      :style="{ top: context.y + 'px', left: context.x + 'px' }"
    >
      <div class="ctx-item" @click="rename(context.item)">Renombrar</div>
      <div class="ctx-item" @click="toggleFavorite(context.item)">
        {{ favorites.has(context.item.id) ? 'Quitar de favoritos' : 'Agregar a favoritos' }}
      </div>
      <div class="ctx-item danger" @click="remove(context.item)">Eliminar</div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

export interface FileItem {
  id: number
  name: string
  type: 'file' | 'folder'
  parentId: number | null
}

const props = defineProps<{ items: FileItem[] }>()

const items = ref([...props.items])
const currentFolder = ref<number | null>(null)
const history = ref<(number | null)[]>([null])
const historyIndex = ref(0)

const view = ref<'grid' | 'list'>('grid')
const favorites = ref(new Set<number>())
const selectedIds = ref(new Set<number>())

const renamingId = ref<number | null>(null)
const renameValue = ref('')
const renameInput = ref<HTMLInputElement | null>(null)

const context = ref({
  visible: false,
  x: 0,
  y: 0,
  item: null as FileItem | null
})

const currentItems = computed(() =>
  items.value.filter(i => i.parentId === currentFolder.value)
)

const breadcrumb = computed(() => {
  const path: FileItem[] = []
  let id = currentFolder.value
  while (id !== null) {
    const item = items.value.find(i => i.id === id)
    if (!item) break
    path.unshift(item)
    id = item.parentId
  }
  return [{ id: null, name: 'Inicio' }, ...path]
})

const canBack = computed(() => historyIndex.value > 0)
const canForward = computed(() => historyIndex.value < history.value.length - 1)

function open(item: FileItem) {
  if (item.type === 'folder') navigate(item.id)
}

function navigate(id: number | null) {
  currentFolder.value = id
  history.value = history.value.slice(0, historyIndex.value + 1)
  history.value.push(id)
  historyIndex.value++
}

function navigateTo(id: number | null) {
  currentFolder.value = id
}

function goBack() {
  if (!canBack.value) return
  historyIndex.value--
  currentFolder.value = history.value[historyIndex.value]
}

function goForward() {
  if (!canForward.value) return
  historyIndex.value++
  currentFolder.value = history.value[historyIndex.value]
}

function itemIcon(item: FileItem) {
  return item.type === 'folder'
    ? 'bi bi-folder-fill text-warning'
    : 'bi bi-file-earmark-text'
}

function select(item: FileItem, e: MouseEvent) {
  if (e.ctrlKey || e.metaKey) {
    selectedIds.value.has(item.id)
      ? selectedIds.value.delete(item.id)
      : selectedIds.value.add(item.id)
  } else {
    selectedIds.value.clear()
    selectedIds.value.add(item.id)
  }
}

function createFolder() {
  items.value.push({
    id: Date.now(),
    name: 'Nueva carpeta',
    type: 'folder',
    parentId: currentFolder.value
  })
}

function createFile() {
  items.value.push({
    id: Date.now(),
    name: 'Nuevo archivo.txt',
    type: 'file',
    parentId: currentFolder.value
  })
}

function rename(item: FileItem) {
  context.value.visible = false
  renamingId.value = item.id
  renameValue.value = item.name
  nextTick(() => {
    renameInput.value?.focus()
    renameInput.value?.select()
  })
}

function confirmRename() {
  const item = items.value.find(i => i.id === renamingId.value)
  if (item) item.name = renameValue.value
  renamingId.value = null
}

function remove(item: FileItem) {
  items.value = items.value.filter(i => i.id !== item.id)
  context.value.visible = false
}

function toggleFavorite(item: FileItem) {
  favorites.value.has(item.id)
    ? favorites.value.delete(item.id)
    : favorites.value.add(item.id)
  context.value.visible = false
}

function openContext(e: MouseEvent, item: FileItem) {
  context.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    item
  }
}

function closeContext() {
  context.value.visible = false
}

onMounted(() => window.addEventListener('click', closeContext))
onBeforeUnmount(() => window.removeEventListener('click', closeContext))
</script>

<style scoped>
.fs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  gap: 1rem;
}

.fs-item {
  text-align: center;
  padding: 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
}

.fs-item:hover {
  background: rgba(255,255,255,0.05);
}

.fs-item.selected {
  background: rgba(13,110,253,0.25);
}

.fs-icon {
  font-size: 2.5rem;
}

.fs-name {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  word-break: break-word;
}

.favorite {
  position: absolute;
  top: 6px;
  right: 8px;
  color: #ffc107;
}

.breadcrumb {
  cursor: default;
}

.breadcrumb-item.clickable {
  cursor: pointer;
  color: #0d6efd;
}

.context-menu {
  position: fixed;
  background: #2a2c34;
  border: 1px solid #3a3c45;
  border-radius: 8px;
  min-width: 180px;
  z-index: 2000;
  padding: 0.25rem 0;
}

.ctx-item {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.ctx-item:hover {
  background: rgba(255,255,255,0.08);
}

.ctx-item.danger {
  color: #dc3545;
}
</style>
