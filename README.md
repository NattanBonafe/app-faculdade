# App Sundesk (React Native + Bubble.io + OneSignal)

Este projeto é um aplicativo mobile para acompanhar homologações de projetos fotovoltaicos da plataforma Sundesk (Bubble.io).

## Funcionalidades

- Login via Bubble API
- Listagem de projetos homologados
- Notificações push via OneSignal

## Como rodar

1. Instale o Expo:
   ```
   npm install -g expo-cli
   ```

2. Instale as dependências no projeto:
   ```
   npm install
   ```

3. Rode o app:
   ```
   expo start
   ```

4. Escaneie o QR code no app **Expo Go** no seu celular.

## Configurações necessárias

- Crie um app no [OneSignal](https://onesignal.com) e substitua o `SEU_ONESIGNAL_APP_ID` no `App.js`.
- No Bubble:
  - Habilite a API (Settings > API)
  - Crie um workflow backend para enviar notificações com o API Connector.

