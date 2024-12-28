import { Node } from './Node'

export class Queue<T> {

  private frontNode: Node<T> | null = null
  private backNode: Node<T> | null = null
  #size = 0

  public push( item:T ) {
    const node = new Node( item )
    if( this.isEmpty ) {
      this.frontNode = node
      this.backNode = node
    }
    else {
      this.backNode!.setNextNode( node )
      this.backNode = node
    }
    this.#size++
  }

  public pop(): T | undefined {
    const result = this.front
    if( this.frontNode === null ) { return undefined }
    const { nextNode } = this.frontNode
    this.frontNode = nextNode
    this.#size--
    return result
  }

  get front(): T | undefined {
    if( this.frontNode === null ) { return undefined }
    return this.frontNode.value
  }

  get size() {
    return this.#size
  }

  get isEmpty(): boolean {
    return this.#size === 0
  }

}
