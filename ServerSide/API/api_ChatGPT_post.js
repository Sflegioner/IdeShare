// import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const gpt_route = express.Router();


// const openai = new OpenAIClient(process.env.AZURE_OPENAI_ENDPOINT, new AzureKeyCredential(process.env.AZURE_OPENAI_API_KEY));

// const completion = async (theme1, theme2, theme3) => {
//     try {
//         const response = await openai.getChatCompletions(process.env.AZURE_OPENAI_DEPLOYMENT_ID, [
//             { role: "system", content: "You are a helpful assistant." },
//             {
//                 role: "user",
//                 content: `Write an idea for a start-up post about these keywords: ${theme1}, ${theme2}, ${theme3}.`,
//             },
//         ]);

//         return response.choices[0].message;
//     } catch (error) {
//         console.error("Azure OpenAI API error:", error);
//         return null;
//     }
// };

// gpt_route.get("/get_post_by_ai/:keyword1/:keyword2/:keyword3", async (req, res) => {
//     const { keyword1, keyword2, keyword3 } = req.params;

//     const result = await completion(keyword1, keyword2, keyword3);

//     if (!result) {
//         return res.status(500).json({ error: "Failed to get response from OpenAI" });
//     }

//     return res.status(200).json(result);
// });

// export default gpt_route;
