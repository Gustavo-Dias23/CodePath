import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { saveProgress } from '../services/storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Challenge'>;

// BANCO DE DICAS ESPECÍFICAS POR DESAFIO
// A chave '1', '2', '3', '4' corresponde aos IDs que colocamos na Home
const CHALLENGE_HINTS: Record<string, string[]> = {
  '1': [ // Otimização de Rotas
    "Dica 1: Você considerou tratar o caso em que a lista de coordenadas está vazia ou tem apenas um ponto?",
    "Dica 2: Para calcular a distância entre pontos, lembre-se da fórmula de Haversine ou Pitágoras simples.",
    "Dica 3: Se o número de entregas for grande, evite recalcular rotas repetidas. Memoization pode ajudar."
  ],
  '2': [ // Segurança em API
    "Dica 1: Verifique se o ID do usuário na URL corresponde ao token de autenticação de quem está logado.",
    "Dica 2: O problema aqui é IDOR (Insecure Direct Object Reference). Você não deve confiar apenas no input do cliente.",
    "Dica 3: Implemente uma verificação de permissão (middleware) antes de processar a atualização."
  ],
  '3': [ // Acessibilidade Mobile
    "Dica 1: Botões que são apenas ícones precisam da propriedade 'accessibilityLabel' para que o leitor de tela saiba o que falar.",
    "Dica 2: Verifique se a área de toque do botão é de pelo menos 44x44dp para facilitar o clique.",
    "Dica 3: Use 'accessibilityRole' para indicar explicitamente que este componente funciona como um botão."
  ],
  '4': [ // Análise de Dados (Burnout)
    "Dica 1: Comece filtrando os funcionários que trabalharam mais de 10 horas por dia consecutivamente.",
    "Dica 2: Procure por padrões de 'login' em horários noturnos ou finais de semana.",
    "Dica 3: Use métodos de array como .filter() e .reduce() para agregar essas métricas de risco."
  ]
};

export default function ChallengeScreen({ route, navigation }: Props) {
  const { id, title, description } = route.params;
  
  // Seleciona as dicas baseadas no ID do desafio. Se não achar, usa um array vazio.
  const currentHintsList = CHALLENGE_HINTS[id] || ["Dica genérica: Quebre o problema em partes menores."];
  
  const [code, setCode] = useState('');
  const [hintsShown, setHintsShown] = useState<string[]>([]);
  
  const handleAskHint = () => {
    const nextHintIndex = hintsShown.length;
    if (nextHintIndex < currentHintsList.length) {
      setHintsShown([...hintsShown, currentHintsList[nextHintIndex]]);
    } else {
      Alert.alert("Tutor IA", "Você já recebeu todas as dicas disponíveis para este nível!");
    }
  };

  const handleFinish = async () => {
    if (!code.trim()) {
      Alert.alert("Erro", "Por favor, escreva alguma solução antes de finalizar.");
      return;
    }

    // SALVANDO NO ASYNCSTORAGE
    await saveProgress({
      challengeId: id, // Salva o ID para sabermos qual desafio foi
      completed: true,
      hintsUsed: hintsShown.length,
      timestamp: new Date().toISOString(),
    });

    Alert.alert("Sucesso", "Desempenho registrado! O recrutador receberá seu processo de pensamento.");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Text style={styles.label}>Sua Solução (Código/Pseudocódigo):</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        placeholder="// Escreva sua lógica aqui..."
        value={code}
        onChangeText={setCode}
        textAlignVertical="top"
      />

      {/* Área do Tutor Socrático */}
      <View style={styles.aiSection}>
        <Text style={styles.aiTitle}>🤖 Tutor Socrático (IA)</Text>
        
        {hintsShown.length === 0 && (
          <Text style={styles.placeholderText}>
            O tutor está observando seu código. Se travar, peça uma dica.
          </Text>
        )}

        {hintsShown.map((hint, index) => (
          <View key={index} style={styles.hintBox}>
            <Text style={styles.hintText}>{hint}</Text>
          </View>
        ))}
        
        <View style={styles.buttonSpacer}>
            <Button 
            title={`Pedir Dica (${hintsShown.length}/${currentHintsList.length})`} 
            onPress={handleAskHint} 
            color="#f39c12"
            disabled={hintsShown.length >= currentHintsList.length}
            />
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Finalizar Desafio" onPress={handleFinish} color="#2ecc71" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  description: { fontSize: 16, color: '#555', marginBottom: 20, lineHeight: 22 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { 
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, 
    backgroundColor: '#f9f9f9', marginBottom: 20, minHeight: 150, fontFamily: 'monospace' 
  },
  aiSection: { 
    backgroundColor: '#e8f6f3', padding: 15, borderRadius: 10, marginBottom: 20, 
    borderLeftWidth: 4, borderLeftColor: '#1abc9c'
  },
  aiTitle: { fontWeight: 'bold', marginBottom: 10, color: '#16a085', fontSize: 16 },
  placeholderText: { fontStyle: 'italic', color: '#7f8c8d', marginBottom: 10 },
  hintBox: { backgroundColor: '#fff', padding: 10, borderRadius: 5, marginBottom: 10, elevation: 1 },
  hintText: { color: '#444', fontSize: 14 },
  buttonSpacer: { marginTop: 5 },
  footer: { marginBottom: 40 }
});