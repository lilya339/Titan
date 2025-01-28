import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Quote } from 'src/schemas/Quote';
import { QuoteDAOService } from './QuoteDAOService';

export interface iQuote {
    id: number;
    dialogue: boolean;
    private: boolean;
    tags: string[];
    url: string;
    favorites_count: number;
    upvotes_count: number;
    downvotes_count: number;
    author: string;
    author_permalink: string;
    body: string;
}

@Injectable()
export class QuotesService {

    constructor(
        private quoteDAOService: QuoteDAOService,

    ) { }

    public async getTags() {
        const distinctTags = await this.quoteDAOService.aggregate([
            { $unwind: '$tags' },
            { $group: { _id: '$tags' } },
            { $project: { _id: 0, tag: '$_id' } }
        ]);

        const tags = distinctTags.map(item => item.tag);
        return tags;
    }

    public async getQuotes(count: number, tags: Array<string>) {

        const pipeline = new Array<Object>;

        (tags.length > 0) &&
            pipeline.push({
                $match: {
                    tags: { $in: tags }
                }
            });

        pipeline.push({ $sample: { size: count } });

        const quotes = await this.quoteDAOService.aggregate(pipeline);
        return quotes;
    }

    /**Intenal use */
    public async fillQuotesToDB() {
        const LIMIT = 200;
        for (let i = 0; i < LIMIT; i++) {
            const URL = 'https://favqs.com/api/qotd';

            axios.get(URL).then(async (response) => {
                this.addNewQuote(response.data.quote);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    private async addNewQuote(quote: iQuote) {
        try {

            const exists = await this.quoteDAOService.findOne({ favqs_id: quote.id });
            if (exists) {
                return;
            }

            const newQuote = this.quoteDAOService.create({
                ...quote,
                favqs_id: quote.id
            });
            await newQuote.save();

        } catch (error) {
            console.log("failed create quote")
        }
    }
}

