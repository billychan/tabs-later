declare namespace Common {
  interface ByIdState {
    [id: string]: any
  }

  type AllIdState = (string | number)[]

  // Provide a way to constrain value type from Generic
  interface Dictionary<T> {
    [key: string]: T
  }
}