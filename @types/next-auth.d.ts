import { JWT, DefaultJWT } from "next-auth/jwt"
import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      role: string
      regd_no: string
      picture: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    role: string
    name: string
    regd_no: string
    picture: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    name: string
    role: string
    regd_no: string
    picture: string
  }
}
