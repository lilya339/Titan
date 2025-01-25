import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getQuotesService } from "../services/quotes.service";


export async function getQuotes(request: Request, response: Response) {
    try {
        const count = parseInt(request.query.count?.toString() || "");

        if (isNaN(count) || count <= 0) {
            response
                .status(StatusCodes.BAD_REQUEST)
                .json({ "message": "Invaid input" });
            return;
        }

        const quotesToRun = await getQuotesService(count);

        response
            .status(StatusCodes.OK)
            .json({ "message": "quotes fetched successfully", data: quotesToRun });

    } catch (error) {
        console.error("getQuotes", error);
        response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ "message": "Internal server error" });
    }
}