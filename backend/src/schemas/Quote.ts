import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

export interface iQuoteData {
    favqs_id: number;
    tags: Array<string>;
    author: string;
    body: string;
}

@Schema({ collection: 'quotes' })
export class Quote {
    @Prop()
    favqs_id: number;

    @Prop()
    tags: string[];

    @Prop()
    author: string;

    @Prop()
    body: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);