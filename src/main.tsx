import { Component, type ErrorInfo, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface ErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(_error: Error, _info: ErrorInfo) {
    // Allow graceful reload instead of blank screen
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0C0C0C] px-6 text-center text-white">
          <p className="font-italiana text-3xl text-white">Metty &amp; Piter</p>
          <p className="font-lato mt-3 max-w-sm text-sm text-white/75">
            Terjadi kendala saat memuat halaman undangan. Silakan muat ulang halaman.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-crimson mt-6 cursor-pointer rounded-md bg-[#584A2F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3F341F]"
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <AppErrorBoundary>
    <App />
  </AppErrorBoundary>
);
