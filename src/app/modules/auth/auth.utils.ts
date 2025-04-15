import jwt from "jsonwebtoken";

export const createToken = (jwtPayload: {email: string, role:string}, secret:string, expires_in:string) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn:expires_in
    })
}