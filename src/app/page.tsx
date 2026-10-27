import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from("todos").select();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-950 text-white font-sans">
      <main className="max-w-2xl w-full flex flex-col items-center text-center gap-6 p-8 border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ● Supabase Connected
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          SRM PromptWars
        </h1>
        
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Welcome to the official event platform repository for <strong>Madhan Kumar T</strong>.
          Next.js App Router, Tailwind CSS, and Supabase SSR are configured and ready.
        </p>

        <div className="w-full mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-left">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
            <span>Supabase Query: <code>todos</code> table</span>
            <span className={error ? "text-amber-400" : "text-emerald-400"}>
              {error ? "Table pending setup" : `${todos?.length ?? 0} items`}
            </span>
          </div>
          
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {todos && todos.length > 0 ? (
              todos.map((todo: any) => (
                <li key={todo.id} className="p-2 bg-zinc-900 rounded border border-zinc-800/50">
                  {todo.name || JSON.stringify(todo)}
                </li>
              ))
            ) : (
              <li className="text-xs text-zinc-500 italic">
                {error ? `Note: Create a 'todos' table in your Supabase dashboard to populate live data.` : `No records found in 'todos' table.`}
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-500 pt-2">
          <span>Project Ref: <code className="text-zinc-300">rwwrbghdpzgnuzsnpqpq</code></span>
          <span>•</span>
          <span>Host: <code className="text-zinc-300">Vercel Ready</code></span>
        </div>
      </main>
    </div>
  );
}
