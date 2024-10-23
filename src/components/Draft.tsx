import { For, type Component, Show, type JSXElement, createEffect, onCleanup } from "solid-js";
import { useStore } from "@nanostores/solid";
import { sampleGame, type GameData } from "../types/index";
import { $gameConstantData, $gameCorrectRegistry, $gameCurrentData, $gameOuputs, $gameStatusData, clickOption, startGame, stopGame } from "../stores/game";
import "../styles/draft.scss";
import { $analyticsInfo, $analyticsStatusData } from "../stores/analytics";
import { decodeString } from "../composables";

interface Props {
	data: string
}


export const Draft: Component<Props> = (props) => {
	const gameCorrectRegistry = useStore($gameCorrectRegistry);
	const gameOutputs = useStore($gameOuputs);
	const gameStatus = useStore($gameStatusData);
	const gameCurrent = useStore($gameCurrentData);
	const gameConstant = useStore($gameConstantData);
	const analyticsStatus = useStore($analyticsStatusData);
	const analyticsInfo = useStore($analyticsInfo);

	const data = () => JSON.parse(decodeString(props.data)) as GameData;

	createEffect(() => {
		const header = document.querySelector("header.header");

		if (gameStatus().game_started) {
			header.setAttribute("inert", "")
			header.classList.add("sr-only")
		} else {
			header.removeAttribute("inert")
			header.classList.remove("sr-only")
		}

	})


	const clickHandler = (data: string, _: MouseEvent) => {
		clickOption(gameOutputs().current_option, data)
	}

	const clickStart = () => {
		startGame(data().data)
	}

	const clickStop = () => {
		stopGame();
	}


	onCleanup(() => {
		stopGame();
	})

	const StartScreen: JSXElement = <>
		<h1 className="game-title">{data().title}</h1>
		<p className="game-desc">{data().description}</p>

		<button onClick={clickStart} class="game-start-btn">Start Game</button>
		{/** <button onClick={clickStart} class="game-start-btn">Start FlashCards</button> **/}

	</>


	return <>

		<Show fallback={StartScreen} when={gameStatus().game_started}>
			{/** Stop Button */}
			<button onClick={clickStop} className="game-stop-btn">
				Stop Game
			</button>

			{/** Status */}
			<section className="game-percent"
			>
				{gameCurrent().answered_questions_count} / {gameConstant().all_questions_count}

				<span class="game-percent-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100}
					aria-valuenow={Math.floor(gameCurrent().answered_questions_count * 100 / gameConstant().all_questions_count)}
					style={`--value:${Math.floor(gameCurrent().answered_questions_count * 100 / gameConstant().all_questions_count)};`}
					data-is-correct={gameStatus().is_correct}
				></span>
			</section>

			{/** Add options */}
			<section class="game-options" inert={gameStatus().is_marking} disabled={gameStatus().is_marking}>
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

		<Show when={analyticsInfo().all_questions_count > 0 && !gameStatus().game_started}>
			<section className="game-analytics">
				<h2 className="game-analytics-heading">Last Quiz Scores...</h2>
				<p className="game-analytics-desc"></p>

				<dl className="game-analytics-list">

					<div className="game-analytics-item">
						<dt className="game-analytics-title">Total Questions</dt>
						<dd className="game-analytics-text">{analyticsInfo().all_questions_count}</dd>
					</div>

					<div className="game-analytics-item">
						<dt className="game-analytics-title">Attempts</dt>
						<dd className="game-analytics-text">{analyticsInfo().attempts_count}</dd>
					</div>
					<div className="game-analytics-item">
						<dt className="game-analytics-title">Questions Answered</dt>
						<dd className="game-analytics-text">{analyticsInfo().answered_questions_count}</dd>
					</div>
					<div className="game-analytics-item">
						<dt className="game-analytics-title">Wrong Questions</dt>
						<dd className="game-analytics-text">{analyticsInfo().wrong_questions_count}</dd>
					</div>


					<div className="game-analytics-item">
						<dt className="game-analytics-title">Accuracy</dt>
						<dd className="game-analytics-text">{analyticsInfo().accuracy}%</dd>
					</div>
					<div className="game-analytics-item">
						<dt className="game-analytics-title">Time Taken</dt>
						<dd className="game-analytics-text">{analyticsInfo().time_taken}s</dd>
					</div>
					<div className="game-analytics-item">
						<dt className="game-analytics-title">Time per Question</dt>
						<dd className="game-analytics-text">{analyticsInfo().time_per_question}s</dd>
					</div>

				</dl>
			</section>

			<section className="game-analytics">
				<h2 className="game-analytics-heading">❌ Failed Questions</h2>


				<dl className="game-analytics-list-answers">

					<For each={Object.keys(analyticsInfo().correction_data)}>
						{(question, index) => <div className="game-analytics-item game-analytics-item-answer" data-index={index()}>
							<dt className="game-analytics-title"><strong>Question</strong>: {question}</dt>
							<dd className="game-analytics-text-answer"><strong>Answer</strong>: {analyticsInfo().correction_data[question].join(", ")}</dd>
						</div>}

					</For>
				</dl>



			</section>

		</Show>


	</>
}


