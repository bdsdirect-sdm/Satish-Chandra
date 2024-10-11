import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret: string = "Password123#@!";

export const authenticateJWT = (req: any, res: any, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer token
    console.log(token)

    if (!token) return res.sendStatus(403);

    jwt.verify(token, secret || '', (err: any, user: any) => {
        console.log("user", user)
        if (err) {
            console.log("<<<<<<<<<<....")
            return res.status(403).json({ message: 'Invalid token.' });
        }

        (req as any).user = user;
        next();
    });
};

export default authenticateJWT