import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { Quote, QuoteSchema } from 'src/schemas/Quote';
import { MongooseModule } from '@nestjs/mongoose';
import { QuoteDAOService } from './QuoteDAOService';

@Module({
  controllers: [QuotesController],
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  providers: [QuotesService, QuoteDAOService]
})
export class QuotesModule { }
