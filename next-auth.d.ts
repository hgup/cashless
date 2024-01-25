import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string // I added name and email (1)
      regd_no: string
      role: string
    } & DefaultUser // the stuff you'd get like image username, email etc from the provider
  }

  interface User extends DefaultUser {
    role: string
    regd_no: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string
    regd_no: string // (2) I had to add it here too
  }
}

// the data will come to the JWT and then go to the session
