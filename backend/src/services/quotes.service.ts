import axios from "axios";

interface iQuote {
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

export async function getQuotesService(count: number) {
    const quotesToRun = new Array<iQuote>();

    while (quotesToRun.length < count) {

        const URL = 'https://favqs.com/api/qotd';

        axios.get(URL).then((response) => {
            quotesToRun.push(response.data.quote);
        }).catch((error) => {
            console.error(error);
        });

        await sleep(10);
    }

    return quotesToRun;
}

async function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    })
}
