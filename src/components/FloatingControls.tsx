import { Disc3, Pause, Share2 } from 'lucide-react';

interface FloatingControlsProps {
  isOpen: boolean;
  isPlaying: boolean;
  showShareShortcut: boolean;
  onToggleMusic: () => void;
}

export default function FloatingControls({
  isOpen,
  isPlaying,
  showShareShortcut,
  onToggleMusic,
}: FloatingControlsProps) {
  const handleScrollToShare = () => {
    const shareEl = document.getElementById('bagikan-undangan');
    if (shareEl) {
      shareEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {(isOpen || isPlaying) && (
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isPlaying ? 'Jeda musik latar' : 'Putar musik latar'}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#191919]/85 text-white shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-6"
        >
          {isPlaying ? (
            <Disc3 className="animate-disc-spin h-5 w-5" aria-hidden="true" />
          ) : (
            <Pause className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      )}

      {isOpen && showShareShortcut && (
        <button
          type="button"
          onClick={handleScrollToShare}
          aria-label="Kirim link undangan"
          title="Kirim Link Undangan"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-[#191919]/85 text-white shadow-lg backdrop-blur-sm transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-6"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </>
  );
}
