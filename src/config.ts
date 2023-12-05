// import { OpenAI } from "langchain/llms/openai";
// import * as qdrant from "langchain/vectorstores/qdrant";
// import * as embeddings from "langchain/embeddings/openai";
import { OpenAI } from "./utils/llms.js";
import XRay from "x-ray";
// import { Axios } from "axios";
import dotenv from "dotenv";
import { QdrantClient } from "@qdrant/js-client-rest";
import * as dataProcessors from "./utils/data_processors.js";

dotenv.config();

// export const llm = new OpenAI({
//     openAIApiKey: process.env.OPENAI_API_KEY,
// });

export const llm = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo"
});

export const vectorDb = new QdrantClient({
    url: "http://localhost:6333",
    timeout: 120,
});

// export const requestClient = new Axios({
//     timeout: 120,
//     timeoutErrorMessage: "Request timed out.",
//     h
// })

export const scraper: XRay.Instance = XRay();

export let wikiSearchProcessor =
    new dataProcessors.WikipediaSearchDataProcessor();
export let wikiPageProcessor = new dataProcessors.WikipediaPageDataProcessor();
export let ocwSearchProcessor = new dataProcessors.OCWSearchDataProcessor();
export let ocwPageProcessor = new dataProcessors.OCWPageDataProcessor();

const doesCollectionExist = async (
    collectionName: string
): Promise<boolean> => {
    let collections = await vectorDb.getCollections();
    return (
        collections.collections.filter(
            (collection) => collection.name === collectionName
        ).length > 0
    );
};

// We follow the principle of separating stages like data processing, prompting, etc.
// This allows us to take advantage of the parallelism of the each stage, uniquely in their own way.

export const dataProcessingPipeline: dataProcessors.BaseDataProcessor[] = [
    wikiPageProcessor,
    ocwPageProcessor,
    wikiSearchProcessor,
    ocwSearchProcessor,
]; // TODO: Add more data processors

export const dbUrl =
    process.env.DB_URL ||
    "postgres://postgres:postgres@localhost:5432/postgres";
