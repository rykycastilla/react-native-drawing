import { Node } from './Node'

export class Queue<T> {

  private first: Node<T> | undefined
  private last: Node<T> | undefined
  #size = 0

  public push( item:T ) {
    const node = new Node( item )
    if( this.isEmpty() ) {
      this.first = node
      this.last = node
    }
    else {
      this.last!.next = node
      this.last = node
    }
    this.size++
  }

  public pop(): T | undefined {
    if( this.first === undefined ) { return undefined }
    const firstValue: T = this.first.value
    const nextNode: Node<T> | null = this.first.next
    if( nextNode === null ) { this.first = undefined }
    else { this.first = nextNode }
    this.size--
    return firstValue
  }

  public front(): T | undefined {
    return this.first?.value
  }

  public rear(): T | undefined {
    return this.last?.value
  }

  public isEmpty(): boolean {
    return this.size === 0
  }

  get size(): number {
    return this.#size
  }

  private set size( newSize:number ) {
    this.#size = newSize
  }

}
