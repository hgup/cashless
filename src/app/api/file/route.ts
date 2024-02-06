import { readFile } from "fs/promises"
import path from "path"

export async function GET(request: Request) {
  let params = new URLSearchParams(new URL(request.url).search)
  //   console.log("URL", request.url)
  //   console.log(params.keys())

  const buffer = await readFile(
    path.join(process.cwd(), params.get("file") ?? "")
  )

  const headers = new Headers()
  headers.append(
    "Content-Disposition",
    `attachment; filename="${params.get("file")}"`
  )
  //   headers.append("Content-Type", "image/png")

  return new Response(buffer, {
    headers,
  })
}
