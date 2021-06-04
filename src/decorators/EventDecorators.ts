
export namespace Event {
    export function name(name: string) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                name = name;
            }
        }
    }
}
