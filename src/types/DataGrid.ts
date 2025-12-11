export interface TableData {
  id: number | string
  [key: string]: unknown
}

export interface Table<T extends TableData = TableData> {
  fields: Field[]
  data: T[]
}

export interface Field {
  name: string
  label?: string
  sortable?: boolean
  class?: string
  width?: string
  formatter?: (value: unknown, row: TableData) => string | number
}

// export interface TableData {
//   id: string | number
//   name: string
//   email: string
// }
