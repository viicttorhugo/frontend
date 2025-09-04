import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function ExamAIPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");

  async function interpret() {
    setResult("Analisando…");
    try {
      // quando houver endpoint real de IA, troque a URL abaixo
      const data = await apiFetch("/me/status");
      setResult(JSON.stringify(data, null, 2));
    } catch (e: any) {
      setResult(e.message || "Erro");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">IA — Interpretação de Exames</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 border rounded mb-3"
        rows={6}
        placeholder="Cole aqui resultados do exame e dados clínicos relevantes…"
      />
      <button onClick={interpret} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
        Interpretar (IA)
      </button>
      {result && (
        <pre className="mt-4 p-3 bg-gray-900 text-green-200 rounded overflow-auto">{result}</pre>
      )}
    </div>
  );
}
