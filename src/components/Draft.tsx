import { For, type Component, Show, type JSXElement } from "solid-js";
import { useStore } from "@nanostores/solid";
import { sampleGame, type GameData } from "../types/index";
import { $gameConstantData, $gameCorrectRegistry, $gameCurrentData, $gameOuputs, $gameStatusData, clickOption, startGame } from "../stores/game";
import "../styles/draft.scss";

interface Props {
	data: GameData
}


export const Draft: Component<Props> = (props) => {
	const gameCorrectRegistry = useStore($gameCorrectRegistry);
	const gameOutputs = useStore($gameOuputs);
	const gameStatus = useStore($gameStatusData);
	const gameCurrent = useStore($gameCurrentData);
	const gameConstant = useStore($gameConstantData);

	const clickHandler = (data: string, _: MouseEvent) => {
		clickOption(gameOutputs().current_option, data)
	}

	const clickStart = () => {
		startGame(props.data.data)
	}


	const StartScreen: JSXElement = <>
		<h1 className="game-title">{props.data.title}</h1>

		<button onClick={clickStart} class="game-start-btn">Start Game</button>

	</>


	return <>

		<Show fallback={StartScreen} when={gameStatus().game_started}>
			{/** Status */}
			<section className="game-percent"
			>
				{gameCurrent().answered_questions_count} / {gameConstant().all_questions_count}

				<span class="game-percent-bar" role="progress" aria-valuemin={0} aria-valuemax={100}
					aria-valuenow={Math.floor(gameCurrent().answered_questions_count * 100 / gameConstant().all_questions_count)}
					style={`--value:${Math.floor(gameCurrent().answered_questions_count * 100 / gameConstant().all_questions_count)};`}
					data-is-correct={gameStatus().is_correct}
				></span>
			</section>

			{/** Add options */}
			<section class="game-options" inert={gameStatus().is_marking}>
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
				<p class="game-key-current">{gameOutputs().current_option}</p>
			</section>
		</Show>


	</>
}


