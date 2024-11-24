
# Project Setup

## Installation

### Install Dependencies
```bash
npm install
```
### Start the Application
#### Development mode:

```bash
npm run dev
```
#### Production mode:

```bash
npm run build
npm start
```
markdown

Copy code

`# Project Setup

## Installation

### Install Dependencies
```bash
npm install
```

### Start the Application

#### Development mode:

```bash
npm run dev
```
#### Production mode:
```bash
npm run build
npm start
```

## Accessing `latestOrders`

### Install ngrok (Linux)

```bash
curl -sSL https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
  | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
  && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
  | sudo tee /etc/apt/sources.list.d/ngrok.list \
  && sudo apt update \
  && sudo apt install ngrok
```
###  Configure ngrok

```bash
ngrok config add-authtoken 2pG4g8pRc2LeIJwIFrP31KlyJqY_58QCtasu9viNkcEfvm4uA
```
### Start ngrok

```bash
ngrok http --url=vigorously-valued-hermit.ngrok-free.app 3000
```
