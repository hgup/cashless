import Link from "next/link"
export default function Page() {
  return (
    <main className="h-full bg-stone-700 flex flex-col justify-between">
      <div className="flex flex-col">
        <p>You are not permitted to access this page.</p>
        <Link className="bg-white w-min text-black p-5 rounded-sm" href="/">
          {" "}
          Go back home
        </Link>
      </div>
    </main>
  )
}
