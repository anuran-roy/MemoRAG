import { llm } from "../config.js";
import { ErrorMessage } from "../types/llms/base.js";
import {
    OpenAiChatCompletionResponse,
    OpenAiStreamingChatCompletionResponse,
    OpenAiStreamingResponse,
} from "../types/llms/openai/chat.js";

export const getInfoBasedResponse = async (info: string, prompt: string) => {
    let message = `You are supposed to answer from the following information:
    '''
    ${info}
    '''

    ${prompt}
    `;

    let result:
        | OpenAiStreamingChatCompletionResponse
        | OpenAiChatCompletionResponse
        | OpenAiStreamingResponse
        | ErrorMessage = await llm.chatCompletions(message);

    if (Array.isArray(result)) {
        result = result[0];
    }

    if ("error" in result) {
        return result;
    }

    if (result.choices?.[0]?.finish_reason === "stop") {
        return result.choices[0][0];
    }

    return "I don't know what to say";
};
