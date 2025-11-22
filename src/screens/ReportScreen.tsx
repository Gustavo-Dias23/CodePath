import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { getProgress, clearStorage, UserProgress } from '../services/storage';
import { useIsFocused } from '@react-navigation/native';

export default function ReportScreen() {
  const [history, setHistory] = useState<UserProgress[]>([]);
  const isFocused = useIsFocused(); // Atualiza a tela quando o usuário volta para ela

  const loadData = async () => {
    const data = await getProgress();
    setHistory(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  const handleClear = async () => {
    await clearStorage();
    loadData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Relatório de Processo de Pensamento</Text>
      <Text style={styles.subHeader}>
        Este relatório mostra ao recrutador não apenas se você acertou, mas quantas dicas precisou.
      </Text>

      {history.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum desafio completado ainda.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Desafio ID: {item.challengeId}</Text>
              <Text>Status: {item.completed ? 'Concluído' : 'Pendente'}</Text>
              <Text style={{ fontWeight: 'bold', color: item.hintsUsed > 0 ? '#e67e22' : '#27ae60' }}>
                Dicas Utilizadas: {item.hintsUsed}
              </Text>
              <Text style={styles.date}>Data: {new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Button title="Limpar Histórico" onPress={handleClear} color="#e74c3c" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  subHeader: { fontSize: 14, color: '#666', marginBottom: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
  card: { 
    backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10,
    borderLeftWidth: 5, borderLeftColor: '#3498db'
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  date: { fontSize: 12, color: '#999', marginTop: 5 },
  footer: { marginTop: 20 }
});