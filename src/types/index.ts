import type { ModeType } from "../stores/modes"

export interface Metadata {
	title: string
	date: string
	author: string
}

export interface Author {
	name: string
}

export interface AnswerMetadata {
	answered: boolean
}

export type AnswerData = Record<string, AnswerMetadata>
export type Data = Record<string, string[]>
export type ProcessedData = Record<string, AnswerData>

export interface GameData extends Metadata {
	data: Data
}

export interface CurrentGameData extends Metadata {
	data: ProcessedData
}

type ModeFn = () => void;

export type ActionFn = (isCorrect: boolean, isLastElement: boolean) => void;

export interface GameType {
	name: string
	description: string
	onClick?: (option: string, answer: string) => void
	onCorrect?: ModeFn
	onWrong?: ModeFn
	onStart?: ModeFn
	onSetup?: ModeFn
	onComplete?: ModeFn
	onEnd?: ModeFn
}

export type ModeObject = Record<ModeType, GameType>;

export const sampleGame: GameData = {
	title: "Sample Game on Adrenegic Antagonists",
	date: "2024-09-10 10:01",
	author: "ayobami",
	data: {
		"non-selective alpha-blocker": ["phenoxybenzamine", "phentolamine"],
		"alpha-adrenergic antagonist": ["phenoxybenzamine", "phentolamine", "yohimbine", "prasozin", "terasozin", "tasmulosin"],
		"alpha-1 antagonist": ["prasozin", "terasozin", "tasmulosin"],
		"alpha-2 antagonist": ["yohimbine"],
		"prostaglandin-E1 analogue": ["misoprostol", "alprostadil"],
		"prostaglandin-I2 analogue": ["eproprostenol"],
		"prostaglandin-F2 analogue": ["latanoprost", "carboprost"],
		"prostaglandin analogues": ["misoprostol", "eproprostenol", "latanoprost", "carboprost", "alprostadil"],
		"indicated for pulmonary arterial hypertension": ["eproprostenol"]
	}
}
