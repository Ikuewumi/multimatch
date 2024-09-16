import { cleanStores } from "nanostores";
import { describe, expect, test, beforeEach } from "vitest";
import { $gameData, checkOption, startGame } from "../stores/game";
import { sampleGame } from "../types";

describe("First Game Tests", () => {

	beforeEach(() => {
		cleanStores($gameData);
	})

	test("Get options and keys", () => {
		startGame(sampleGame.data);
		checkOption("alpha-2 antagonist", "tasmulosin");
		checkOption("alpha-1 antagonist", "tasmulosin");
		checkOption("alpha-adrenergic antagonist", "yohimbine");
		checkOption("non-selective alpha-blocker", "prasozin");
		checkOption("non-selective alpha-blocker", "phenoxybenzamine");
	})

})
