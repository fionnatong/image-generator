import { Configuration, OpenAIApi } from "openai";

const openaiConfig = new Configuration({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

export const generateImage = async (
	prompt: string
): Promise<string | undefined> => {
	const response = await openai.createImage({
		prompt,
		n: 1,
		size: "512x512",
	});
	return response.data.data[0].url;
};
