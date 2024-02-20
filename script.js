import { client } from "@gradio/client";

const app = await client("https://k2-fsa-text-to-speech.hf.space/--replicas/oq9y7/");
const result = await app.predict("/process", [		
				"English", // string  in 'Language' Radio component		
				"csukuangfj/vits-piper-en_US-glados", // string  in 'Select a model' Dropdown component		
				"Hello!!", // string  in 'Input text' Textbox component		
				"Hello!!", // string  in 'Speaker ID' Textbox component		
				0.1, // number (numeric value between 0.1 and 10) in 'Speed (larger->faster; smaller->slower)' Slider component
	]);

console.log(result.data);