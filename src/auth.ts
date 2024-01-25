import { UserRoles } from "@prisma/client"
import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { User } from "lucide-react"

// import { sql } from "@vercel/postgres"
// import bcrypt from "bcrypt"

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
//     return user.rows[0]
//   } catch (error) {
//     console.error("Failed to fetch user:", error)
//     throw new Error("Failed to fetch user.")
//   }
// }

async function getUser(regd_no: string) {
  try {
    const user = await prisma?.users.findUnique({
      where: {
        regd_no: regd_no,
      },
    })
    return user
  } catch (error) {
    return null
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            regd_no: z.string().refine((val) => {
              if (val.length == 6 || val.length == 4) {
                return true
              }
              return false
            }),
            password: z.string().length(4),
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { regd_no, password } = parsedCredentials.data
          const user = await getUser(regd_no)
          if (!user) return null
          console.log(user.password)
          //   const passwordsMatch = await bcrypt.compare(password, user.password);
          //   if (passwordsMatch) return user;
          if (user.password == password)
            return {
              id: user.regd_no,
              name: user.name,
              regd_no: user.regd_no,
              password: user.password,
              role: user.role,
            }
          else return null
          // if (regd_no == "hursh@gmail.com" && password == "123456") return {
          //     id: "HG",
          //     name: "Hursh",
          //     email: "hursh@gmail.com",
          //     password: "123456",
          //   }
        }

        console.log("Invalid credentials")
        return null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
})
