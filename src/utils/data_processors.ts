import { parse, HTMLElement } from "node-html-parser";

export class BaseDataProcessor {
    protected content: string;
    protected soup: HTMLElement;

    constructor(content: string = "") {
        this.content = content;
        this.soup = parse(this.content);
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public async getContent(): Promise<string> {
        return this.content;
    }

    public async get_processed_data(input: any = null): Promise<string> {
        return "";
    }
}

export class OCWSearchDataProcessor extends BaseDataProcessor {
    public async get_processed_data(input: any = null): Promise<string> {
        let searchResults = this.soup.querySelectorAll(".");
        return "";
    }
}

export class WikipediaSearchDataProcessor extends BaseDataProcessor {
    public async get_processed_data(input: any = null): Promise<string> {
        return "";
    }
}

export class OCWPageDataProcessor extends BaseDataProcessor {
    public async get_processed_data(input: any = null): Promise<string> {
        return "";
    }
}

export class WikipediaPageDataProcessor extends BaseDataProcessor {
    public async get_processed_data(input: any = null): Promise<string> {
        return "";
    }
}
