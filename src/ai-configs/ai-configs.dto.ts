import { Part, Content, SafetySetting } from "@google/generative-ai";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Document } from "mongoose";
import { SAFETY_SETTINGS, GENERATION_CONFIG, MODEL_NAME, SYSTEM_INSTRUCTIONS, ROLE } from "./default-configs.ai";




// GENERATION CONFIG DTO
export class GenerationConfig {
    @Prop({type : Number})
    temperature: number;
    @Prop({type : Number})
    topK: number;
    @Prop({type : Number})
    topP: number;
    @Prop({type : Number})
    maxOutputTokens?: number;
}

// CHAT THREAD DTO
@Schema({collection: 'ai-assisant-settings', strict: true, timestamps: true, versionKey: false})
export class AiConfigsDto extends Document{

    @Prop({type : String, default: MODEL_NAME})
    MODEL_NAME: string

    @Prop({type : String, default: 'CODECRAFTER'})
    ASSISTANT_NAME: string

    @Prop({type : GenerationConfig, nullable: true, default: GENERATION_CONFIG})
    GENERATION_CONFIG: GenerationConfig

    @Prop({type: [Object], nullable: true, default: SYSTEM_INSTRUCTIONS})
    SYSTEM_INSTRUCTIONS?: Part | Content

    @Prop({type: [Object], nullable: true, default: SAFETY_SETTINGS})
    SAFETY_SETTINGS?: SafetySetting[]

    @Prop({type: [Object], nullable: true, default: []})
    PARTS?: string

}

export type AiConfigs = {
    GENERATION_CONFIG: GenerationConfig
    SYSTEM_INSTRUCTIONS: Part | Content | string
    SAFETY_SETTINGS?: SafetySetting[] 
    PARTS?: string
    ASSISTANT_NAME?: string
    MODEL_NAME: string
}


export const AiConfigsSchema = SchemaFactory.createForClass(AiConfigsDto);