"use client"

import { updateRoom, updateStudent } from "@/lib/actions"
import { useFormState } from "react-dom"
import React, { useEffect, useState } from "react"
import { State } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

export default function EditInvoiceForm({ room }: { room: rooms }) {
  const initialState = {
    errors: {},
    message: null,
  } as State
  const updateRoomWithId = updateRoom.bind(null, room.room_no)
  const [state, dispatch] = useFormState(updateRoomWithId, initialState)

  const { toast } = useToast()

  return <form action={dispatch}></form>
}
