import styled from 'styled-components';
import { iQuote } from '../../server/QuotesServer';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { StyledTag } from '../Tags/TagsStyles';


const StyledQuote = styled.div`
    width: 100%;
    background-color: var(--white);
    padding:  16px 30px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.1);
    border-radius: 6px;
    max-width: 600px;

    .tags{
        display:flex;
        gap: 4px;
        justify-content: end;
        flex-wrap: wrap;
    }

    .quote{
        padding-left: 2rem;

         .content{
            color:var(--text-dark);
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .author{
            display: flex;
            justify-content: end;
            font-size: 0.8rem;
            font-weight: 300;
            color: #666;
        }
    }    
`

export default function Quote(props: { quote: iQuote }) {
    return (
        <StyledQuote>
            <div className='tags'>
                {props.quote.tags.map((tag) => {
                    return <StyledTag label={tag} />
                })}
            </div>

            <FormatQuoteIcon fontSize='large' htmlColor='var(--primary-color)' />

            <div className='quote'>
                <div className='content'>{props.quote.body}</div>
                <div className='author'>{props.quote.author}</div>
            </div>

        </StyledQuote>
    )
}
