export type ElementType = "heading" | "paragraph" | "button" | "image" | "container"

export interface Element {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  content?: string
  properties?: Record<string, any>
}

