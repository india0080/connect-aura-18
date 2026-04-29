import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_REPLIES = [
  "Login Issue",
  "Report User",
  "Payment Help",
  "Privacy & Safety",
];

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi 👋 Welcome to **GoMilap Support**! How can I help you today?\n\nPick a quick option below or type your question.",
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/support-chat`;

export function SupportChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.filter((m) => m !== WELCOME).map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        let errMsg = "Something went wrong. Please try again.";
        if (resp.status === 429) errMsg = "I'm getting a lot of requests right now. Please try again in a moment.";
        if (resp.status === 402) errMsg = "AI service is unavailable. Please email **support@gomilap.com**.";
        setMessages((p) => [...p, { role: "assistant", content: errMsg }]);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let started = false;
      let done = false;

      const upsert = (chunk: string) => {
        acc += chunk;
        setMessages((prev) => {
          if (!started) {
            started = true;
            return [...prev, { role: "assistant", content: acc }];
          }
          const copy = prev.slice();
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      };

      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":") || !line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) upsert(delta);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "Connection error. Please email **support@gomilap.com**." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        aria-label={open ? "Close support chat" : "Open support chat"}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed z-[60] bottom-5 right-5 h-14 w-14 rounded-full bg-gradient-brand text-primary-foreground shadow-glow",
          "flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95",
          "ring-1 ring-white/10",
        )}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-brand opacity-60 blur-xl -z-10" />
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed z-[60] bottom-24 right-3 sm:right-5 w-[calc(100vw-1.5rem)] sm:w-[380px] max-w-[400px]",
          "h-[min(560px,calc(100vh-8rem))] origin-bottom-right",
          "transition-all duration-300",
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none",
        )}
      >
        <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-brand text-primary-foreground flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm leading-tight">GoMilap Support</p>
              <p className="text-[11px] opacity-90 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                AI assistant · online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-white/15 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-background/40">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                    m.role === "user"
                      ? "bg-gradient-brand text-primary-foreground rounded-br-md"
                      : "bg-card border border-border/60 text-foreground rounded-bl-md",
                  )}
                >
                  <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_p+p]:mt-2 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground [&_ul]:my-1 [&_ul]:pl-4 [&_ol]:my-1 [&_ol]:pl-4">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-card border border-border/60 rounded-2xl rounded-bl-md px-3.5 py-2.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Typing…
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && !loading && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border/70 bg-card hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-border/60 bg-card/60 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              disabled={loading}
              className="flex-1 h-10 rounded-full bg-background border border-border/60 px-4 text-sm focus:outline-none focus:border-primary/60"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="h-10 w-10 rounded-full bg-gradient-brand text-primary-foreground shadow-glow shrink-0"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
