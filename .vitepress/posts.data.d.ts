export interface Post {
  url: string
  title: string
  date: string
  author: string
  excerpt: string
  tags: string[]
  image: string
}

export declare const data: Post[]
