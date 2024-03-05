import Navbar from "./navbar"
import { auth } from "@/auth"

export default async function Nav() {
  const authUser = (await auth())?.user
  if (authUser) return <Navbar authUser={authUser} />
}
