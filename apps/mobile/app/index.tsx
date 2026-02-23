import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { PhraseGrid } from '@/components/PhraseGrid';
import { useSession } from '@/contexts/SessionContext';
import { useCaptions } from '@/hooks/useCaptions';

export default function HomeScreen() {
  const { language, toggleLanguage, role } = useSession();
  const captions = useCaptions();

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.topRow}>
        <RoleSwitcher />
        <Pressable onPress={toggleLanguage} style={styles.languageButton}>
          <Text style={styles.languageText}>{language.toUpperCase()}</Text>
        </Pressable>
      </View>

      <Text style={styles.heading}>VocaLink Classroom Session</Text>
      <Text style={styles.subheading}>
        {role === 'student'
          ? 'Tap quick phrases to speak them aloud.'
          : 'Monitor live captions and support student communication.'}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Phrases</Text>
        <PhraseGrid />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Captions</Text>
        {captions.length === 0 ? (
          <Text style={styles.empty}>No live captions yet. Start the server stream.</Text>
        ) : (
          captions.map((caption) => (
            <View key={caption.id} style={styles.captionCard}>
              <Text style={styles.captionText}>{caption.text}</Text>
              <Text style={styles.captionMeta}>{new Date(caption.timestamp).toLocaleTimeString()}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  languageText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subheading: {
    color: '#334155',
    fontSize: 14,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  empty: {
    color: '#64748B',
    fontStyle: 'italic',
  },
  captionCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    backgroundColor: '#fff',
  },
  captionText: {
    color: '#0F172A',
    fontSize: 16,
  },
  captionMeta: {
    marginTop: 6,
    color: '#64748B',
    fontSize: 12,
  },
});
