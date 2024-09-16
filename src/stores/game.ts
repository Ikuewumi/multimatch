import { computed, deepMap, map } from "nanostores";
import { type AnswerData, type AnswerMetadata, type Data, type ProcessedData } from "../types";
import { MODES, type ModeType } from "../stores/modes"
import { shuffle } from "../composables";

export const $gameData = map({} as ProcessedData);

export const $gameOuputs = computed($gameData, (gameData) => {
	const gameDataKeys = Object.keys(gameData);
	const gameDataValues = Object.values(gameData);

	const keys: string[] = shuffle(gameDataKeys);
	const flatValuesArray: string[] = gameDataValues.flat().map(dataValue => Object.keys(dataValue)).flat();
	const options: string[] = shuffle(Array.from(new Set(flatValuesArray)));
	const current_option = keys.length ? keys[0] : null;

	return { options, keys, current_option };
})


const DEFAULT_GAME_CURRENT_DATA = {
	option: "",
	answer: "",
	answered_questions_count: 0,
}

const DEFAULT_GAME_CONSTANT_DATA = {
	all_questions_count: 0
}

const DEFAULT_GAME_STATUS_DATA = {
	game_started: false,
	is_marking: false,
	is_correct: false
}

const DEFAULT_GAME_MODE_DATA = {
	mode: "default" as ModeType,
	lives: 0,
	timer_id: 0,
	time: 0,
}

export const $gameCurrentData = map({ ...DEFAULT_GAME_CURRENT_DATA });

export const $gameConstantData = map({ ...DEFAULT_GAME_CONSTANT_DATA });

export const $gameStatusData = map({ ...DEFAULT_GAME_STATUS_DATA });

export const $gameModeData = map({ ...DEFAULT_GAME_MODE_DATA });

export const $gameCorrectRegistry = map({} as Data);


const resetGameData = () => {
	$gameStatusData.off();
	$gameCurrentData.off();
	$gameConstantData.off();

	$gameStatusData.set({ ...DEFAULT_GAME_STATUS_DATA });
	$gameCurrentData.set({ ...DEFAULT_GAME_CURRENT_DATA });
	$gameConstantData.set({ ...DEFAULT_GAME_CONSTANT_DATA });
}

const onStart = () => {
	const totalQuestionCount = $gameConstantData.get().all_questions_count;
	$gameCurrentData.subscribe((currentData, _, changedKey) => {
		switch (changedKey) {
			case "answered_questions_count":
				// Complete the Game if there are no more questions unanswered
				if (currentData.answered_questions_count === totalQuestionCount) {

				}

				break;
		}

	})
}


const DEFUALT_ANSWER_METADATA: AnswerMetadata = {
	answered: false
}

const processGameData = (gameData: Data) => {
	const processedData = {} as ProcessedData
	const registry = {} as Data

	const gameKeys = Object.keys(gameData);
	gameKeys.forEach(gameKey => {
		const answerData: AnswerData = {}
		const gameValues = gameData[gameKey]

		gameValues.forEach(gameValue => {
			answerData[gameValue] = { ...DEFUALT_ANSWER_METADATA }
		})

		processedData[gameKey] = answerData;
		registry[gameKey] = [];
	})

	console.log(processedData)

	return { processedData, registry };
}

const initCorrectRegistry = (gameData: Data) => {
	const registry = { ...gameData };
	Object.keys(registry).forEach(key => {
		registry[key] = []
	})

	return registry;
}

export const startGame = (gameData: Data) => {
	// Assuming the mode is valid, and the game data is too....
	// @TODO: validate the game data and mode

	resetGameData();


	const mode = $gameModeData.get().mode
	MODES[mode]?.onSetup();

	const { processedData, registry } = processGameData(gameData);

	$gameCorrectRegistry.set(registry);
	$gameData.set(processedData);
	$gameConstantData.setKey("all_questions_count", Object.values(gameData).flat().length);
	$gameStatusData.setKey("game_started", true);

	// onStart();
	MODES[mode]?.onStart();
}


export const checkOption = (key: string, answer: string) => {
	const { options, keys } = $gameOuputs.get();
	console.dir(options, keys)
	const argumentsAreValid = keys.includes(key) && options.includes(answer);

	if (!argumentsAreValid) throw Error("something went wrong...The option and/or answer are not in storage");

	const optionIsCorrect = $gameData.get()[key][answer] !== undefined;
	console.log(
		`
Key: ${key}
Answer: ${answer}
Options in Key: ${Object.keys($gameData.get()[key])}
Option Is Correct: ${optionIsCorrect}
`
	);

	return {
		isCorrect: optionIsCorrect,
	};
}


const onCorrect = (key: string, answer: string) => {
	const mode = $gameModeData.get().mode;
	const answeredQuestionsCount = $gameCurrentData.get().answered_questions_count + 1;
	const isComplete = answeredQuestionsCount === $gameConstantData.get().all_questions_count;

	$gameCurrentData.setKey("answered_questions_count", answeredQuestionsCount);


	if (isComplete) {
		$gameData.set({});
		MODES[mode]?.onComplete();
	} else {

		const newOptions = { ...$gameData.get()[key] };
		newOptions[answer].answered = true;
		$gameCorrectRegistry.setKey(key, [...$gameCorrectRegistry.get()[key], answer]);
		$gameData.setKey(key, newOptions)

		const isLastElement = !(Object.values($gameData.get()[key]).map(value => value.answered).includes(false))
		if (isLastElement) {
			$gameData.setKey(key, undefined);
		}

		MODES[mode]?.onCorrect();
	}
}



const onWrong = (key: string, answer: string) => {
	const mode = $gameModeData.get().mode;
	MODES[mode]?.onWrong();
}


export const clickOption = (key: string, answer: string) => {
	try {
		$gameStatusData.setKey("is_marking", true);
		const { isCorrect } = checkOption(key, answer);
		$gameStatusData.setKey("is_correct", isCorrect);


		if (isCorrect) { onCorrect(key, answer); }
		else { onWrong(key, answer); }

	} catch (e) {
		console.error(e);
	} finally {
		$gameStatusData.setKey("is_marking", false);
	}
}



