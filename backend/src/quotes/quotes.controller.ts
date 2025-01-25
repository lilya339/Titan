import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('api/quotes')
export class QuotesController {


    constructor(private service: QuotesService) { }

    @Get('')
    async get_quotes(@Query() params: { count: string, tags: string }, @Res() response: Response) {

        try {
            const count = parseInt(params.count);
            if (isNaN(count) || count <= 0) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ "message": "Invaid input" });
                return;
            }

            const tags = params.tags ? params.tags.split(',') : [];
            const quotes = await this.service.getQuotes(count, tags);

            response
                .status(StatusCodes.OK)
                .json({ "message": "quotes fetched successfully", data: quotes });

        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ "message": "Internal server error" });
        }
    }

    @Get('tags')
    async getTags(@Res() response: Response) {
        try {

            const tags = await this.service.getTags();
            response
                .status(StatusCodes.OK)
                .json({ "message": "tags fetched successfully", data: tags });

        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ "message": "Internal server error" });
        }
    }

    @Get('fill')
    async fillQuotes() {
        return await this.service.fillQuotesToDB();
    }
}
