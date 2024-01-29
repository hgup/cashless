import { Card } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b  last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Regd */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-12 w-14 rounded "></div>
      </td>
      {/* Student name and info */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full "></Skeleton>
          <Skeleton className="h-6 w-72 rounded "></Skeleton>
        </div>
      </td>
      {/* Room */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-8 rounded "></Skeleton>
      </td>
      {/* Class */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded "></Skeleton>
      </td>
      {/* Balance */}
      <td className="whitespace-nowrap px-3 py-3">
        <Skeleton className="h-6 w-16 rounded "></Skeleton>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          {/* <div className="h-[38px] w-[38px] rounded bg-gray-100 dark:bg-stone-700"></div> */}
          <Skeleton className="h-[38px] w-[38px] rounded "></Skeleton>
        </div>
      </td>
    </tr>
  )
}

export function StudentInfoSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md  p-4">
      <div className="flex items-center justify-between border-b pb-8">
        <div className="flex items-center">
          <Skeleton className="mr-2 h-12 w-12 rounded-full "></Skeleton>
          <Skeleton className="h-6 w-16 rounded "></Skeleton>
        </div>
        <Skeleton className="h-6 w-16 rounded "></Skeleton>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <Skeleton className="h-6 w-16 rounded "></Skeleton>
          <Skeleton className="mt-2 h-6 w-24 rounded "></Skeleton>
        </div>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-10 rounded "></Skeleton>
          <Skeleton className="h-10 w-10 rounded "></Skeleton>
        </div>
      </div>
    </div>
  )
}

export function StudentsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg md:pt-0">
          <div className="md:hidden">
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
          </div>
          <Card>
            <table className="hidden min-w-full text-secondary-background md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                  >
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  )
}
