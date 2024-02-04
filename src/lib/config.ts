import { PrintLayout } from "@prisma/client"

export const status_options = ["ACTIVE", "DISABLED"] as const
export const MAX_FILE_SIZE = 3000000
export const MAX_PRINT_FILE_SIZE = 500000000
export const ACCEPTED_IMAGE_TYPES = ["image/png"]
export const room_numbers = [
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
  "A6",
  "A7",
  "A8",
  "B1",
  "B2",
  "B3",
  "B4",
  "B5",
  "B6",
  "B7",
  "B8",
  "C1",
  "C2",
  "C3",
  "C4",
  "C5",
  "C6",
  "C7",
  "C8",
  "S13",
  "NA",
] as const

export const printlayoutpageFactors = {
  AS_IT_IS: 1,
  MINI: 2,
  MICRO: 4,
  HANDOUT: 6,
}
