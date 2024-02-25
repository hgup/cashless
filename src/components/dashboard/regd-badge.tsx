import { Badge } from "../ui/badge"

export default function RegdBadge({
  regd_no,
  className,
}: {
  regd_no: string
  className?: string
}) {
  return (
    <Badge variant="outline" className="h-min text-xs">
      <span>{regd_no}</span>
    </Badge>
  )
}
