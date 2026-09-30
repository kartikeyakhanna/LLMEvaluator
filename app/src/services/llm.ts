export async function askLLM(prompt: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return `This is a simulated response to: "${prompt}"`;
}