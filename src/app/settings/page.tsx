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
        <main className="m-8 mt-12 flex flex-row justify-center">
          <div className="lg:w-max-[200px]">
            <div className="flex flex-col mb-10 pt-3 items-left gap-5 ">
              <h1
                className={`font-bold text-2xl md:text-2xl  text-neutral-700`}
              >
                Account Settings
              </h1>
            </div>
            <Card className="p-5 lg:p-10 w-full ">
              <Form student={student} />
            </Card>
          </div>
        </main>
      )
  }
  return <main>Not logged in</main>
}
