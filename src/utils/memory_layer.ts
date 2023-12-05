import fs from "fs";
import * as redis from "redis";


/**
 * Represents the base memory layer class.
 * All other memory layer classes inherit from this class.
 */
class BaseMemoryLayer {
    /**
     * Constructs a new instance of the BaseMemoryLayer class.
     * It automatically connects to the memory layer.
     */
    constructor() {
        this.connect();
    }

    /**
     * Retrieves the value associated with the specified key.
     * @param key - The key to retrieve the value for.
     * @returns A promise that resolves to the retrieved value.
     * @throws An error if the method is not implemented.
     */
    public async get(key): Promise<void> {
        throw new Error("get() not implemented.");
    }

    /**
     * Sets the value associated with the specified key.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     * @returns A promise that resolves when the value is set.
     * @throws An error if the method is not implemented.
     */
    public async set(key, value): Promise<void> {
        throw new Error("set() not implemented.");
    }

    /**
     * Deletes the value associated with the specified key.
     * @param key - The key to delete the value for.
     * @returns A promise that resolves when the value is deleted.
     * @throws An error if the method is not implemented.
     */
    public async delete(key) {
        throw new Error("delete() not implemented.");
    }

    /**
     * Clears all values in the memory layer.
     * @returns A promise that resolves when the memory layer is cleared.
     * @throws An error if the method is not implemented.
     */
    public async clear() {
        throw new Error("clear() not implemented.");
    }

    /**
     * Connects to the memory layer.
     * @returns A promise that resolves when the connection is established.
     * @throws An error if the method is not implemented.
     */
    public async connect(): Promise<any> {
        throw new Error("connect() not implemented.");
    }

    /**
     * Disconnects from the memory layer.
     * @returns A promise that resolves when the disconnection is completed.
     * @throws An error if the method is not implemented.
     */
    public async disconnect(): Promise<void> {
        throw new Error("disconnect() not implemented.");
    }

    /**
     * Destroys the memory layer by disconnecting from it.
     * @returns A promise that resolves when the memory layer is destroyed.
     */
    public async destroy() {
        await this.disconnect();
    }
}

/**
 * Represents a memory layer that uses a database as the underlying storage.
 * It extends the BaseMemoryLayer class.
 */
class DatabaseMemoryLayer extends BaseMemoryLayer {
    /**
     * Constructs a new instance of the DatabaseMemoryLayer class.
     * It automatically connects to the memory layer.
     */
    constructor() {
        super();
        this.connect();
    }

    /**
     * Retrieves the value associated with the specified key.
     * @param key - The key to retrieve the value for.
     * @returns A promise that resolves to the retrieved value.
     * @throws An error if the method is not implemented.
     */
    public async get(key): Promise<void> {
        throw new Error("get() not implemented.");
    }

    /**
     * Sets the value associated with the specified key.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     * @returns A promise that resolves when the value is set.
     * @throws An error if the method is not implemented.
     */
    public async set(key, value): Promise<void> {
        throw new Error("set() not implemented.");
    }

    /**
     * Deletes the value associated with the specified key.
     * @param key - The key to delete the value for.
     * @returns A promise that resolves when the value is deleted.
     * @throws An error if the method is not implemented.
     */
    public async delete(key) {
        throw new Error("delete() not implemented.");
    }

    /**
     * Clears all values in the memory layer.
     * @returns A promise that resolves when the memory layer is cleared.
     * @throws An error if the method is not implemented.
     */
    public async clear() {
        throw new Error("clear() not implemented.");
    }

    /**
     * Connects to the memory layer.
     * @returns A promise that resolves when the connection is established.
     * @throws An error if the method is not implemented.
     */
    public async connect(): Promise<any> {
        throw new Error("connect() not implemented.");
    }

    /**
     * Disconnects from the memory layer.
     * @returns A promise that resolves when the disconnection is completed.
     * @throws An error if the method is not implemented.
     */
    public async disconnect(): Promise<void> {
        throw new Error("disconnect() not implemented.");
    }

    /**
     * Destroys the memory layer by disconnecting from it.
     * @returns A promise that resolves when the memory layer is destroyed.
     */
    public async destroy() {
        await this.disconnect();
    }
}

/**
 * Represents an in-memory memory layer that uses a Map as the underlying storage.
 * It extends the BaseMemoryLayer class.
 */
class InMemoryLayer extends BaseMemoryLayer {
    protected _cache: Map<string, any>;

    /**
     * Constructs a new instance of the InMemoryLayer class.
     * It automatically connects to the memory layer.
     */
    constructor() {
        super();
        this.connect();
    }

    /**
     * Connects to the memory layer by creating a new Map.
     * @returns A promise that resolves when the connection is established.
     */
    public async connect(): Promise<any> {
        this._cache = new Map<string, any>();
    }

    /**
     * Disconnects from the memory layer by deleting the Map.
     * @returns A promise that resolves when the disconnection is completed.
     */
    public async disconnect(): Promise<void> {
        delete this._cache;
    }

    /**
     * Retrieves the value associated with the specified key.
     * @param key - The key to retrieve the value for.
     * @returns A promise that resolves to the retrieved value.
     */
    public async get(key) {
        return this._cache.get(key);
    }

    /**
     * Sets the value associated with the specified key.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     */
    public async set(key, value) {
        this._cache.set(key, value);
    }

    /**
     * Deletes the value associated with the specified key.
     * @param key - The key to delete the value for.
     */
    public async delete(key) {
        this._cache.delete(key);
    }

    /**
     * Clears all values in the memory layer.
     */
    public async clear() {
        this._cache.clear();
    }
}

/**
 * Represents a file-based memory layer that uses a JSON file as the underlying storage.
 * It extends the BaseMemoryLayer class.
 */
class FileMemoryLayer extends BaseMemoryLayer {
    protected _cache: string;

    /**
     * Constructs a new instance of the FileMemoryLayer class.
     * It automatically connects to the memory layer.
     */
    constructor() {
        super();
        this.connect();
    }

    /**
     * Connects to the memory layer by reading the JSON file.
     * @returns A promise that resolves when the connection is established.
     */
    public async connect(): Promise<void> {
        this._cache = JSON.parse(
            fs.readFileSync(process.env.FILE_DB_LOCATION || "../../db.json", {
                encoding: "utf-8",
                flag: "r",
            })
        );
    }

    /**
     * Disconnects from the memory layer by writing the JSON file.
     * @returns A promise that resolves when the disconnection is completed.
     */
    public async disconnect(): Promise<void> {
        fs.writeFileSync(
            process.env.FILE_DB_LOCATION || "../../db.json",
            JSON.stringify(this._cache)
        );
    }
}

/**
 * Represents a Redis memory layer that extends the DatabaseMemoryLayer class.
 * It uses Redis as the underlying storage.
 */
class RedisMemoryLayer extends DatabaseMemoryLayer {
    protected _cache;

    /**
     * Constructs a new instance of the RedisMemoryLayer class.
     * It automatically connects to the memory layer.
     */
    constructor() {
        super();
        this.connect();
    }

    /**
     * Connects to the memory layer by creating a Redis client.
     * @returns A promise that resolves when the connection is established.
     */
    public async connect(): Promise<void> {
        this._cache = await redis
            .createClient({
                url: process.env.REDIS_URL,
            })
            .on("error", (err) => console.log("Redis Client Error", err))
            .connect();
    }

    /**
     * Retrieves the value associated with the specified key.
     * @param key - The key to retrieve the value for.
     * @returns A promise that resolves to the retrieved value.
     */
    public async get(key) {
        return await this._cache.get(key);
    }

    /**
     * Sets the value associated with the specified key.
     * @param key - The key to set the value for.
     * @param value - The value to set.
     */
    public async set(key, value) {
        await this._cache.set(key, value);
    }

    /**
     * Disconnects from the memory layer by disconnecting the Redis client.
     * @returns A promise that resolves when the disconnection is completed.
     */
    public async disconnect(): Promise<void> {
        await this._cache.disconnect();
    }
}

export {
    BaseMemoryLayer,
    DatabaseMemoryLayer,
    InMemoryLayer,
    FileMemoryLayer,
    RedisMemoryLayer,
};
