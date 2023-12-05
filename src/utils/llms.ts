import axios from "axios";
import { OpenAiChatCompletionResponse, OpenAiStreamingChatCompletionResponse } from "../types/llms/openai/chat.js";
import { ErrorMessage } from "../types/llms/base.js";

/**
 * Represents the base LLM (Language Model) class.
 * Provides a method for making API calls.
 */

class LLM {
    protected apiKey: string;
    protected model?: string;
    protected apiEndpoint: string;

    constructor() { }

    /**
     * Makes an API call using axios.
     * @param url - The URL to make the API call to.
     * @param method - The HTTP method to use for the API call.
     * @param data - The data to send with the API call.
     * @param params - The query parameters to include in the API call.
     * @returns A promise that resolves to the response data from the API call.
     */
    public async call_api(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
        data: Record<string, any>,
        params?: Record<string, any>
    ): Promise<any> {
        try {
            const response = await axios.request({
                url,
                method,
                data,
                ...params,
            });

            return response.data;
        }
        catch (error) {
            if (process.env.DEBUG) {
                console.error(error);
            }
            return {
                error: error.message,
                code: error.code,
            };
        }
    }
}

/**
 * Represents the OpenAI class that extends the LLM class.
 * Provides methods for completing prompts, searching documents, and chat completions using the OpenAI API.
 */
class OpenAI extends LLM {

    constructor({ apiKey, model = "davinci" }) {
        super();
        this.apiKey = apiKey;
        this.model = model;
        this.apiEndpoint = "https://api.openai.com/v1/";
    }

    /**
     * Completes a prompt using the OpenAI API.
     * @param prompt - The prompt to complete.
     * @param options - Additional options for the completion.
     * @returns A promise that resolves to the completion response from the API.
     */
    public async complete(prompt: string, options?: Record<string, any>): Promise<ErrorMessage | OpenAiChatCompletionResponse | OpenAiStreamingChatCompletionResponse> {
        return await this.call_api(
            `${this.apiEndpoint}/chat/completions`,
            "POST",
            {
                model: this.model,
                messages: [
                    {
                        prompt
                    }
                ],
                ...options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );
    }

    /**
     * Searches documents using the OpenAI API.
     * @param documents - The documents to search.
     * @param query - The search query.
     * @param options - Additional options for the search.
     * @returns A promise that resolves to the search response from the API.
     */
    public async search(documents, query: string, options?: Record<string, any>) {
        return await this.call_api(
            `${this.apiEndpoint}/${this.model}/search`,
            "POST",
            {
                documents,
                query,
                ...options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );
    }

    /**
     * Performs chat completions using the OpenAI API.
     * @param prompt - The prompt for the chat completion.
     * @param options - Additional options for the chat completion.
     * @returns A promise that resolves to the chat completion response from the API.
     */
    public async chatCompletions(prompt: string, options?: Record<string, any>): Promise<ErrorMessage | OpenAiChatCompletionResponse | OpenAiStreamingChatCompletionResponse> {
        return await this.call_api(
            `${this.apiEndpoint}/${this.model}/chat`,
            "POST",
            {
                prompt,
                ...options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );
    }
}

/**
 * Represents the Anthropic class that extends the LLM class.
 * Provides methods for completing prompts, searching documents, and chat completions using the Anthropic API.
 */
class Anthropic extends LLM {
    constructor({ apiKey }) {
        super();
        this.apiKey = apiKey;
        this.apiEndpoint = "https://api.anthropic-lang.com/v1";
    }

    /**
     * Completes a prompt using the Anthropic API.
     * @param prompt - The prompt to complete.
     * @param options - Additional options for the completion.
     * @returns A promise that resolves to the completion response from the API.
     */
    public async complete(prompt: string, options: Record<string, any>) {
        return await this.call_api(
            `${this.apiEndpoint}/completion`,
            "POST",
            {
                prompt,
                ...options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );
    }

    /**
     * Searches documents using the Anthropic API.
     * @param documents - The documents to search.
     * @param query - The search query.
     * @param options - Additional options for the search.
     * @returns A promise that resolves to the search response from the API.
     */
    public async search(documents, query: string, options: Record<string, any>) {
        return await this.call_api(
            `${this.apiEndpoint}/search`,
            "POST",
            {
                documents,
                query,
                ...options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );
    }

    /**
     * Performs chat completions using the Anthropic API.
     * @param prompt - The prompt for the chat completion.
     * @param options - Additional options for the chat completion.
     * @returns A promise that resolves to the chat completion response from the API.
     */
    public async chatCompletions(prompt, options) {
        return await this.call_api(
            `${this.apiEndpoint}/chat`,
            "POST",
            {
                prompt,
                ...options,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );
    }
}

export { OpenAI, Anthropic, LLM };