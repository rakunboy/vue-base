<template>
  <div class="p-4 w-100">
    <h2 class="fw-bold mb-4">
      <i class="bi bi-folder2-open me-2"></i>
      Archivos
    </h2>

    <FileSystemBrowser :items="files" />
  </div>
</template>

<script setup lang="ts">
import FileSystemBrowser from '@/components/common/filesystem/FileSystemBrowser.vue'
import type { FileItem } from '@/types/FileItem'

const files: FileItem[] = [
  { id: 1, name: 'Documentos', type: 'folder', parentId: null },
  { id: 2, name: 'Imágenes', type: 'folder', parentId: null },
  { id: 3, name: 'readme.txt', type: 'file', parentId: null },

  { id: 4, name: 'Contratos', type: 'folder', parentId: 1 },
  { id: 5, name: 'factura.pdf', type: 'file', parentId: 1 },

  { id: 6, name: 'logo.png', type: 'file', parentId: 2 },
  { id: 7, name: 'banner.jpg', type: 'file', parentId: 2 }
]
</script>
