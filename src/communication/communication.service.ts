import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SqsService } from './sqs/sqs.service';
import { CreateBookDto } from 'src/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/book/dto/update-book.dto';

@Injectable()
export class CommunicationService {

    constructor(private sqsService: SqsService) { }

    @OnEvent('Book.*')
    async handleEvents(payload: CreateBookDto | UpdateBookDto) {
       await this.sqsService.sendMessage(payload);
    }
}
