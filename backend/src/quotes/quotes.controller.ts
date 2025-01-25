import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

@Controller('api/quotes')
export class QuotesController {


    constructor(private service: QuotesService) { }

    @Get('')
    async get_quotes(@Query() params: { count: string }, @Res() response: Response) {

        try {
            const count = parseInt(params.count);
            if (isNaN(count) || count <= 0) {
                response
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ "message": "Invaid input" });
                return;
            }

            const quotes = await this.service.getQuotes(count);

            response
                .status(StatusCodes.OK)
                .json({ "message": "quotes fetched successfully", data: quotes });

        } catch (error) {
            response
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ "message": "Internal server error" });
        }
    }

    @Get('fill')
    async fillQuotes() {
        this.service.fillQuotesToDB();
    }

}
