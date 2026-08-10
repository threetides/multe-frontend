import type { user } from "@/shared/types"
import { atom } from "jotai"

export const userAtom = atom<user>()