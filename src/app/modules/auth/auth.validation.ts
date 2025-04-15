import { z } from "zod";

const loginValidation = z.object({
    body: z.object({
        email: z.string({required_error: "email is requird for this field"}),
        password: z.string({required_error: "password is requird for this field"}),
    })
})

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'refresh token is required for this field!'
        })
    })
})

export const AuthValidation = {
    loginValidation,
    refreshTokenValidationSchema
}