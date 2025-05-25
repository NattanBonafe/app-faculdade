import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity, Button, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProjetosScreen({ route, navigation }) {
  // -- Teste para verificar a busca e a amostra de projetos
  // Dados de projetos (JSON)
  const initialProjects = [
    { id: '1', nome: 'Antonio Soares', status: 'Em Andamento', prazo: '31/12/2025'},
    { id: '2', nome: 'José Jorge', status: 'Concluído', prazo: '-' },
    { id: '3', nome: 'Erivelton Teixeira', status: 'Em Andamento', prazo: '18/04/2025'},
    { id: '4', nome: 'Livia Costa', status: 'Novo Projeto', prazo: '11/04/2025'},
    { id: '5', nome: 'João Paulo de Souza', status: 'Informação Pendente', prazo: '-'},
    { id: '6', nome: 'Mariana Gusmão', status: 'Pendência na Distribuidora', prazo: '-'},
    { id: '7', nome: 'Tony Stark', status: 'Em reanálise', prazo: '31/12/2025'},
    { id: '8', nome: 'John Jones', status: 'Concluído', prazo: '-'},
    { id: '9', nome: 'Anderson Spider Silva', status: 'Instalação em Análise', prazo: '11/07/2025'},
    { id: '10', nome: 'Mário', status: 'Novo Projeto', prazo: '11/04/2025'},
    { id: '11', nome: 'Capitain Falcon', status: 'Informação Pendente', prazo: '-'},
    { id: '12', nome: 'Darth Vader', status: 'Pendência na Distribuidora', prazo: '-'},
    { id: '13', nome: 'Wesley Safadão', status: 'Em Andamento', prazo: '05/10/2025'},
  ];
  // Variável de estado para armazenar os projetos e o filtro de busca
  const [projects, setProjects] = useState(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState({
    nome: 'asc',
    status: 'asc',
    prazo: 'asc',
  })
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Função de busca: filtra os projetos com base no nome
  const handleSearch = (query) => {
    setSearchQuery(query);

    // Se o campo de busca estiver vazio, retorna os projetos originais
    if (!query) {
      setProjects(initialProjects);
    } else {
      // Filtra os projetos com base no nome
      const filteredProjects = initialProjects.filter((project) =>
        project.nome.toLowerCase().includes(query.toLowerCase())
      );
      setProjects(filteredProjects);
    }
  };

  // Função para animar o ícone
  const spinRefreshIcon = () => {
    setIsRefreshing(true);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
      setIsRefreshing(false);
    });
  };

  // Função para atualizar a lista (simula um refresh)
  const handleRefresh = () => {
    spinRefreshIcon();
    setProjects(initialProjects);
    setSearchQuery('');
  }

  // Valor interpolado para rotação
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Função para ordenar os projetos
  const sortProjects = (column) => {
    let sortedProjects = [...projects];
    const order = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder((prev) => ({
      ...prev,
      [column]: order,
    }));

    if(column === 'nome') {
      sortedProjects.sort((a, b) => {
        const comparison = a.nome.localeCompare(b.nome);
        return order === 'asc' ? comparison : -comparison;
      });
    } else if (column === 'status') {
      sortedProjects.sort((a, b) => {
        const comparison = a.status.localeCompare(b.status);
        return order === 'asc' ? comparison : -comparison;
      });
    } else if (column === 'prazo') {
      sortedProjects.sort((a, b) => {
        if (a.prazo === '-') return 1;
        if (b.prazo === '-') return -1;
        const comparison = a.prazo.localeCompare(b.prazo);
        return order === 'asc' ? comparison : -comparison;
      });
    }

    setProjects(sortedProjects);
  }

  // Função para renderizar os itens na tabela
  const renderProject = ({ item }) => (
    <View style={styles.projectItem}>
      <Text style={[styles.projectText, styles.nomeColumn]}>{item.nome}</Text>
      <Text style={[styles.projectText, styles.statusColumn]}>{item.status}</Text>
      <Text style={[styles.projectText, styles.prazoColumn]}>{item.prazo}</Text>
    </View>
  );

  // -- Final do teste (VERIFICAR SE TUDO QUE ESTÁ AQUI É REALMENTE APENAS TESTE)

  const { token } = route.params;
  // const [projetos, setProjetos] = useState([]);

    // Verifica se o token foi passado corretamente
    if (!token) {
      Alert.alert("Erro", "Token não encontrado!");
      return <View><Text>Erro: Token não encontrado</Text></View>;
    }

  // useEffect(() => {
  //   const fetchProjetos = async () => {
  //     const res = await fetch('https://SEUAPP.bubbleapps.io/api/1.1/obj/projeto', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     const data = await res.json();
  //     setProjects(data.response.results);
  //   };

  //   fetchProjetos();
  // }, [token]);

  // Função de logout
  const handleLogout = () => {
    navigation.navigate('Login'); // Navega para a tela de Login
  };

  // Remover o botão de Voltar
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,  // Remove o botão de voltar na tela de Projetos
    });
  }, [navigation]);

  return (
    // <FlatList
    //   data={projetos}
    //   keyExtractor={(item) => item._id}
    //   renderItem={({ item }) => (
    //     <View>
    //       <Text>Seu Antônio</Text>
    //       <Text>Status: Novo Projeto</Text>
    //       {/* <Text>{item.nome}</Text>
    //       <Text>Status: {item.status}</Text> */}
    //     </View>
    //   )}
    // />
    // <Text>Tela de Projetos carregada!</Text>

    <View style={styles.container}>
      {/* Topo com título e ícone de sair */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Todos os Projetos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#ff2020" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        {/* Campo de busca */}
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar projeto"
          value={searchQuery}
          onChangeText={handleSearch}
          />

        {/* Botão de refresh */}
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton} disabled={isRefreshing}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Icon name='refresh' size={24} color="#325eed"></Icon>
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Cabeçalho da tabela */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => sortProjects('nome')} style={styles.nomeColumn}>
          <Text style={styles.headerText}>Nome {sortOrder.nome === 'asc' ? '↑' : '↓'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortProjects('status')} style={styles.statusColumn}>
          <Text style={styles.headerText}>Status {sortOrder.status === 'asc' ? '↑' : '↓'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => sortProjects('prazo')} style={styles.prazoColumn}>
          <Text style={styles.headerText}>Prazo {sortOrder.prazo === 'asc' ? '↑' : '↓'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tabela de projetos */}
      <FlatList
        style={{ flex: 1 }}
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer} // Estilo da lista (borda e fundo)
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    // paddingBottom: 20,
    backgroundColor: '#fafafa',  // Cor de fundo da tela
  },
  topBar: {
    flexDirection: 'row',
    slignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#325eed',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#325eed',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginRight: 10,
    // marginBottom: 20,
  },
  refreshButton: {
    padding: 8,
    // backgroundColor: '#325eed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#325eed',
    backgroundColor: 'white',  // Cor de fundo do cabeçalho
    borderTopRightRadius: 10,  // Borda arredondada
    borderTopLeftRadius: 10,  // Borda arredondada
    height: 40,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#325eed',
    textAlign: 'center',
    flex: 1,  // Para garantir que o título ocupe toda a coluna
  },
  listContainer: {
    backgroundColor: 'white',  // Fundo branco da lista
    borderColor: '#325eed',  // Cor da borda
    borderWidth: 1,  // Largura da borda
    // borderRadius: 10,
    borderBottomRightRadius: 10,  // Borda arredondada
    borderBottomLeftRadius: 10,  // Borda arredondada
    padding: 10,  // Padding para dar espaçamento dentro da lista
    flexGrow: 1,  // Para garantir que a lista ocupe o espaço disponível
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
  },
  projectText: {
    fontSize: 14,
    textAlign: 'center',
  },
  // Ajustes específicos para as larguras das colunas
  nomeColumn: {
    width: '45%',  // Nome ocupa 45% da largura
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
  },
  statusColumn: {
    width: '27.5%',  // Status ocupa 27.5% da largura
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  prazoColumn: {
    width: '27.5%',  // Prazo ocupa 27.5% da largura
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
});
