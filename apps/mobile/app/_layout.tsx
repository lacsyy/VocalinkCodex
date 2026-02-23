import { Stack } from 'expo-router';
import { SessionProvider } from '@/contexts/SessionContext';

export default function RootLayout() {
  return (
    <SessionProvider>
      <Stack screenOptions={{ headerTitle: 'VocaLink' }} />
    </SessionProvider>
  );
}
