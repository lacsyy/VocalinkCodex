import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Speech from 'expo-speech';
import { QUICK_PHRASES } from '@/data/quickPhrases';
import { useSession } from '@/contexts/SessionContext';

export function PhraseGrid() {
  const { language } = useSession();

  return (
    <View style={styles.grid}>
      {QUICK_PHRASES.map((phrase) => {
        const text = language === 'en' ? phrase.textEn : phrase.textFil;
        return (
          <Pressable key={phrase.id} style={styles.card} onPress={() => Speech.speak(text)}>
            <Text style={styles.category}>{phrase.category}</Text>
            <Text style={styles.text}>{text}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#fff',
  },
  category: {
    fontSize: 12,
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
});
