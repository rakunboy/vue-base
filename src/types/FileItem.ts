export interface FileItem {
  id: number
  name: string
  type: 'file' | 'folder'
  parentId: number | null
  favorite?: boolean
}
