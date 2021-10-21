import * as fs from "fs";
import { createSeed, loadSeed, createClient, createStream, queryStream, updateStream } from "./javascript/utils.mjs";

async function main() {
  const seed_path = "./resources/seed_hex.txt";
  var seed;
  if (fs.existsSync(seed_path)) {
    seed = loadSeed(seed_path)
  } else {
    seed = createSeed(seed_path)
  };
  let client = await createClient(seed, main, 1);
  console.log("called");
  let streamId_1 = await createStream(client, content_1);
  let streamId_2 = await createStream(client, content_2);
  let streamId_3 = await createStream(client, content_3);
}

let content_1 = {
  name: "Polar Bear",
  status: 6,
  color: "white"
};

let content_2 = {
  name: "T-Rex",
  status: 10,
  color: "green"
};

let content_3 = {
  lens: [
    {
      rename: {
        source: "name",
        destination: "common_name"
      }
    },
    {
      remove: {
        name: "color"
      }
    },
    {
      convert: {
        name: "status",
        sourceType: "integer",
        destinationType: "string",
        mapping: [
          {
            "10": "extinct",
            "9": "extinct_in_the_wild",
            "8": "critically_endangered",
            "7": "endangered",
            "6": "vulnerable",
            "5": "near_threatened",
            "4": "conservation_dependent",
            "3": "least_concerned",
            "2": "data_deficient",
            "1": "not_evaluated"
          }
        ]
      }
    },
    {
      add: {
        name: "scientific_name",
        type: "string"
      }
    }
  ]
};

main()
