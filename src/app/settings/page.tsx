import Form from "./edit-form"
import { fetchStudentById } from "@/lib/data"
import { auth } from "@/auth"
import { Card } from "@/components/ui/card"

export default async function Page() {
  const authsession = await auth()
  if (authsession?.user) {
    const student = await fetchStudentById(authsession?.user.regd_no)

    if (student)
      return (
        <main className="m-5 flex w-full flex-row justify-center">
          <div className="w-1/2">
            <h1 className={` mt-8 mb-4 text-2xl ml-2 md:text-3xl`}>
              Account Settings
            </h1>
            <Card className="p-10 ">
              <Form student={student} />
            </Card>
          </div>
        </main>
      )
  }
  return <main>Not logged in</main>
}
