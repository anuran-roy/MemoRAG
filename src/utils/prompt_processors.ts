class BasePromptProcessor {
    constructor() {
        this.get_prompt = this.get_prompt.bind(this);
    }

    public async get_prompt(input: any = null) {
        throw new Error("get_prompt(input: any = null) not implemented");
    }
}

class OpenAIPromptProcessor extends BasePromptProcessor {
    constructor(model: string = "davinci") {
        super();
    }

    public async get_prompt(input: any = null) {
        throw new Error("get_prompt(input: any = null) not implemented");
    }
}

class AnthropicPromptProcessor extends BasePromptProcessor {
    constructor() {
        super();
    }

    public async get_prompt(input: any = null) {
        throw new Error("get_prompt(input: any = null) not implemented");
    }
}

export { BasePromptProcessor, OpenAIPromptProcessor, AnthropicPromptProcessor };
