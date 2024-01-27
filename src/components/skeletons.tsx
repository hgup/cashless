// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b  last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Regd */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-12 w-14 rounded bg-gray-100 dark:bg-stone-700"></div>
      </td>
      {/* Student name and info */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-stone-700"></div>
          <div className="h-6 w-72 rounded bg-gray-100 dark:bg-stone-700"></div>
        </div>
      </td>
      {/* Room */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-8 rounded bg-gray-100 dark:bg-stone-700"></div>
      </td>
      {/* Class */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-stone-700"></div>
      </td>
      {/* Balance */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-stone-700"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          {/* <div className="h-[38px] w-[38px] rounded bg-gray-100 dark:bg-stone-700"></div> */}
          <div className="h-[38px] w-[38px] rounded bg-gray-100 dark:bg-stone-700"></div>
        </div>
      </td>
    </tr>
  )
}

export function StudentInfoSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md dark:bg-black bg-white p-4">
      <div className="flex items-center justify-between border-b pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-12 w-12 rounded-full bg-gray-100 dark:bg-stone-800"></div>
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-stone-800"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100 dark:bg-stone-800"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100 dark:bg-stone-800"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100 dark:bg-stone-800"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100 dark:bg-stone-800"></div>
          <div className="h-10 w-10 rounded bg-gray-100 dark:bg-stone-800"></div>
        </div>
      </div>
    </div>
  )
}

export function StudentsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 dark:bg-black p-2 md:pt-0">
          <div className="md:hidden">
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
            <StudentInfoSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
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
            <tbody className="bg-white dark:bg-stone-900">
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
        </div>
      </div>
    </div>
  )
}
