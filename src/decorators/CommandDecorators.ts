import {PermissionResolvable} from "discord.js";

export namespace Command {
    export function name(name: string) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                name = name;
            }
        }
    }

    export function aliases(...aliases: string[]) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                aliases = aliases;
            }
        }
    }

    export function description(description: string) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                description = description;
            }
        }
    }

    export function usages(...usages: string[]) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                usages = usages;
            }
        }
    }

    export function botPermissions(...permissions: PermissionResolvable[]) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                botPermissions = permissions;
            }
        }
    }

    export function userPermissions(...permissions: PermissionResolvable[]) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                userPermissions = permissions;
            }
        }
    }

    export function allowRoles(...roleIds: string[]) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                allowRoles = roleIds;
            }
        }
    }

    export function denyRoles(...roleIds: string[]) {
        return function<T extends {new(...args: any[]): {}}> (constructor: T) {
            return class extends constructor {
                denyRoles = roleIds;
            }
        }
    }

    export function disable<T extends {new(...args: any[]): {}}> (constructor: T) {
        return class extends constructor {
            enabled = false;
        }
    }

    export function adminOnly<T extends {new(...args: any[]): {}}> (constructor: T) {
        return class extends constructor {
            adminOnly = true;
        }
    }

    export function modOnly<T extends {new(...args: any[]): {}}> (constructor: T) {
        return class extends constructor {
            modOnly = true;
        }
    }

    export function guildOnly<T extends {new(...args: any[]): {}}> (constructor: T) {
        return class extends constructor {
            guildOnly = true;
        }
    }

    export function dmOnly<T extends {new(...args: any[]): {}}> (constructor: T) {
        return class extends constructor {
            dmOnly = true;
        }
    }
}
