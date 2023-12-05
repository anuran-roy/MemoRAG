import { DatabaseMemoryLayer } from "./memory_layer.js";

/**
 * Base class for storage layers.
 */
class BaseStorageLayer {
    constructor() {
        this.init();
    }

    /**
     * Initializes the storage layer.
     * Must be implemented by subclasses.
     */
    init() {
        throw new Error("init method must be implemented");
    }

    /**
     * Retrieves the value associated with the specified key.
     * Must be implemented by subclasses.
     * @param key - The key to retrieve the value for.
     * @returns The value associated with the key.
     */
    get(key: string) {
        throw new Error("get method must be implemented");
    }

    /**
     * Sets the value associated with the specified key.
     * Must be implemented by subclasses.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     */
    set(key: string, value: any) {
        throw new Error("set method must be implemented");
    }

    /**
     * Removes the value associated with the specified key.
     * Must be implemented by subclasses.
     * @param key - The key to remove the value for.
     */
    remove(key: string) {
        throw new Error("remove method must be implemented");
    }
}

class InMemoryStorageLayer { }

class DatabaseStorageLayer {
    constructor(memory_backend: DatabaseMemoryLayer) { }

    init() {
        throw new Error("init method must be implemented");
    }
}
