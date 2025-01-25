import { KeyboardEventHandler, useState } from 'react'
import { Alert } from '@mui/material';
import Quote from '../Quote/Quote';
import QuotesServer, { iQuote } from '../../server/QuotesServer';
import TagSearch from '../Tags/TagSearch';
import { StyledButton, StyledTextField } from './ContentStyles';

const MAX_COUNT = 100;
export default function Content() {
    const [quotesCount, setQuotesCount] = useState(1);
    const [quotes, setQuotes] = useState<Array<iQuote>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const quotesServer = new QuotesServer();

    const onChangeQuotes = (e) => {
        const newCount = parseInt(e.target.value);

        setQuotesCount(Math.max(0, Math.min(MAX_COUNT, newCount)));
    }

    async function onClickQuotesHandler() {

        setIsLoading(true);

        quotesServer.getQuotes(quotesCount, tags).then((quotes) => {
            setQuotes(quotes.data);
            setError(null);

        }).catch(() => {
            setQuotes([]);
            setError("Error occurred while fetching quotes, please try again");

        }).finally(() => {
            setIsLoading(false);
        });
    }

    function getQuotesObjects() {
        return quotes.map((quote, index) => {
            return <Quote key={index} quote={quote} />
        })
    }

    function onKeyUpCaptureHandler(e) {
        if (e.key.toLowerCase() === "enter") {
            onClickQuotesHandler();
        }
    }

    return (
        <div className='content' >
            <div className='controls-header'>
                <div className='controls'>

                    <StyledTextField
                        size='small'
                        label="Quotes number"
                        variant="outlined"
                        value={quotesCount}
                        type='number'
                        onKeyUpCapture={onKeyUpCaptureHandler}
                        onChange={onChangeQuotes} />

                    <StyledButton
                        loading={isLoading}
                        loadingPosition="start"
                        className={`${isLoading ? "disabled" : ""}`}
                        variant="contained"
                        onClick={onClickQuotesHandler}>
                        {isLoading ? "Loading quotes..." : "Generate quotes"}
                    </StyledButton>
                </div>
                <TagSearch tags={tags} setTags={setTags} />
            </div>

            {(!isLoading && quotes.length > 0) &&
                <div className='quotes-container' >
                    {getQuotesObjects()}
                </div>
            }

            {!isLoading && error != null &&
                <Alert className='w-100' severity="error">{error}</Alert>
            }
        </div>

    )
}
