import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iQuoteData, Quote, QuoteDocument } from 'src/schemas/Quote';
import { iQuote } from './quotes.service';

@Injectable()
export class QuoteDAOService {

    constructor(
        @InjectModel(Quote.name)
        private quote: Model<QuoteDocument>,

    ) { }

    public find(query: any) {
        return this.quote.find(query);
    }

    public aggregate(query: any) {
        return this.quote.aggregate(query);
    }

    public findOne(query: any) {
        return this.quote.findOne(query);
    }

    public create(props: iQuoteData) {
        const quote = new this.quote(props);
        return quote;
    }
}
