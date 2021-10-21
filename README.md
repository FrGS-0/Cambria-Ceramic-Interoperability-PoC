# Cambria/Ceramic Interoperability PoC
## Introduction
A network is a group of computers connected by cables, electromagnetic waves, or any other medium that is able to propagate binary information. Since its beginnings, a common problem in networking was to make sure computers were able to understand each other, which gave birth to a myriad of protocols for data communication.

Nowadays, it is still a problem to guarantee backward and forward compatibility between different versions of the same software. If a piece of software receives some data (in the form of a JSON string, for example) that it cannot handle, even if it is coming from an older or newer version of itself, it will crash and be rendered useless. Ideally, things like up-to-date servers dealing with outdated clients, and up-to-date clients dealing with outdated should servers still be able to communicate in a technologically diversified world as ours.

Cambria lenses are a new solution to deal with the problem of backward and forward compatibility. They establish an elegant middleware between communicating parties and, much like a human interpreter, ensure they all speak the same language by modifying the data accordingly. They can be specified in either YAML or JSON formats, and can be used withing javascript code as a simple library installed with npm by running
```
npm install cambria
```
When specified in JSON format, the lenses follow the schema in /resources/cambria-lens-schema.json from the official Cambria repository at https://github.com/inkandswitch/cambria-project, which can be easily stored in the Ceramic Network as a Data Model. Consequently, an individual lens can be created and loaded as an ordinary Tile Docoument with a potentially public available key following the JSON schema.
## Proof of Concept
In the example video below, I loaded two JSON Tile Documents from the network. One of them specifies an input data stream in an older version of a schema related to animals and their conservation status and the other is lens specification in JSON format that modifies the data to be compatible with the newer versions. Upon pressing the "Translate" button, I activate the Cambria middleware and get the updated version of the document. Notice that I could have just as easily sent the output data into the middleware again and obtained the same original result, though this part was not implemented.

https://youtu.be/uGcdV7w4r6s

