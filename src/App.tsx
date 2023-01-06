import { ChangeEvent, FormEvent, useState } from "react";
import { generateImage } from "./openai-service";
import "./App.css";

function App() {
	const [prompt, setPrompt] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

	const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(e.target.value || "");
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setImageUrl(undefined);
		setError(false);

		try {
			const url = await generateImage(prompt);
			setImageUrl(url);
		} catch (e) {
			setError(true);
			setImageUrl(undefined);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="App">
			<h1>Image Generator using OpenAI API</h1>
			<form onSubmit={onSubmit}>
				<textarea
					id="prompt"
					value={prompt}
					placeholder="Enter prompt here"
					onChange={onPromptChange}
					disabled={loading}
					rows={3}
				/>
				<button type="submit" disabled={loading}>
					Generate!
				</button>
			</form>
			{loading && <p>Loading...</p>}
			{error && <p>The image could not be generated.</p>}
			{imageUrl && <img src={imageUrl} alt="result" />}
		</div>
	);
}

export default App;
