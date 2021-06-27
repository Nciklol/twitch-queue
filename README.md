# Note: To run twitch-queue you need to have [NodeJS](https://nodejs.org/en/) installed. After that run `npm i` (or `pnpm i` if you use pnpm, I'd recommend it.) to install the required packages.

### Usage:
- Commands:
    - !open (Requires mod)
    - !close (Requires mod)
    - !join
    - !leave
    - !list
    - !next 1-10 (Specify a number 1-10)
    - !clear (Requires mod)
    - !remove (Specify any number : Requires mod)

### Installation Guide:

Download the latest [release](https://github.com/Nciklol/twitch-queue/releases) & extract it.

twitch-queue requires that you've setup a .env file with `TWITCH_KEY` and `TWTICH_USERNAME`. 

Example of the file would be

.env
```
TWITCH_KEY=oauth:key
TWITCH_USERNAME=twitch_username
```

*To get your oauth key, go to https://twitchapps.com/tmi/*

The file strcture needs to be

```
.env
out > folder > index.js
```

(2 folders inbetween .env and index.js)
You can modify the path dotenv checks for by changing `config({ path: "../../.env" });` to be `config()` if you want it to check the same directory.

After you've setup your .env file, go inside index.js and change enter-channel to be your channel
```js
const channels = ['enter-channel'] // Supports only 1 channel currently
```
Do note that as the comment says, this bot only supports one channel. I probably won't make it support multi-channels, but if you want to help contribute then feel free to submit a pull request.

After that, the bot is ready to go. Simply run it by typing `node .` and if you want to set it up on a server, refer to [this](https://discordjs.guide/improving-dev-environment/pm2.html) guide.
