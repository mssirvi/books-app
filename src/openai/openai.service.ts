import { Inject, Injectable } from '@nestjs/common';
import OpenAI from "openai";


@Injectable()
export class OpenaiService {
    constructor(
        @Inject('openai') private readonly openAi: OpenAI
    ){}

    async askGpt(userQuery: string) {
        const completion = await this.openAi.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                // { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: userQuery,
                },
            ],
        });
        
        console.log(completion.choices[0].message);
        return console.log(completion.choices[0].message);
    }
}

