import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export namespace ServerUtils {

    export function get(url: string) {
        return new Promise((resolve, reject) => {

            const config: AxiosRequestConfig = {
                method: "get",
                maxBodyLength: Infinity,
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios.request(config)
                .then((response: AxiosResponse) => resolve(response))
                .catch((error) => reject(error));
        })
    }
}