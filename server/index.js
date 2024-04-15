const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '64e07c6872ab956ea65194090e3e25379ac41329e413dc046019d85018473286';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const name = req.body.name;
  const proof = req.body.proof;


// verify proof against the Merkle Root
const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  //console.log(`Listening on port ${port}!`);
});
