# Advertiser (Server)

Adf.ly links to generate money on your Minecraft server.

## How It Works

1. User runs /ad command
2. Plugin sends a request to the node.js server to get a token
3. Node.js server generates a token, shortens it in a url via adf.ly and returns it to the plugin
4. Send the user the url
5. User clicks on the url, watches an ad by adf.ly and gets redirected to the node.js server and automatically redeems the token
6. The next time the server pulls all newly redeemed tokens, the user gets a reward

## Getting Started

You need to host this node.js server and install the plugin to your Bukkit/Spigot server.

## Installing

Download the files in the src folder and run `npm install` and edit the `config.js`. Use `npm start` to start the server.

## Config

**baseURL:** The base url where the node.js server is publicy available on, with http/https and a slash at the end
**secret:** Secret which is used to authentificate each other (plugin and node.js server)
**adfly.id:** Your adf.ly user id
**adfly.publicKey:** Your adf.ly public key
**adfly.secretKey:** Your adf.ly secret key

## Build With

* [Node](https://nodejs.org)

* [adf.ly](https://www.npmjs.com/package/adf.ly)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [express](https://www.npmjs.com/package/express)
* [morgan](https://www.npmjs.com/package/morgan)
* [token generating function](https://stackoverflow.com/a/46874407)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
