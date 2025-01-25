import axios, { AxiosInstance } from "axios";
import { ServerContext } from "./ServerContext";



// export namespace iQuotesServer {
//    


//     export function getQuotes(params: iGetQuotesParams) {
//         const url = `${ServerContext.SERVER_URL}/quotes?count=${params.count}`;
//         return ServerUtils.get(url);
//     }
// }

interface iServerRespnose<T> {
    message: string;
    data: T;
}
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
export default class QuotesServer {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: ServerContext.SERVER_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public async getQuotes(count: number) {

        try {
            const response = await this.axiosInstance.get<iServerRespnose<Array<iQuote>>>(`/api/quotes?count=${count}`);
            return response.data;

        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Request failed");
        }
    }
}