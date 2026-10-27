export interface StateLanguageMapping {
  stateName: string;
  languageCode: string;
  languageLabel: string;
  nativePrompt: {
    greeting: string;
    message: string;
    acceptLabel: string;
    declineLabel: string;
  };
  bounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
  };
}

export const INDIAN_STATE_MAPPINGS: StateLanguageMapping[] = [
  {
    stateName: 'Kerala',
    languageCode: 'ml',
    languageLabel: 'മലയാളം (Malayalam)',
    nativePrompt: {
      greeting: 'നമസ്കാരം!',
      message: 'നിങ്ങൾ കേരളത്തിലാണെന്ന് തോന്നുന്നു. FairShift മലയാളത്തിൽ ഉപയോഗിക്കാൻ താൽപ്പര്യപ്പെടുന്നുണ്ടോ?',
      acceptLabel: 'മലയാളത്തിലേക്ക് മാറ്റുക',
      declineLabel: 'നിലവിലെ ഭാഷ തുടരുക'
    },
    bounds: {
      minLat: 8.29,
      maxLat: 12.79,
      minLng: 74.86,
      maxLng: 77.41
    }
  },
  {
    stateName: 'Karnataka',
    languageCode: 'kn',
    languageLabel: 'ಕನ್ನಡ (Kannada)',
    nativePrompt: {
      greeting: 'ನಮಸ್ಕಾರ!',
      message: 'ನೀವು ಕರ್ನಾಟಕದಲ್ಲಿರುವಂತೆ ಕಾಣುತ್ತಿದೆ. FairShift ಅನ್ನು ಕನ್ನಡದಲ್ಲಿ ಬಳಸಲು ಬಯಸುವಿರಾ?',
      acceptLabel: 'ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ',
      declineLabel: 'ಈಗಿನ ಭಾಷೆಯಲ್ಲೇ ಮುಂದುವರಿಸಿ'
    },
    bounds: {
      minLat: 11.59,
      maxLat: 18.45,
      minLng: 74.08,
      maxLng: 78.58
    }
  },
  {
    stateName: 'Tamil Nadu',
    languageCode: 'ta',
    languageLabel: 'தமிழ் (Tamil)',
    nativePrompt: {
      greeting: 'வணக்கம்!',
      message: 'நீங்கள் தமிழ்நாட்டில் இருப்பதாகத் தெரிகிறது. FairShift செயலியை தமிழில் பயன்படுத்த விரும்புகிறீர்களா?',
      acceptLabel: 'தமிழுக்கு மாற்று',
      declineLabel: 'தற்போதைய மொழியே இருக்கட்டும்'
    },
    bounds: {
      minLat: 8.08,
      maxLat: 13.56,
      minLng: 76.24,
      maxLng: 80.34
    }
  },
  {
    stateName: 'Telangana',
    languageCode: 'te',
    languageLabel: 'తెలుగు (Telugu)',
    nativePrompt: {
      greeting: 'నమస్కారం!',
      message: 'మీరు తెలంగాణలో ఉన్నట్లు కనిపిస్తోంది. FairShift యాప్‌ను తెలుగులో ఉపయోగించాలనుకుంటున్నారా?',
      acceptLabel: 'తెలుగుకు మార్చండి',
      declineLabel: 'ప్రస్తుత భాషనే ఉంచండి'
    },
    bounds: {
      minLat: 15.83,
      maxLat: 19.92,
      minLng: 77.23,
      maxLng: 81.79
    }
  },
  {
    stateName: 'Andhra Pradesh',
    languageCode: 'te',
    languageLabel: 'తెలుగు (Telugu)',
    nativePrompt: {
      greeting: 'నమస్కారం!',
      message: 'మీరు ఆంధ్రప్రదేశ్‌లో ఉన్నట్లు కనిపిస్తోంది. FairShift యాప్‌ను తెలుగులో ఉపయోగించాలనుకుంటున్నారా?',
      acceptLabel: 'తెలుగుకు మార్చండి',
      declineLabel: 'ప్రస్తుత భాషనే ఉంచండి'
    },
    bounds: {
      minLat: 12.62,
      maxLat: 19.15,
      minLng: 76.76,
      maxLng: 84.76
    }
  },
  {
    stateName: 'Maharashtra',
    languageCode: 'mr',
    languageLabel: 'मराठी (Marathi)',
    nativePrompt: {
      greeting: 'नमस्कार!',
      message: 'आपण महाराष्ट्रात असल्याचे दिसते. FairShift ॲप मराठीत वापरू इच्छिता का?',
      acceptLabel: 'मराठी निवडा',
      declineLabel: 'सध्याची भाषा चालू ठेवा'
    },
    bounds: {
      minLat: 15.60,
      maxLat: 22.02,
      minLng: 72.60,
      maxLng: 80.89
    }
  },
  {
    stateName: 'West Bengal',
    languageCode: 'bn',
    languageLabel: 'বাংলা (Bengali)',
    nativePrompt: {
      greeting: 'নমস্কার!',
      message: 'আপনি পশ্চিমবঙ্গে আছেন বলে মনে হচ্ছে। আপনি কি FairShift বাংলায় ব্যবহার করতে চান?',
      acceptLabel: 'বাংলায় পরিবর্তন করুন',
      declineLabel: 'বর্তমান ভাষা রাখুন'
    },
    bounds: {
      minLat: 21.50,
      maxLat: 27.22,
      minLng: 85.82,
      maxLng: 89.88
    }
  },
  {
    stateName: 'Delhi & Northern Hindi Region',
    languageCode: 'hi',
    languageLabel: 'हिन्दी (Hindi)',
    nativePrompt: {
      greeting: 'नमस्ते!',
      message: 'ऐसा लगता है कि आप हिंदी भाषी क्षेत्र में हैं। क्या आप FairShift को हिंदी में उपयोग करना चाहते हैं?',
      acceptLabel: 'हिंदी में बदलें',
      declineLabel: 'वर्तमान भाषा रखें'
    },
    bounds: {
      minLat: 21.0,
      maxLat: 31.5,
      minLng: 74.0,
      maxLng: 88.0
    }
  }
];

/**
 * Detect Indian state purely offline using lightweight coordinate bounding box analysis
 */
export function detectIndianStateFromCoords(lat: number, lng: number): StateLanguageMapping | null {
  // Check specific southern/eastern states with higher priority
  for (const mapping of INDIAN_STATE_MAPPINGS) {
    const { minLat, maxLat, minLng, maxLng } = mapping.bounds;
    if (lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng) {
      return mapping;
    }
  }
  return null;
}
