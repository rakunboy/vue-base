export interface NotificationItem {
  id: number
  title: string
  icon: string
  time: string
  read: boolean
}

export interface MessageItem {
  id: number
  from: string
  text: string
  time: string
  read: boolean
}
