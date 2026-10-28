import { createFileRoute } from "@tanstack/react-router";

type QuizQuestion = {
  q: string;
  a: [string, string, string, string];
  correct: number;
  why: string;
};

export const Route = createFileRoute("/api/generate-quiz")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const apiKey = process.env.OPENAI_API_KEY;
          if (!apiKey) {
            return Response.json(
              { error: "A chave OPENAI_API_KEY não está configurada no servidor." },
              { status: 503 },
            );
          }

          const body = (await request.json()) as { topic?: string; count?: number };
          const topic = typeof body.topic === "string" ? body.topic.slice(0, 300) : "preservação dos oceanos";
          const count = Math.min(10, Math.max(5, Number(body.count) || 10));

          const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: process.env.OPENAI_MODEL || "gpt-4o-mini",
              temperature: 0.8,
              response_format: { type: "json_object" },
              messages: [
                {
                  role: "system",
                  content:
                    "Você cria quizzes educativos em português brasileiro. Retorne apenas JSON válido no formato {\\"questions\\":[{\\"q\\":string,\\"a\\":[string,string,string,string],\\"correct\\":number de 0 a 3,\\"why\\":string}]}. Cada questão deve ter exatamente quatro alternativas plausíveis, uma única correta e uma explicação curta e factual. Varie os temas e não repita perguntas.",
                },
                {
                  role: "user",
                  content: `Crie exatamente ${count} perguntas de múltipla escolha, adequadas para estudantes, sobre: ${topic}. Priorize preservação marinha, mergulho responsável, biodiversidade, poluição e atitudes práticas. Não repita as perguntas do quiz comum; crie questões novas. A propriedade correct é o índice (0–3) da única alternativa correta.`,
                },
              ],
            }),
          });

          if (!aiResponse.ok) {
            const details = await aiResponse.text();
            console.error("OpenAI quiz error:", details);
            return Response.json({ error: "O serviço de IA não conseguiu gerar o quiz. Tente novamente." }, { status: 502 });
          }

          const data = await aiResponse.json();
          const content = data.choices?.[0]?.message?.content;
          if (typeof content !== "string") {
            return Response.json({ error: "A IA retornou uma resposta vazia." }, { status: 502 });
          }

          const parsed = JSON.parse(content) as { questions?: QuizQuestion[] };
          const questions = parsed.questions;
          const valid = Array.isArray(questions) && questions.length === count && questions.every((item) =>
            typeof item.q === "string" &&
            Array.isArray(item.a) &&
            item.a.length === 4 &&
            item.a.every((option) => typeof option === "string" && option.trim().length > 0) &&
            Number.isInteger(item.correct) &&
            item.correct >= 0 &&
            item.correct <= 3 &&
            typeof item.why === "string",
          );

          if (!valid) {
            return Response.json({ error: "A IA retornou perguntas em formato inválido. Tente novamente." }, { status: 502 });
          }

          return Response.json({ questions });
        } catch (error) {
          console.error("Quiz generation failed:", error);
          return Response.json({ error: "Erro inesperado ao gerar o quiz." }, { status: 500 });
        }
      },
    },
  },
});
