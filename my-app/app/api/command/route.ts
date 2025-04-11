
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';


const BASE_PROMPT = `
You are a web automation expert. Convert this command to browser actions in strict JSON format.
Make sure the website mentioned in the command is correctly used in the "navigate" action.
If the site is not mentioned, use "https://example.com".

Return ONLY valid JSON:

{
  "actions": [
    {
      "action": "navigate|click|type|wait",
      "target": "selector or URL",
      "value": "optional text",
      "description": "action purpose"
    }
  ]
}

Command: {command}
`;

export async function POST(req: Request) {
  try {
    const groq = createGroq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    const body = await req.json();
    const command = await body.command;
    console.log(`the command  i got is ${command}`)
    const prompt = BASE_PROMPT.replace(`{command}`, command);

    const result = await generateText({
      model: groq('deepseek-r1-distill-llama-70b'),
      prompt,
    });

  
    console.log('Groq response:', result.text);

    return Response.json(
      {
        message: "Generated successfully",
        result: result.text,
      },
      {
        status: 200,
      }
    );

  } catch (e: any) {
    console.error(e);
    return Response.json(
      {
        message: "Something went wrong",
        error: e.message,
      },
      {
        status: 400,
      }
    );
  }
}
