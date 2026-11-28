import { useEffect, useMemo, useState } from 'react';
import AmplopSection from './components/AmplopSection';
import BrideGroomSection from './components/BrideGroomSection';
import ClosingSection from './components/ClosingSection';
import CoverGate from './components/CoverGate';
import EventSection from './components/EventSection';
import FloatingControls from './components/FloatingControls';
import HeroSection from './components/HeroSection';
import LoveStorySection from './components/LoveStorySection';
import QuoteSection from './components/QuoteSection';
import RsvpSection from './components/RsvpSection';
import ShareInvitationSection from './components/ShareInvitationSection';
import { WEDDING_MUSIC } from './data/weddingData';
import { weddingAudio } from './utils/audioPlayer';

interface GuestContext {
  guestName: string;
  isGuestTargetedLink: boolean;
}

function resolveGuestContext(): GuestContext {
  if (typeof window === 'undefined') {
    return { guestName: 'Tamu Undangan', isGuestTargetedLink: false };
  }

  const params = new URLSearchParams(window.location.search);
  const queryGuest = params.get('to') || params.get('kepada');
  if (queryGuest && queryGuest.trim().length > 0) {
    const formatted = queryGuest.trim().replace(/-/g, ' ');
    return { guestName: formatted, isGuestTargetedLink: true };
  }

  return { guestName: 'Tamu Undangan', isGuestTargetedLink: false };
}

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const { guestName, isGuestTargetedLink } = useMemo(resolveGuestContext, []);

  // Subscribe to audio play/pause state & attempt immediate autoplay on page open
  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });

    if (!WEDDING_MUSIC.autoPlay) {
      return unsubscribe;
    }

    let active = true;
    let unlocked = false;
    const tryAutoPlay = async () => {
      if (!active || unlocked || document.hidden || weddingAudio.getPlaying()) return;
      const ok = await weddingAudio.play();
      if (ok && active) {
        unlocked = true;
        cleanupGestureListeners();
      }
    };

    const onFirstGesture = () => {
      void tryAutoPlay();
    };

    const onVisibilityReturn = () => {
      if (!document.hidden && !unlocked) {
        void tryAutoPlay();
      }
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('pointerdown', onFirstGesture);
      window.removeEventListener('keydown', onFirstGesture);
      document.removeEventListener('visibilitychange', onVisibilityReturn);
    };

    // Attempt immediate autoplay right when the link is opened
    void tryAutoPlay();

    // If browser autoplay policy blocks sound before interaction, unlock immediately on first tap/click/key
    window.addEventListener('pointerdown', onFirstGesture, { passive: true });
    window.addEventListener('keydown', onFirstGesture, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityReturn);

    return () => {
      active = false;
      unsubscribe();
      cleanupGestureListeners();
    };
  }, []);

  // Strictly lock scrolling on html & body until "Open Invitation" is clicked
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const html = document.documentElement;
    const body = document.body;

    if (!isOpen) {
      html.style.overflow = 'hidden';
      html.style.height = '100%';
      body.style.overflow = 'hidden';
      body.style.height = '100%';
      window.scrollTo(0, 0);

      const preventScroll = (e: Event) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      };
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        html.style.overflow = '';
        html.style.height = '';
        body.style.overflow = '';
        body.style.height = '';
      };
    }

    html.style.overflow = '';
    html.style.height = '';
    body.style.overflow = '';
    body.style.height = '';
    return undefined;
  }, [isOpen]);

  const handleOpenInvitation = async () => {
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    document.body.style.overflow = '';
    document.body.style.height = '';
    setIsOpen(true);

    // Smoothly scroll from cover (#_foto_pembuka_slideshow) to hero (#cover), identical to #tombol-buka
    window.requestAnimationFrame(() => {
      const heroEl = document.getElementById('cover');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    await weddingAudio.play();
  };

  const handleToggleMusic = async () => {
    if (weddingAudio.getPlaying()) {
      weddingAudio.pause();
    } else {
      await weddingAudio.play();
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0C0C0C]">
      <CoverGate guestName={guestName} onOpen={handleOpenInvitation} />

      <main>
        <HeroSection />
        <QuoteSection />
        <BrideGroomSection />
        <EventSection />
        <LoveStorySection />
        <AmplopSection />
        <RsvpSection />
        {!isGuestTargetedLink && <ShareInvitationSection />}
      </main>

      <ClosingSection />

      <FloatingControls
        isOpen={isOpen}
        isPlaying={isPlaying}
        showShareShortcut={!isGuestTargetedLink}
        onToggleMusic={handleToggleMusic}
      />
    </div>
  );
}
