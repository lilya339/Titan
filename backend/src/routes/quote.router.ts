import { Router } from "express";
import { getQuotes } from "../controllers/quotes.controller";

export const quotesRouter = Router();

quotesRouter.get('/', getQuotes);
