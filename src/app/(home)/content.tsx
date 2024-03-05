import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default async function Content() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="homeAnim animate-fade-up bg-gradient-to-br from-black opacity-0 to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent  drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Introducing Cashless
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-500 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          A one stop solution to all your cash payments, in your hostel. Made in
          SSSIHL for SSSIHL.
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Button asChild>
            <Link href="/login">Go to Cashless</Link>
          </Button>
        </div>
      </div>
      <div className="z-10 my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  )
}

const features = [
  {
    title: "Beautiful, reusable components",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    large: true,
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
  },
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
  },
  {
    title: "Hooks, utilities, and more",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
  },
]
