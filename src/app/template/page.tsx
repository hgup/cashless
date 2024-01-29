import Form from "./edit-form"
import { fetchStudentById } from "@/lib/data"
import { auth } from "@/auth"

export default async function Page() {
  const authsession = await auth()
  if (authsession?.user) {
    const student = await fetchStudentById(authsession?.user.regd_no)

    if (student)
      return (
        <main>
          <h1 className={` mb-4 text-xl text-center md:text-2xl`}>
            Account Settings
          </h1>
          <div className="">
            <Form student={student} />
          </div>
        </main>
      )
  }
  return <main>Not logged in</main>
}
