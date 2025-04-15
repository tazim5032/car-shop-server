/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
const ApiNotFound = (req: Request, res: Response, next: NextFunction) =>{
     res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Api Not Found.",
        error: 'Api Not Found'
    })
}

export default ApiNotFound