import { useState } from 'react'
import { TextField, Button, styled } from '@mui/material';
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

    const quotesServer = new QuotesServer();
    const onChangeQuotes = (e) => {
        setQuotesCount(parseInt(e.target.value));
    }

    async function onClickQuotesHandler() {

        setIsLoading(true);

        quotesServer.getQuotes(quotesCount).then((quotes) => {

            setQuotes(quotes.data);


        }).catch((error) => {

            console.log(error);

        }).finally(() => {
            console.log('finally');
            setIsLoading(false);
        });;

    }

    function getQuotesObjects() {
        return quotes.map((quote, index) => {
            return <Quote key={index} quote={quote} />
        })
    }

    return (
        <div className='w-100 d-flex flex-column justify-content-center align-items-center' >

            <div className='p-3 w-100 d-flex' style={{ gap: '1rem' }}>

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

            <TagSearch className="w-100 p-3  " tags={tags} setTags={setTags} />


            {(!isLoading && quotes.length > 0) &&
                <div className='p-3 d-flex flex-column justify-content-center align-items-center' style={{ gap: '1rem' }}>
                    {getQuotesObjects()}
                </div>
            }
        </div>

    )
}
