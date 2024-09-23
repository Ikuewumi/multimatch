import type { ModeType } from "../stores/modes"

export interface Metadata {
	title: string
	date: string
	author: string
	description: string
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

export interface AnalyticsActions {
	onClick: ModeFn
	onCorrect: ModeFn
	onWrong: (option: string, answer: string) => void
	onStart: (all_questions_count: number, registry: Data) => void
	onSetup: ModeFn
	onComplete: ModeFn
	onEnd?: ModeFn
}

export type ModeObject = Record<ModeType, GameType>;

export const sampleGame: GameData = {
	title: "Sample Game on Adrenegic Antagonists",
	description: "",
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

export const sampleGameTwo: GameData = {
	title: "Anti-Parkinson Medications",
	description: "reviewing the various drugs used against parkinson's disease",
	date: "2024-09-16 21:53",
	author: "ayobami",
	data: {
		"dopamine receptor agonist": ["bromocriptine", "cabergoline", "pergolide", "pramipexole", "ropinirole"],
		"dopamine precursor": ["levodopa"],
		"DOPA-decarboxylase inhibitor": ["carbidopa"],
		"ergot dopamine agonist": ["bromocriptine", "cabergoline", "pergolide"],
		"COMT-inhibitor": ["entacapone", "tolcapone"],
		"adverse effect of hepatotoxicity": ["entacapone", "tolcapone"],
		"central-acting COMT-inhibitor": ["tolcapone"],
		"MAO-B inhibitor": ["selegiline", "rasagiline"]
	}
}



export const sampleGameThree: GameData = {
	title: "Introduction to Central Neuropharmacology",
	description: "reviewing the various terms and drugs",
	date: "2024-09-17 23:48",
	author: "ayobami",
	data: {
		"different types of neurotransmitters": ["amino-acid neurotransitters", "acetylcholine", "monoamine neurotransmitters"],
		"monoamine neurotransmitter": ["dopamine", "serotonin", "norepinephrine"],
		"amino-acid neurotransmitter": ["glutamate", "glycine", "GABA"],
		"glycine receptor blocker": ["strychnine"],
		"GABA-A receptor blocker": ["picrotoxin", "bicuculine"],
		"5-hydroxytryptamine alias": ["serotonin"],
		"ionotropic glutamate receptor type": ["AMPA", "NMDA", "KA"],
		"excitatory amino-acid neurotransmitter": ["glutamate"],
		"inhibitory amino-acid neurotransmitter": ["GABA", "glycine"],
		"fight-or-flight neurotransmitter": ["epinephrine"],
		"concentration neurotransmitter": ["norepinephrine"],
		"pleasure neurotransmitter": ["dopamine"],
		"mood neurotransmitter": ["serotonin"],
		"euphoria neurotransmitter": ["endorphins"],
		"learning neurotransmitter": ["acetylcholine"],
		"memory neurotransmitter": ["glutamate"],
		"calming neurotransmitter": ["GABA"],
		"active component of cannabis": ["Δ9-tetrahydrocannabinol"],
		"neuropeptide": ["substance P", "somatostatin", "opioids"],
		"general classification of central-acting drugs": ["sedative-hypnotics", "opioids", "anti-depressants", "anesthetics", "CNS stimulants", "anti-psychotics", "anti-epileptics", "drugs for neurodegenerative diseases"],
		"antidepressant": ["fluoxetine", "amitriptyaline"]

	}
}



export const sampleGameFour: GameData = {
	title: "Local Anesthetics",
	description: "reviewing the various drugs used for anesthesia",
	date: "2024-09-16 21:53",
	author: "ayobami",
	data: {
		"ester local-anesthetic": ["benzocaine", "tetracaine", "cocaine", "procaine", "novocaine", "pontocaine"],
		"procaine alias": ["novocaine"],
		"pontocaine alias": ["tetracaine"],
		"amide local-anesthetic": ["lidocaine", "mepivacaine", "bupivacaine", "levobupivacaine", "ropivacaine", "articaine"]
	}
}
