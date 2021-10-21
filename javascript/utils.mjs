import { randomBytes } from "@stablelib/random";
import { CeramicClient } from "@ceramicnetwork/http-client";
import KeyDidResolver from 'key-did-resolver'
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids';
import * as fs from "fs";

// Both toHexString and toByteArray were taken from
// https://bitcoin.stackexchange.com/questions/52727/byte-array-to-hexadecimal-and-back-again-in-javascript
function toHexString(byteArray) {
  return Array.prototype.map.call(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}

function toByteArray(hexString) {
  var result = [];
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return result;
}

function createSeed(seed_path) {
  const seed = randomBytes(32);
  let hexSeed = toHexString(seed);
  fs.writeFileSync(seed_path, hexSeed);
  console.log("Generated seed: " + hexSeed);
  return seed
}

function loadSeed(seed_path) {
  let hexSeed = fs.readFileSync(seed_path, "utf8");
  console.log("Your seed: ", hexSeed);
  let seed = toByteArray(hexSeed);
  return Uint8Array.from(seed);
}

async function createClient(seed) {
  const API_URL = "https://gateway-clay.ceramic.network";
  const ceramic = new CeramicClient(API_URL);
  const resolver = {
    ...KeyDidResolver.getResolver()
  }
  ceramic.did = new DID({ resolver });

  const provider = new Ed25519Provider(seed);
  ceramic.did.setProvider(provider);
  await ceramic.did.authenticate().then((par) => {
    console.log("Client created succesfully")
  })
  return ceramic
}

async function createStream(client, content) {
  await TileDocument.create(client, content).then((doc) => {
    console.log(doc.content);
    console.log("Stream Id: ", doc.id.toString());
  });
}

async function queryStream(client, streamId) {
  let doc = await TileDocument.load(client, streamId);
  console.log("Data: ", doc.content)
  return doc.content
}

async function updateStream(client, address) {
  console.log("Function Called");
  let streamId = fs.readFileSync("./resources/streamKey.txt", "utf8");
  let doc = await TileDocument.load(client, streamId);
  console.log("Loaded");
  let data = doc.content;
  data.list.push(address);
  console.log(data);
  await doc.update(data)
  console.log("Stream updated succesfully");
}

export { toHexString, toByteArray, createSeed,
  loadSeed, createClient, createStream, queryStream, updateStream
};
