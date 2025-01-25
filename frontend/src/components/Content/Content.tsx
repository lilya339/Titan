import { useState } from 'react'
import { TextField, Button, styled, Alert } from '@mui/material';
import Quote from '../Quote/Quote';
import QuotesServer, { iQuote } from '../../server/QuotesServer';
import TagSearch from '../Tags/TagSearch';

const StyledButton = styled(Button)({
    "&.MuiButton-root": {
        backgroundColor: `var(--primary-color)`,
        color: `var(--white)`,
        "&:hover": {
            backgroundColor: `var(--primary-color-dark)`,
        }
    }
});

export default function Content() {
    const [quotesCount, setQuotesCount] = useState(1);
    const [quotes, setQuotes] = useState<Array<iQuote>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState<string | null>("Error occurred while fetching quotes, please try again");

    const quotesServer = new QuotesServer();
    const onChangeQuotes = (e) => {
        setQuotesCount(parseInt(e.target.value));
    }

    async function onClickQuotesHandler() {

        setIsLoading(true);

        quotesServer.getQuotes(quotesCount, tags).then((quotes) => {

            setQuotes(quotes.data);


        }).catch(() => {
            setError("Error occurred while fetching quotes, please try again");

        }).finally(() => {
            setIsLoading(false);
        });;

    }

    function getQuotesObjects() {
        return quotes.map((quote, index) => {
            return <Quote key={index} quote={quote} />
        })
    }

    return (
        <div className='p-3 w-100 d-flex flex-column justify-content-center align-items-center gap-4' >

            <div className='w-100 d-flex' style={{ gap: '1rem' }}>

                <TextField
                    size='small'
                    className='w-50'
                    label="Quotes number"
                    variant="outlined"
                    value={quotesCount}
                    type='number'
                    onChange={onChangeQuotes} />

                <StyledButton

                    loading={isLoading}
                    loadingPosition="start"
                    className={`w-50  ${isLoading ? "disabled" : ""}`} variant="contained" onClick={onClickQuotesHandler}>
                    {isLoading ? "Loading quotes..." : "Generate quotes"}
                </StyledButton>

            </div>

            <TagSearch className="w-100   " tags={tags} setTags={setTags} />

            {(!isLoading && quotes.length > 0) &&
                <div className='p-3 d-flex flex-column justify-content-center align-items-center' style={{ gap: '1rem' }}>
                    {getQuotesObjects()}
                </div>
            }

            {!isLoading && error != null &&

                <Alert className='w-100' severity="error" >{error}</Alert>
            }
        </div>

    )
}
