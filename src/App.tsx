import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { generateImage } from "./openai-service";

function App() {
	const [prompt, setPrompt] = useState("");

	const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(e.target.value || "");
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const url = await generateImage(prompt);
	};

	return (
		<div className="App">
			<h1>Image Generator</h1>
			<form onSubmit={onSubmit}>
				<textarea
					id="prompt"
					value={prompt}
					placeholder="Enter prompt here"
					onChange={onPromptChange}
					rows={2}
				/>
				<button type="submit">Generate!</button>
			</form>
		</div>
	);
}

export default App;
