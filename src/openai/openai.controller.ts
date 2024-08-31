import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {

    constructor( private readonly openaiservice: OpenaiService) {}

    @Post()
    async askGpt(@Body() userQuery: string) {
        return await this.openaiservice.askGpt(userQuery);
    }
}
