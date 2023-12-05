export interface MultimediaMessage {
    type: "text" | "image_url";
    text?: string;
    image_url?: {
        url: string;
    };
}

export interface OpenAiTools {
    id: string;
    type: "function";
    function?: {
        name: string;
        description: string;
        parameters?: Record<string, any>;
    };
}

export interface OpenAiChatMessage {
    role: "system" | "user" | "assistant";
    content: string | MultimediaMessage[];
    name?: string;
}

export interface OpenAiUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface OpenAiChoice {
    finish_reason: string;
    index: number;
    message: OpenAiChatMessage;
}

export interface OpenAiStreamingChoice {
    delta: {
        content: string;
        tool_calls: OpenAiTools[];
        role: "assistant" | "user" | "system";
    };
    finish_reason: string;
    index: number;
}

export interface OpenAiChatCompletionRequest {
    messages: OpenAiChatMessage[];
    model: string;
    frequency_penalty?: number;
    logit_bias?: number;
    max_tokens?: number;
    n?: number;
    presence_penalty?: number;
    response_format?: Record<string, any>;
    seed?: number;
    stop?: string | string[];
    stream?: boolean;
    temperature?: number;
    top_p?: number;
    tools?: OpenAiTools[];
    tool_choice?: string;
    user?: string;
}

export interface OpenAiStreamingResponse {
    id: string;
    created: number;
    model: string;
    choices: OpenAiStreamingChoice[];
    system_fingerprint: string;
    object?: "chat.completion.chunk";
}

export type OpenAiStreamingChatCompletionResponse = OpenAiStreamingResponse[];

export interface OpenAiChatCompletionResponse {
    id: string;
    choices: OpenAiChoice[];
    created: number;
    model: string;
    system_fingerprint: string;
    object?: "chat.completion";
    usage: OpenAiUsage;
}

