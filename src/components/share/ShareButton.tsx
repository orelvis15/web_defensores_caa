import { useState } from "react";
import {
  Check,
  Facebook,
  Link2,
  Mail,
  MessageCircle,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShareButtonProps {
  /** Ruta interna ("/campanas/yasmani") o URL completa que se va a compartir. */
  url: string;
  /** Titular del contenido compartido. */
  title: string;
  /** Frase que acompaña al enlace en redes y mensajería. */
  text: string;
  label?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}

/**
 * Botón para compartir una página en redes, mensajería o copiando el enlace.
 *
 * En los dispositivos que lo soportan ofrece además el menú nativo del
 * sistema, que da acceso a las apps que la persona ya tenga instaladas.
 */
export function ShareButton({
  url,
  title,
  text,
  label,
  variant = "outline",
  size = "lg",
  className,
}: ShareButtonProps) {
  const { language } = useLanguage();
  const isSpanish = language === "ES";
  const [hasCopied, setHasCopied] = useState(false);

  // Las redes necesitan una URL absoluta; se resuelve al hacer clic para que
  // funcione igual en local, en preview y en producción.
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${window.location.origin}${url}`;

  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedText = encodeURIComponent(text);

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=600");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
      toast.success(isSpanish ? "Enlace copiado" : "Link copied");
    } catch {
      toast.error(
        isSpanish
          ? "No se pudo copiar el enlace"
          : "The link could not be copied"
      );
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text, url: absoluteUrl });
    } catch (err) {
      // Cancelar el menú del sistema no es un error que haya que reportar.
      if ((err as Error)?.name !== "AbortError") {
        console.error("Native share failed:", err);
      }
    }
  };

  const canShareNatively =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const networks = [
    {
      key: "whatsapp",
      icon: MessageCircle,
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${absoluteUrl}`)}`,
    },
    {
      key: "facebook",
      icon: Facebook,
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      key: "x",
      icon: Twitter,
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      key: "telegram",
      icon: Send,
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
    {
      key: "email",
      icon: Mail,
      label: isSpanish ? "Correo" : "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${absoluteUrl}`)}`,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="w-4 h-4 mr-2" />
          {label ?? (isSpanish ? "Compartir" : "Share")}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-56">
        {networks.map((network) => {
          const Icon = network.icon;
          return (
            <DropdownMenuItem
              key={network.key}
              onSelect={() => {
                if (network.key === "email") {
                  window.location.href = network.href;
                } else {
                  openShareWindow(network.href);
                }
              }}
              className="cursor-pointer"
            >
              <Icon className="w-4 h-4 mr-2" />
              {network.label}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={handleCopy} className="cursor-pointer">
          {hasCopied ? (
            <Check className="w-4 h-4 mr-2 text-primary" />
          ) : (
            <Link2 className="w-4 h-4 mr-2" />
          )}
          {isSpanish ? "Copiar enlace" : "Copy link"}
        </DropdownMenuItem>

        {canShareNatively && (
          <DropdownMenuItem
            onSelect={handleNativeShare}
            className="cursor-pointer"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {isSpanish ? "Más opciones…" : "More options…"}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
