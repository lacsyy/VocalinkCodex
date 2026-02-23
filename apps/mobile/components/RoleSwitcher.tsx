import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSession } from '@/contexts/SessionContext';

export function RoleSwitcher() {
  const { role, setRole } = useSession();

  return (
    <View style={styles.container}>
      {(['student', 'teacher'] as const).map((entry) => (
        <Pressable
          key={entry}
          onPress={() => setRole(entry)}
          style={[styles.button, role === entry && styles.activeButton]}
        >
          <Text style={[styles.label, role === entry && styles.activeLabel]}>{entry.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  activeButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  label: {
    fontWeight: '600',
    color: '#1E293B',
  },
  activeLabel: {
    color: '#fff',
  },
});
