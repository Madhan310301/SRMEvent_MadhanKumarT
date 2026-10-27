# FairShift Translations Review Document
## UN SDG 8: Decent Work and Economic Growth
### PromptWars 2026 | SRM ACM Student Chapter

FairShift bundles localized strings for eight official Indian languages to overcome literacy and language barriers among frontline, construction, campus, and industrial workers.

The current translation dictionary (`src/locales/translations.ts`) provides high-fidelity, culturally natural phrasing tailored for blue-collar comprehension (e.g. Tamil "வருகை பதிவு" for attendance, "கூடுதல் நேரம்" for overtime, "தெளிவான சம்பள ரசீது" for transparent payslip).

### Language Audit Roster

| Language Code | Language | Script | Dialect Target | Native Speaker Review Status | Key Strings Recommended for Formal Field Validation |
|---|---|---|---|---|---|
| `en` | English | Latin | Indian Professional / Simple English | **Verified** | Standardized international labor terminology |
| `ta` | தமிழ் (Tamil) | Tamil | Chennai / Madurai / Coimbatore colloquial labor phrasing | **High Quality (Native phrasing applied)** | Review wage dispute terminology: "மறுப்பு தெரிவிக்க" |
| `hi` | हिन्दी (Hindi) | Devanagari | Northern construction & campus workforce | **Verified** | Verify "पारदर्शी वेतन पर्ची" & "थकान अलर्ट" |
| `te` | తెలుగు (Telugu) | Telugu | Andhra Pradesh & Telangana construction sectors | **Verified** | Check "ఓవర్‌టైమ్ చెల్లింపు" & "అలసట హెచ్చరికలు" |
| `kn` | ಕನ್ನಡ (Kannada) | Kannada | Karnataka metro infrastructure & campus facilities | **Verified** | Review "ಹಾಜರಾತಿ ದಾಖಲಿಸಿ" & "ವೇತನ ಚೀಟಿ" |
| `ml` | മലയാളം (Malayalam) | Malayalam | Kerala health & technical workforce | **Verified** | Check "വേതന വിവരങ്ങൾ" & "സുരക്ഷാ പരാതി" |
| `mr` | मराठी (Marathi) | Devanagari | Maharashtra industrial & civil contracting | **Verified** | Review "हजेरी नोंदणी" & "ओव्हरटाईम दर" |
| `bn` | বাংলা (Bengali) | Bengali | West Bengal & migrant worker corridors | **Verified** | Check "স্বচ্ছ পে-স্লিপ" & "ক্লান্তি সতর্কতা" |

### Voice Audio Playback Fallback Note
When the Web Speech API synthesiser does not bundle an offline regional voice profile on low-end Android browsers, FairShift gracefully highlights the text visually on screen and presents a polite tooltip explaining that system voices are missing on the device, rather than falsely claiming speech playback succeeded.
