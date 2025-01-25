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
}

