interface AnthropicChatCompletionRequest {
    prompt: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    n?: number;
    stop?: string | string[];
    logprobs?: number;
    echo?: boolean;
    presence_penalty?: number;
    frequency_penalty?: number;
}
