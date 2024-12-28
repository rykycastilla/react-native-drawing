export class Node<T> {

  readonly #value: T
  #nextNode: Node<T> | null = null

  constructor( value:T ) {
    this.#value = value
  }

  public setNextNode( nextNode:Node<T> ) {
    this.#nextNode = nextNode
  }

  get value() {
    return this.#value
  }

  get nextNode() {
    return this.#nextNode
  }

}
