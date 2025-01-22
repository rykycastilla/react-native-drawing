export class UnexpectedTargetError extends Error {
  constructor(
    public readonly target: string,
    public readonly dependency: object,
    public readonly expectedDependencyClass: NamedType,
  ) {
    const dependencyType: string = dependency.constructor.name
    const expectedDependencyType: string = expectedDependencyClass.name
    super( `An object of type ${ dependencyType } cannot be used in ${ target }. Only ${ expectedDependencyType } is allowed` )
  }
}

interface NamedType {
  name:string
}
