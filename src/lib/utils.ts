import {
  PrintOrientations,
  PrintDuplexity,
  PrintLayout,
  PrintStatus,
  PrintType,
} from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { split } from "postcss/lib/list"
import { twMerge } from "tailwind-merge"
import { printlayoutpageFactors } from "./config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  })
}

export function getNumPages(exp: string | null) {
  if (!exp) return 0
  const pages = exp.split(",").map((page) => page.trim())
  let sum = 0
  pages.forEach((page) => {
    if (page.includes("-")) {
      let nums = page.split("-")
      sum += Number(nums[1]) - Number(nums[0]) + 1
    } else {
      sum += 1
    }
  })
  return sum
}
export function getTentativeCost(data: {
  orientation: PrintOrientations
  sides: PrintDuplexity
  pages: string | null
  page_layout: PrintLayout
  particulars?: string | null
  num_of_copies: number
  file_pages: number
}) {
  let numPages
  if (data.pages) {
    numPages = getNumPages(data.pages)
  } else {
    numPages = data.file_pages
  }
  const printedPages =
    Math.ceil(numPages / printlayoutpageFactors[data.page_layout]) *
    data.num_of_copies
  return printedPages
}

export function getOrderFileName(file: string) {
  let a = file.split("/").pop()
  let b = a?.split("-")
  b?.shift()

  return b?.join("-") ?? ""
}
