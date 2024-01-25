import NextAuth from "next-auth"
import type { NextAuthConfig, User } from "next-auth"
import { UserRoles } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import next from "next"

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

// declare module "next-auth" {
//   interface Session {
//     user: {
//       role?: UserRoles
//       picture?: string
//     } & Omit<User, "id">
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
export const authConfig = {
  // debug: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            regd_no: z.string().max(10),
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
              name: `${user.name}-${user.role}`,
              image: user.photo,
              regd_no: user.regd_no,
              role: user.role,
            }
          else return null
        }

        console.log("Invalid credentials")
        return null
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      if (!isLoggedIn) return false
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      const isOnStudent = nextUrl.pathname.startsWith("/student")
      const isOnPhotocopy = nextUrl.pathname.startsWith("/photocopy")
      const role = auth?.user.name.split("-").slice(-1)[0]

      if (role === "CENTRAL_ADMIN"){
        if (nextUrl.pathname.startsWith("/login")){
          return Response.redirect(new URL("/admin/dashboard", nextUrl))
        } else return true;
      }

      if (
        isOnAdmin &&
        (role === "CENTRAL_ADMIN" ||
          role === "TEACHER_ADMIN" ||
          role === "ACCOUNTANT")
      ) {
        if (!nextUrl.pathname.startsWith("/admin/dashboard"))
          return Response.redirect(new URL("/admin/dashboard", nextUrl))
        else return true
      }
      switch(role){
        case "STUDENT": return isOnStudent ? true : Response.redirect(new URL("/student",nextUrl))
        case "PHOTOCOPY": return (isOnPhotocopy || isOnStudent) ? true : Response.redirect(new URL("/student",nextUrl))
      }

    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
