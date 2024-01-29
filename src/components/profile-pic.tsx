import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function ProfilePic({
  preview,
  name,
  handleChangeImage,
}: {
  preview: string
  name: string
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <Avatar className="w-24 h-24">
      <AvatarImage className="object-cover" src={preview} />
      <AvatarFallback>{name.split(" ").map((n) => n[0])}</AvatarFallback>
    </Avatar>
  )
}
