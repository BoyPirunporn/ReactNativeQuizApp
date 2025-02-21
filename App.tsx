import { PaperProvider } from 'react-native-paper';
import Main from './apps/screens/MyStack';
import { theme } from './apps/config/theme';
import 'react-native-gesture-handler';
import DialogProvider from './apps/providers/dialogProvider';
import LoadingProvider from './apps/providers/loadingProvider';
import SnackBarProvider from './apps/providers/snackbarProvider';

export default function App() {
  return (
    <PaperProvider theme={theme}>
        <Main />
        <DialogProvider />
        <LoadingProvider />
        <SnackBarProvider />
      </PaperProvider>
  );
}


