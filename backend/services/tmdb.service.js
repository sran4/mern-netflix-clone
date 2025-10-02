import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
	const options = {
		headers: {
			accept: "application/json",
			Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
		},
	};
   console.log("headers", options);
   console.log("url",url)
	const response = await axios.get(url, options);
    console.log("response",response)
	if (response.status !== 200) {
        console.error("Error:", error.response || error.message || error);
		throw new Error("Failed to fetch data from TMDB" + response.statusText);
	}

	return response.data;
};
