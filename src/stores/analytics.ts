import { map } from "nanostores"
import type { AnalyticsActions, Data } from "../types";
import { $gameCorrectRegistry } from "./game";

const DEFAULT_ANALYTICS_COUNT_DATA = {
	all_questions_count: 0,
	answered_questions_count: 0,
	attempts_count: 0,
	wrong_questions_count: 0
}

const DEFAULT_ANALYTICS_TIME_DATA = {
	start_time: 0,
	end_time: 0
}

const DEFAULT_ANALYTICS_STATUS_DATA = {
	analytics_started: false,
	analytics_ended: false
}

const DEFAULT_ANALYTICS_INFO = {
	accuracy: 0,
	time_taken: 0,
	time_per_question: 0,
	wrong_questions_count: 0,
	answered_questions_count: 0,
	all_questions_count: 0,
	attempts_count: 0,
	correction_data: {} as Data
}

export const $analyticsCountData = map({ ...DEFAULT_ANALYTICS_COUNT_DATA });
export const $analyticsTimeData = map({ ...DEFAULT_ANALYTICS_TIME_DATA });
export const $analyticsStatusData = map({ ...DEFAULT_ANALYTICS_STATUS_DATA });
export const $analyticsInfo = map({ ...DEFAULT_ANALYTICS_INFO });
export const $analyticsCorrectRegistry = map({} as Data);


const processAnalyticsData = () => {
	const { start_time, end_time } = $analyticsTimeData.get();
	const { wrong_questions_count, all_questions_count, attempts_count, answered_questions_count } = $analyticsCountData.get()
	const time_taken = Math.floor((end_time - start_time) / 1000);

	const correction_data = {}

	Object.keys($analyticsCorrectRegistry.get()).forEach(key => {
		correction_data[key] = $gameCorrectRegistry.get()[key];
	})

	$analyticsInfo.set({
		accuracy: Math.floor(answered_questions_count * 100 / attempts_count),
		time_taken,
		time_per_question: +((time_taken / attempts_count).toFixed(2)),
		wrong_questions_count,
		all_questions_count,
		attempts_count,
		answered_questions_count,
		correction_data
	})

}


export const analyticsActions: AnalyticsActions = {
	onSetup: () => {
		$analyticsTimeData.set({ ...DEFAULT_ANALYTICS_TIME_DATA });
		$analyticsCountData.set({ ...DEFAULT_ANALYTICS_COUNT_DATA });
		$analyticsStatusData.set({ ...DEFAULT_ANALYTICS_STATUS_DATA });
		$analyticsCorrectRegistry.set({});
	},

	onStart: (all_questions_count, registry) => {
		$analyticsCountData.setKey("all_questions_count", all_questions_count);
		$analyticsTimeData.setKey("start_time", Date.now());
		$analyticsStatusData.setKey("analytics_started", true);
	},

	onClick: () => {
		const { attempts_count } = $analyticsCountData.get();
		$analyticsCountData.setKey("attempts_count", attempts_count + 1);
	},

	onCorrect: () => {
		const { answered_questions_count } = $analyticsCountData.get();
		$analyticsCountData.setKey("answered_questions_count", answered_questions_count + 1);
	},

	onWrong: (question: string, answer: string) => {
		const { wrong_questions_count } = $analyticsCountData.get();
		$analyticsCountData.setKey("wrong_questions_count", wrong_questions_count + 1);

		const analytics_registry = $analyticsCorrectRegistry.get();
		const wrong_options = (question in analytics_registry) ?
			Array.from(new Set([...analytics_registry[question], answer])) :
			[answer]
			;

		$analyticsCorrectRegistry.setKey(question, wrong_options);

	},

	onComplete: () => {
		$analyticsTimeData.setKey("end_time", Date.now());
		processAnalyticsData();
		$analyticsStatusData.setKey("analytics_started", false);
		$analyticsStatusData.setKey("analytics_ended", true);
	}
}
