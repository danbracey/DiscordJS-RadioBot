
# Edgehog Radio - Discord Bot

This Discord Bot allows the playback of Edge Hill's student run radio station 'Edgehog'

https://www.edgehill.ac.uk/departments/academic/english-and-creative-arts/edgehogmedia/edgehogradio/




## Authors

- [@danbracey](https://www.github.com/danbracey)


## Requirements & Dependencies

- Node
- npm
- DiscordJS (Installed by npm)
- Dotenv (Installed by npm)
- libsodium-wrappers (Installed by npm, handles SSL)
## Run Locally

Create a new Discord Bot at https://discord.com/developers/applications


Clone the project

```bash
  git clone https://github.com/danbracey/EdgeHogRadio-DiscordBot
```

Go to the project directory

```bash
  cd EdgeHogRadio-DiscordBot
```

Copy the environment file

```bash
  cp .env.example .env
```

Copy the Bot Token and the Client ID into the appropriate places within the .env file.

Install dependencies

```bash
  npm install
```

ON FIRST RUN:
Register discord slash commands (Note the cjs file extention instead of js)
```bash
  node deploy-commands.cjs
```

Run the Discord Bot.

```bash
  node app.js
```

