export interface SpeechOptions {
  languageCode?: string;
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export const speechService = {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.isSupported()) return [];
    return window.speechSynthesis.getVoices();
  },

  findVoiceForLanguage(langCode: string): SpeechSynthesisVoice | undefined {
    const voices = this.getAvailableVoices();
    // Prefix match e.g. 'ta' -> 'ta-IN', 'hi' -> 'hi-IN'
    return voices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));
  },

  speak(text: string, options: SpeechOptions = {}): boolean {
    if (!this.isSupported()) {
      if (options.onError) options.onError(new Error('Speech synthesis not supported in this browser'));
      return false;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate ?? 0.95;
      utterance.pitch = options.pitch ?? 1.0;

      if (options.languageCode) {
        const voice = this.findVoiceForLanguage(options.languageCode);
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = options.languageCode;
        }
      }

      utterance.onend = () => {
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        if (options.onError) options.onError(e);
      };

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      if (options.onError) options.onError(err);
      return false;
    }
  },

  stop(): void {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
  }
};

export function speakText(text: string, languageCode?: string): boolean {
  return speechService.speak(text, { languageCode });
}
