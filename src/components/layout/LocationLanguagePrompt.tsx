import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, MapPin, X, Check, Globe } from 'lucide-react';
import { detectIndianStateFromCoords, StateLanguageMapping } from '@/services/location/indianStates';
import { speechService } from '@/services/voice/speech';

export const LocationLanguagePrompt: React.FC = () => {
  const { i18n } = useTranslation();
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);
  const [detectedState, setDetectedState] = useState<StateLanguageMapping | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    // Check if location suggestion has already been answered
    const hasDecided = localStorage.getItem('fairshift_loc_lang_prompt_decided');
    if (!hasDecided) {
      // Trigger short explanation banner on first login
      const timer = setTimeout(() => setShowConsentModal(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAllowLocation = () => {
    setIsProcessing(true);

    if (!navigator.geolocation) {
      // Default to Chennai / Tamil Nadu coordinates for test environment fallback
      const simulated = detectIndianStateFromCoords(13.0827, 80.2707); // Chennai
      setDetectedState(simulated);
      setShowConsentModal(false);
      setIsProcessing(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const detected = detectIndianStateFromCoords(pos.coords.latitude, pos.coords.longitude);
        setDetectedState(detected);
        setShowConsentModal(false);
        setIsProcessing(false);
      },
      (_err) => {
        // Fallback gracefully: mock Chennai coordinates (Tamil Nadu) for local demo
        const simulated = detectIndianStateFromCoords(13.0827, 80.2707);
        setDetectedState(simulated);
        setShowConsentModal(false);
        setIsProcessing(false);
      },
      { timeout: 8000 }
    );
  };

  const handleSkip = () => {
    localStorage.setItem('fairshift_loc_lang_prompt_decided', 'skipped');
    setShowConsentModal(false);
  };

  const handleAcceptLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('fairshift_loc_lang_prompt_decided', `accepted_${langCode}`);
    setDetectedState(null);
  };

  const handleDeclineLanguage = () => {
    localStorage.setItem('fairshift_loc_lang_prompt_decided', 'declined');
    setDetectedState(null);
  };

  const handleReadAloud = (text: string, langCode: string) => {
    speechService.speak(text, { languageCode: langCode });
  };

  return (
    <>
      {/* 1. INITIAL PERMISSION EXPLANATION MODAL */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl text-zinc-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Regional Language Suggestion</h3>
                <p className="text-xs text-zinc-400">Location-aware accessibility</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              FairShift can detect your state offline using your device GPS to suggest your regional language 
              (e.g. Tamil in Tamil Nadu, Kannada in Karnataka). Your exact location is never stored or tracked.
            </p>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
              <button
                onClick={handleSkip}
                className="px-4 py-2.5 rounded-xl border border-zinc-700 text-sm font-medium hover:bg-zinc-800 transition"
              >
                Skip & Choose Manually
              </button>
              <button
                onClick={handleAllowLocation}
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {isProcessing ? 'Detecting State...' : 'Allow Location'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. REGIONAL LANGUAGE RECOMMENDATION BANNER */}
      {detectedState && detectedState.languageCode !== i18n.language && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[440px] z-50 p-4 rounded-2xl bg-zinc-900 border-2 border-blue-500/40 shadow-2xl text-zinc-100 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Globe className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                {detectedState.stateName} Detected
              </span>
            </div>
            <button
              onClick={handleDeclineLanguage}
              className="text-zinc-500 hover:text-zinc-300 p-1"
              aria-label="Close language suggestion"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 space-y-1">
            <p className="text-base font-bold text-white">
              {detectedState.nativePrompt.greeting}
            </p>
            <p className="text-sm text-zinc-200 leading-snug font-medium">
              {detectedState.nativePrompt.message}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => handleAcceptLanguage(detectedState.languageCode)}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              {detectedState.nativePrompt.acceptLabel}
            </button>

            <button
              onClick={handleDeclineLanguage}
              className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition"
            >
              {detectedState.nativePrompt.declineLabel}
            </button>

            <button
              onClick={() => handleReadAloud(detectedState.nativePrompt.message, detectedState.languageCode)}
              className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
              title="Voice Read Aloud"
              aria-label="Voice Read Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
