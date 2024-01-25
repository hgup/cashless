import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
// import { createStudent, updateStudent } from "@/lib/actions"

export function CreateStudent() {
  return (
    <Link
      href="/dashboard/student/create"
      className="flex h-10 items-center rounded-lg bg-emerald-800 px-4 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
    >
      <span className="hidden md:block"> Add New Student </span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  )
}

export function UpdateRoom({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/rooms/${id}/edit`}
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
