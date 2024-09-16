import type { ModeObject } from "../types";

export const MODES = [
	"default",
] as const;

export type ModeType = typeof MODES[number]




export const modeObject: ModeObject = {
	default: {
		name: "Default Mode",
		description: "Description",
	}
}
