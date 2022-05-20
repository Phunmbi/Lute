import { Dispatch, SetStateAction } from "react"

export interface ICurrentUser {
	isLoggedIn: boolean
	email?: string
	fullName?: string
}

export interface IModal {
	open: false
}
