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
          const apiKey = process.env["LOVABLE_API_KEY"];
          if (!apiKey) {
            return Response.json({ error: "A IA não está configurada no servidor." }, { status: 503 });
          }

          const body = (await request.json()) as { topic?: string; count?: number };
          const topic = typeof body.topic === "string" ? body.topic.slice(0, 300) : "preservação dos oceanos";
          const count = Math.min(10, Math.max(5, Number(body.count) || 10));

          const schema = {
            type: "object",
            additionalProperties: false,
            required: ["questions"],
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["q", "a", "correct", "why"],
                  properties: {
                    q: { type: "string" },
                    a: { type: "array", items: { type: "string" } },
                    correct: { type: "integer" },
                    why: { type: "string" },
                  },
                },
              },
            },
          };

          const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            headers: {
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              stream: true,
              store: false,
              reasoning: { effort: "low" },
              text: { format: { type: "json_schema", name: "quiz", strict: true, schema } },
              instructions:
                "Você cria quizzes educativos em português brasileiro. Cada questão deve ter exatamente quatro alternativas plausíveis em 'a', uma única correta indicada por 'correct' (índice 0 a 3) e uma explicação curta e factual em 'why'. Varie os temas e não repita perguntas.",
              input: `Crie exatamente ${count} perguntas de múltipla escolha, adequadas para estudantes, sobre: ${topic}. Priorize preservação marinha, mergulho responsável, biodiversidade, poluição e atitudes práticas.`,
            }),
          });

          if (!aiResponse.ok || !aiResponse.body) {
            const details = await aiResponse.text();
            console.error("AI quiz error:", aiResponse.status, details);
            if (aiResponse.status === 429) {
              return Response.json({ error: "Muitas solicitações agora. Aguarde um pouco e tente novamente." }, { status: 429 });
            }
            if (aiResponse.status === 402) {
              return Response.json({ error: "Os créditos de IA acabaram. Adicione créditos ao workspace." }, { status: 402 });
            }
            return Response.json({ error: "A IA respondeu com erro. Tente novamente." }, { status: 502 });
          }

          // Read the streamed response and collect the final text.
          const reader = aiResponse.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let content = "";
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              if (!line.startsWith("data:")) continue;
              const data = line.slice(5).trim();
              if (!data || data === "[DONE]") continue;
              try {
                const evt = JSON.parse(data);
                if (evt.type === "response.output_text.delta") content += evt.delta ?? "";
              } catch {
                /* ignore partial */
              }
            }
          }
          if (!content) {
            return Response.json({ error: "A IA retornou uma resposta vazia." }, { status: 502 });
          }

          let parsed: { questions?: QuizQuestion[] };
          try {
            parsed = JSON.parse(content) as { questions?: QuizQuestion[] };
          } catch {
            return Response.json(
              { error: "A IA gerou uma resposta que não pôde ser lida. Tente novamente." },
              { status: 502 },
            );
          }
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
