import { iQuote } from '../../server/QuotesServer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { StyledTag } from '../Tags/TagsStyles';
import { StyledQuote } from './QuoteStyles';

export default function Quote(props: { quote: iQuote }) {
    return (
        <StyledQuote>
            <div className='tags'>
                {props.quote.tags.map((tag) => {
                    return <StyledTag label={tag} key={tag} />
                })}
            </div>

            <FormatQuoteIcon fontSize='large' htmlColor='var(--primary-color)' />

            <div className='quote'>
                <div className='quote-content'>{props.quote.body}</div>
                <div className='quote-author'>{props.quote.author}</div>
            </div>

        </StyledQuote>
    )
}
