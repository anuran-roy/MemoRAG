import { BaseDataProcessor } from "./data_processors.js";
import { BasePromptProcessor } from "./prompt_processors.js";


/**
 * Executes a data processing pipeline.
 * @param pipeline - An array of BaseDataProcessor instances representing the pipeline.
 * @returns The output of the pipeline.
 */
const dataProcessPipeline = async (pipeline: BaseDataProcessor[]) => {
    let pipelineOutput = null;
    pipeline.forEach(async (pipelineElement, index) => {
        // Handle the elements of the pipeline if it's a data processor
        if (pipelineElement instanceof BaseDataProcessor) {
            if (index === 0) {
                pipelineOutput = await pipelineElement.get_processed_data(null);
            } else {
                pipelineOutput = await pipelineElement.get_processed_data(
                    pipelineOutput
                );
            }
        }
    });
    return pipelineOutput;
};

/**
 * Executes a prompt processing pipeline.
 * @param pipeline - An array of BasePromptProcessor instances representing the pipeline.
 * @returns The output of the pipeline.
 */
const promptProcessPipeline = async (pipeline: BasePromptProcessor[]) => {
    let pipelineOutput = null;
    pipeline.forEach(async (pipelineElement, index) => {
        // Handle the elements of the pipeline if it's a prompt processor
        if (pipelineElement instanceof BasePromptProcessor) {
            if (index === 0) {
                pipelineOutput = await pipelineElement.get_prompt(null);
            } else {
                pipelineOutput = await pipelineElement.get_prompt(
                    pipelineOutput
                );
            }
        }
    });
    return pipelineOutput;
};

export { dataProcessPipeline, promptProcessPipeline };
