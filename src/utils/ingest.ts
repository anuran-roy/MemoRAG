import axios from "axios";
import {
    vectorDb,
    scraper,
    wikiPageProcessor,
    wikiSearchProcessor,
    ocwPageProcessor,
    ocwSearchProcessor,
} from "../config.js";
// import BeautifulSoup from 'beautiful-soup-js';
import * as dataProcessors from "./data_processors.js";

export const get_search_results_url = (topic_name: string, source: string) => {
    let res: string = "";

    switch (source) {
        case "wikipedia":
            // Get the wikipedia URL for the topic
            topic_name = topic_name.replace(" ", "+");
            res = `https://en.wikipedia.org/w/index.php?fulltext=1&search=${topic_name}&title=Special%3ASearch&ns0=1`;
            break;
        case "ocw":
            topic_name = topic_name.toLowerCase().replace(" ", "%20");
            res = `https://ocw.mit.edu/search/?q=${topic_name}&type=resourcefile`;
            break;
        default:
            throw Error("Source not recognized.");
    }

    return res;
};

export const get_content = (topic_urls: string[]) => {
    let data = topic_urls.map(async (entry: string, idx: number) => {
        return await axios.get(entry);
    });

    return data;
};

export const process_content_single = async (
    content: string,
    source: string
) => {
    let content_to_process = content;
    let processed_content = "";
    let dataProcessor: dataProcessors.BaseDataProcessor;

    switch (source) {
        case "wikipedia":
            dataProcessor = wikiPageProcessor;
            break;
        case "ocw":
            dataProcessor = ocwPageProcessor;
        default:
            throw Error("Source not recognized");
    }

    dataProcessor.setContent(content_to_process);
    processed_content = await dataProcessor.get_processed_data();

    return processed_content;
};

export const process_content = async (
    content: string[],
    source: string = "ocw"
) => {
    // For batch processing of content
    content = content.filter((entry: string) => entry.length != 0);

    let res = content.map(async (entry: string) => {
        return await process_content_single(entry, source);
    });

    return res;
};
