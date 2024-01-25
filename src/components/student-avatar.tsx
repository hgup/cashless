import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function StudentAvatar({
  src,
  name,
  className,
}: {
  src: string
  name: string
  className?: string
}) {
  return (
    <Avatar className={className}>
      <AvatarImage className="object-cover" src={src} />
      <AvatarFallback>{name.split(" ").map((n) => n[0])}</AvatarFallback>
    </Avatar>
  )
}
