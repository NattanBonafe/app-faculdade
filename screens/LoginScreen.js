import React, { useState } from 'react';
import { View, TextInput, Button, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pseudo-usuário para validação
  const fakeUser = {
    email: 'teste@teste.com',
    password: '123',
  };

  const handleLogin = async () => {
  //   try {
  //     // Fazendo a requisição para o Bubble
  //     const response = await fetch('https://SEUAPP.bubbleapps.io/api/1.1/wf/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: email,
  //         password: password,
  //       }),
  //     });

  //     // Parsing da resposta do Bubble
  //     const data = await response.json();

  //     // Verificando se o login foi bem-sucedido
  //     if (data.response && data.response.token) {
  //       // Se o login for bem-sucedido, navega para a próxima tela (Projetos)
  //       navigation.navigate('Projetos', { token: data.response.token });
  //     } else {
  //       // Se o login falhar, exibe uma mensagem de erro
  //       Alert.alert('Erro no login', data.message || 'Email ou senha incorretos');
  //     }
  //   } catch (error) {
  //     // Se houver algum erro na requisição
  //     Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
  //   }

    
    // Verifica se o email e a senha são válidos com base no JSON simulado
    if (email === fakeUser.email && password === fakeUser.password) {
      // Limpa os campos de email e senha após o login
      setEmail('');
      setPassword('');
      
      // Se estiver correto, navega para a próxima tela (Projetos)
      const fakeToken = "fake_token_123";
      navigation.navigate('Todos os Projetos', {token: fakeToken});
    } else {
      // Se a validação falhar, exibe uma mensagem de erro
      if (email !== fakeUser.email && password !== fakeUser.password) {
        Alert.alert('Erro no login', 'Email e senha incorretos');
      } else if (email !== fakeUser.email) {
        Alert.alert('Erro no login', 'Email incorreto');
      } else if (password !== fakeUser.password) {
        Alert.alert('Erro no login', 'Senha incorreta');
      }

    }
    
  };

  // return (
  //     <View>
  //       <Text>Email:</Text>
  //       <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
  //       <Text>Senha:</Text>
  //       <TextInput value={password} onChangeText={setPassword} secureTextEntry />
  //       <Button title="Entrar" onPress={handleLogin} />
      
  //       {/* Teste de renderização
  //       <Text style={{ marginTop: 20 }}>Tela de Login Carregada!</Text> */}
  //     </View>
  // );
  return (
    <ImageBackground source={require('../assets/fundo-login-degrade.webp')} 
    style={styles.backgroundImage}>

        <View style={styles.formContainer}>
          <Text style={styles.headerText}>Seja bem-vindo!</Text>
          
          <Text style={styles.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
          />
          
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          
          <Button title="Entrar" onPress={handleLogin} color="#325eed" />
          
          <Text style={styles.forgotPassword}>Esqueci minha senha</Text>

          {/* <View style={styles.footer}>
            <Text style={styles.footerText}>Novo usuário?</Text>
            <Text style={styles.registerLink}>Cadastrar-se</Text>
          </View> */}
        </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  formContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 5,  // Para Android
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#325eed',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#325eed',
    width: '100%',
    marginBottom: 5,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#325eed',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#325eed',
    marginBottom: 20,
    textAlign: 'right',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#325eed',
  },
  registerLink: {
    fontSize: 14,
    color: '#325eed',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
