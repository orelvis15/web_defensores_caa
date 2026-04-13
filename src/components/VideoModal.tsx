import { useEffect } from "react";
import { X } from "lucide-react";
import { useVideoModal } from "@/contexts/VideoModalContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function VideoModal() {
  const { isOpen, closeModal, openModal } = useVideoModal();
  const { t } = useLanguage();

  useEffect(() => {
    const hasWatchedVideo = localStorage.getItem("video-watched");
    if (hasWatchedVideo !== "true") {
      openModal();
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("video-watched", "true");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-card border shadow-2xl rounded-2xl overflow-hidden max-w-2xl w-full mx-4 animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 hover:bg-muted rounded-full transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video container */}
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/-eR4JLsnvrU?autoplay=1&mute=1"
            title="Defenders of the CAA and Freedom - Our Mission"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-2">
            {t("video.title")}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t("video.description")}
          </p>
        </div>
      </div>
    </div>
  );
}
