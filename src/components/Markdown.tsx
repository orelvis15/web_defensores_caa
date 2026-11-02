import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Renders Markdown written in the admin (GFM: headings, lists, tables, links…).
 * Raw HTML is not rendered, so the text cannot inject markup.
 */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none dark:prose-invert",
        "prose-headings:font-semibold prose-headings:text-foreground prose-h2:mt-8 prose-h2:text-2xl prose-h3:text-xl",
        "prose-p:leading-relaxed prose-p:text-foreground/85 prose-li:text-foreground/85 prose-li:marker:text-primary",
        "prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-foreground/80",
        "prose-img:rounded-xl prose-hr:border-border",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children: c }) => {
            const external = !!href && /^https?:\/\//.test(href);
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {c}
              </a>
            );
          },
          table: ({ children: c }) => (
            <div className="not-prose my-6 overflow-x-auto rounded-lg border">
              <table className="w-full text-sm [&_td]:border-t [&_td]:px-4 [&_td]:py-2 [&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold">
                {c}
              </table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
