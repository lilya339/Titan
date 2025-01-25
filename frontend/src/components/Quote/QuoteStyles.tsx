import styled from "styled-components";

export const StyledQuote = styled.div`
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

         .quote-content{
            color:var(--text-dark);
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .quote-author{
            display: flex;
            justify-content: end;
            font-size: 0.8rem;
            font-weight: 300;
            color: #666;
        }
    }    
`