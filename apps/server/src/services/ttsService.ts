export async function synthesizeSpeech(text: string, language: 'en' | 'fil') {
  return {
    engine: 'stub-google-tts',
    locale: language === 'en' ? 'en-PH' : 'fil-PH',
    message: `Speech synthesis request queued for: ${text}`,
  };
}
