
"use client";

import { useEffect, useState } from "react";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: number;
  email: string;
};

type AuthMode = "login" | "register";

const columns: { status: TaskStatus; label: string }[] = [
  { status: "TODO", label: "A fazer" },
  { status: "IN_PROGRESS", label: "Em andamento" },
  { status: "DONE", label: "Concluída" },
];

const priorityLabels: Record<TaskPriority, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
};

export default function Home() {

const [loggingOut, setLoggingOut] = useState(false);

async function handleLogout() {
  if (loggingOut) return;

  setLoggingOut(true);
  setError("");

  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Não foi possível encerrar a sessão.");
    }

    setUser(null);
    setTasks([]);
    setPassword("");
    setNewTaskTitle("");
    setAuthMode("login");
  } catch {
    setError("Erro ao sair. Tente novamente.");
  } finally {
    setLoggingOut(false);
  }
}


  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState("");

  // NEXT.JS: Check whether a session already exists.
  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/auth/me");

        if (response.status === 401) {
          setUser(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to check session.");
        }

        const currentUser: User = await response.json();
        setUser(currentUser);
        await loadTasks();
      } catch {
        setError("Não foi possível verificar sua sessão. Tente recarregar a página.");
      } finally {
        setLoading(false);
      }
    }

    async function loadTasks() {
      const response = await fetch("/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to load tasks.");
      }

      const data: Task[] = await response.json();
      setTasks(data);
    }

    checkSession();
  }, []);

  // NEXT.JS: Submit registration or login credentials.
  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (authenticating) return;

    setAuthenticating(true);
    setError("");

    try {
      const response = await fetch(
        authMode === "login"
          ? "/api/auth/login"
          : "/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível autenticar.");
      }

      // Registration creates an account; login creates the session cookie.
      if (authMode === "register") {
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const loginResult = await loginResponse.json();

        if (!loginResponse.ok) {
          throw new Error(
            loginResult.error ?? "Conta criada, mas não foi possível entrar.",
          );
        }

        setUser(loginResult as User);
      } else {
        setUser(result as User);
      }

      const tasksResponse = await fetch("/api/tasks");

      if (!tasksResponse.ok) {
        throw new Error("Login realizado, mas não foi possível carregar as tarefas.");
      }

      const data: Task[] = await tasksResponse.json();
      setTasks(data);
      setPassword("");
      setError("");
    } catch (authError) {
      setError(
        authError instanceof Error
          ? authError.message
          : "Ocorreu um erro. Tente novamente.",
      );
    } finally {
      setAuthenticating(false);
    }
  }

  async function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTaskTitle.trim();

    if (!title || saving) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível criar a tarefa.");
      }

      setTasks((current) => [result as Task, ...current]);
      setNewTaskTitle("");
    } catch (taskError) {
      setError(
        taskError instanceof Error
          ? taskError.message
          : "Erro ao criar tarefa.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateTaskStatus(id: number, status: TaskStatus) {
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível atualizar a tarefa.");
      }

      const updatedTask = result as Task;

      setTasks((current) =>
        current.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (taskError) {
      setError(
        taskError instanceof Error
          ? taskError.message
          : "Erro ao alterar o status.",
      );
    }
  }

  async function deleteTask(id: number) {
    setError("");

    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Não foi possível excluir a tarefa.");
      }

      setTasks((current) => current.filter((task) => task.id !== id));
    } catch (taskError) {
      setError(
        taskError instanceof Error
          ? taskError.message
          : "Erro ao excluir tarefa.",
      );
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Verificando sessão...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
          <p className="mb-2 text-sm font-semibold tracking-widest text-indigo-400">
            TASKFLOW
          </p>

          <h1 className="text-3xl font-bold">
            {authMode === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {authMode === "login"
              ? "Entre para acessar suas tarefas."
              : "Cadastre-se para começar a organizar seu trabalho."}
          </p>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleAuth} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-slate-300">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-400"
                placeholder="voce@exemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm text-slate-300">
                Senha
              </label>
              <input
                id="password"
                type="password"
                autoComplete={
                  authMode === "login" ? "current-password" : "new-password"
                }
                required
                minLength={authMode === "register" ? 8 : 1}
                maxLength={72}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-400"
                placeholder={
                  authMode === "register"
                    ? "Mínimo de 8 caracteres"
                    : "Sua senha"
                }
              />
            </div>

            <button
              type="submit"
              disabled={authenticating}
              className="w-full rounded-xl bg-indigo-500 px-4 py-3 font-semibold transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {authenticating
                ? "Aguarde..."
                : authMode === "login"
                  ? "Entrar"
                  : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {authMode === "login"
              ? "Ainda não tem uma conta?"
              : "Já possui uma conta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setError("");
              }}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              {authMode === "login" ? "Cadastre-se" : "Fazer login"}
            </button>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-indigo-400">TASKFLOW</p>
            <h1 className="text-3xl font-bold tracking-tight">
              Meu painel de tarefas
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Organize seu trabalho e acompanhe seu progresso.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Conectado como {user.email}
            </p>
          </div>

          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={addTask}
          >
            <input
              value={newTaskTitle}
              onChange={(event) => setNewTaskTitle(event.target.value)}
              placeholder="Nome da nova tarefa"
              aria-label="Nome da nova tarefa"
              maxLength={100}
              required
              className="min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
            />
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-indigo-500 px-5 py-3 font-semibold transition hover:bg-indigo-400 disabled:opacity-50"
            >
              {saving ? "Salvando..." : "+ Nova tarefa"}
            </button>
          </form>

          <button
  type="button"
  onClick={handleLogout}
  disabled={loggingOut}
  className="rounded-xl border border-slate-700 px-5 py-3
    font-semibold text-slate-300 transition
    hover:bg-slate-800 disabled:cursor-not-allowed
    disabled:opacity-50"
>
  {loggingOut ? "Saindo..." : "Sair"}
</button>
        </header>

        {error && (
          <p
            role="alert"
            className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300"
          >
            {error}
          </p>
        )}

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total de tarefas", value: tasks.length },
            {
              label: "Em andamento",
              value: tasks.filter((task) => task.status === "IN_PROGRESS").length,
            },
            {
              label: "Concluídas",
              value: tasks.filter((task) => task.status === "DONE").length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.status,
            );

            return (
              <div
                key={column.status}
                className="min-h-64 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold">{column.label}</h2>
                  <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-sm text-slate-300">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {columnTasks.map((task) => (
                    <article
                      key={task.id}
                      className="rounded-xl border border-slate-800 bg-slate-900 p-4"
                    >
                      <span className="mb-3 inline-block rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-400">
                        Prioridade {priorityLabels[task.priority].toLowerCase()}
                      </span>

                      <h3 className="font-medium">{task.title}</h3>

                      <p className="mt-3 text-xs text-slate-500">
                        Tarefa #{task.id}
                      </p>

                      <div className="mt-4 flex flex-col gap-2">
                        <label
                          htmlFor={`status-${task.id}`}
                          className="text-xs text-slate-400"
                        >
                          Alterar status
                        </label>

                        <select
                          id={`status-${task.id}`}
                          value={task.status}
                          onChange={(event) =>
                            updateTaskStatus(
                              task.id,
                              event.target.value as TaskStatus,
                            )
                          }
                          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
                        >
                          {columns.map((option) => (
                            <option key={option.status} value={option.status}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          className="rounded-lg border border-rose-500/30 px-3 py-2 text-sm font-medium text-rose-400 transition hover:bg-rose-500/10"
                        >
                          Excluir tarefa
                        </button>
                      </div>
                    </article>
                  ))}

                  {columnTasks.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-800 p-5 text-center text-sm text-slate-500">
                      Nenhuma tarefa nesta coluna.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
