import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  // Dados Mockados (Simulando o que a IA geraria para a vaga) [cite: 9]
  // Dados Mockados (Simulando o que a IA geraria para a vaga)
  const challenges = [
    { 
      id: '1', 
      title: 'Otimização de Rotas', 
      description: 'Crie uma função para otimizar a rota de entrega baseada no tráfego atual. O array de entrada contém coordenadas...' 
    },
    { 
      id: '2', 
      title: 'Segurança em API', 
      description: 'Identifique falhas de segurança (IDOR) no seguinte endpoint de atualização de perfil de usuário...' 
    },
    { 
      id: '3', 
      title: 'Acessibilidade Mobile', 
      description: 'Refatore este componente de botão para que leitores de tela (TalkBack/VoiceOver) consigam ler a etiqueta corretamente para deficientes visuais.' 
    },
    { 
      id: '4', 
      title: 'Análise de Dados Remotos', 
      description: 'Dado um JSON com logs de produtividade de trabalho híbrido, crie um filtro para identificar padrões de burnout na equipe.' 
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao CodePath Assist</Text>
      <Text style={styles.subHeader}>Escolha um desafio personalizado para sua vaga:</Text>

      {challenges.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.card}
          onPress={() => navigation.navigate('Challenge', item)}
        >
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Button 
          title="Ver Meus Relatórios de Desempenho" 
          onPress={() => navigation.navigate('Report')}
          color="#4a90e2"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  subHeader: { fontSize: 16, marginBottom: 20, color: '#666' },
  card: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  cardDesc: { fontSize: 14, color: '#555' },
  footer: { marginTop: 20 }
});