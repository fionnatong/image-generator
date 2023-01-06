import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
	const [prompt, setPrompt] = useState("");

  const onPromptChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPrompt(e.target.value || '')
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  }

	return (
		<div className="App">
			<h1>Image Generator</h1>
      <form onSubmit={onSubmit}>
        <input id="prompt" type="text" value={prompt} placeholder="Enter prompt here" onChange={onPromptChange} />
        <button type="submit">Generate!</button>
      </form>
		</div>
	);
}

export default App;
