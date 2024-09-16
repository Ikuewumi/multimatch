import { For, type Component, Index, onMount, Show, type JSXElement } from "solid-js";
import { useStore } from "@nanostores/solid";
import { sampleGame, type GameData } from "../types/index";
import { $gameConstantData, $gameCorrectRegistry, $gameCurrentData, $gameData, $gameOuputs, $gameStatusData, checkOption, clickOption, startGame } from "../stores/game";

interface Props {
	data: GameData
}

interface OptionAndKey {
	key: string
	option: string
}


export const Draft: Component<Props> = () => {
	const gameData = useStore($gameData);
	const gameCorrectRegistry = useStore($gameCorrectRegistry);
	const gameOutputs = useStore($gameOuputs);
	const gameStatus = useStore($gameStatusData);
	const gameCurrent = useStore($gameCurrentData);
	const gameConstant = useStore($gameConstantData);

	const clickHandler = (data: string, event: MouseEvent) => {
		clickOption(gameOutputs().keys[0], data)
	}

	const clickStart = () => {
		startGame(sampleGame.data)
	}


	const StartScreen: JSXElement = <>

		<button onClick={clickStart} class="game-start-btn">Start Game</button>

	</>


	return <>

		<h1 className="game-start-h1">Sample Game on Prostanoid analoges and Adrenegic Antagonists</h1>
		<Show fallback={StartScreen} when={gameStatus().game_started}>
			{/** Status */}
			<section className="game-status">
				{gameStatus().is_correct ? "Correct" : "Incorrect"}
			</section>

			<section className="game-percent">
				{gameCurrent().answered_questions_count} / {gameConstant().all_questions_count}
			</section>

			{/** Add options */}
			<section class="game-options">
				<ul class="game-options-list">
					<For each={gameOutputs().options}>
						{(option, index) => <li data-index={index()} class="game-options-li">
							<button
								disabled={gameCorrectRegistry()[gameOutputs().current_option].includes(option)}
								onClick={[clickHandler, option]} class="game-options-btn">{option}</button>
						</li>}
					</For>
				</ul>
			</section>


			{/** Add questions */}
			<section class="game-key">
				<span className="game-key-current">{gameOutputs().current_option}</span>
			</section>
		</Show>


	</>
}


