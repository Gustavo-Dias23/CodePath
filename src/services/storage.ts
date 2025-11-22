import AsyncStorage from '@react-native-async-storage/async-storage';

// Chave para salvar no banco local
const STORAGE_KEY = '@codepath_progress';

export interface UserProgress {
  challengeId: string;
  completed: boolean;
  hintsUsed: number;
  timestamp: string;
}

// Salvar progresso
export const saveProgress = async (progress: UserProgress) => {
  try {
    // 1. Pega o histórico atual
    const existingData = await getProgress();
    
    // 2. Adiciona o novo registro
    const newData = [...existingData, progress];
    
    // 3. Salva de volta como string
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    console.log('Progresso salvo!');
  } catch (e) {
    console.error('Erro ao salvar', e);
  }
};

// Ler progresso
export const getProgress = async (): Promise<UserProgress[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao ler', e);
    return [];
  }
};

// Limpar tudo (útil para testes/vídeo de demo)
export const clearStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};