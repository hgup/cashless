import { Button } from "@/components/ui/button"
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
// import { createStudent, updateStudent } from "@/lib/actions"

export function CreateStudent() {
  return (
    <Button className="h-12" asChild variant="outline">
      <Link href="/dashboard/student/create">
        <span className="hidden md:block"> Add New Student </span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Button>
  )
}

export function UpdateStudent({ id }: { id: string }) {
  return (
    <Link
      href={`student/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 hover:dark:bg-stone-800"
    >
      <PencilIcon className="w-5" />
    </Link>
  )
}

// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id)
//   return (
//     <>
//       <form action={deleteInvoiceWithId}>
//         <button className="rounded-md border p-2 hover:bg-gray-100">
//           <span className="sr-only">Delete</span>
//           <TrashIcon className="w-5" />
//         </button>
//       </form>
//     </>
//   )
// }
