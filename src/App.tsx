import { ChangeEvent, FormEvent, useState } from "react";
import { CreateImageRequestSizeEnum } from "openai";
import { generateImage } from "./openai-service";
import "./App.css";

interface IImageSize {
	[key: string]: CreateImageRequestSizeEnum;
}

const ImageSize: IImageSize = {
	Small: CreateImageRequestSizeEnum._256x256,
	Medium: CreateImageRequestSizeEnum._512x512,
	Large: CreateImageRequestSizeEnum._1024x1024,
};

function App() {
	const [prompt, setPrompt] = useState<string>("");
	const [size, setSize] = useState<CreateImageRequestSizeEnum>(CreateImageRequestSizeEnum._256x256);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

	const onPromptChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setPrompt(e.target.value || "");
	};

	const onSizeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
		setSize(e.target.value as CreateImageRequestSizeEnum);
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setImageUrl(undefined);
		setError(false);

		try {
			const url = await generateImage(prompt, size);
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
				<select name="Image size" id="size" onChange={onSizeChange}>
					{Object.entries(ImageSize).map(([key, value]) => (
						<option value={value}>{key}</option>
					))}
				</select>
				<button type="submit" disabled={loading}>Generate!</button>
			</form>
			{loading && <p>Loading...</p>}
			{error && <p>The image could not be generated.</p>}
			{imageUrl && <img src={imageUrl} alt="result" />}
		</div>
	);
}

export default App;
