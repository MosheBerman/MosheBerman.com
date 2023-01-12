const express = require('express');
const app = express();

// Required middleware so express can parse requests.
app.use(express.text());
app.use(express.json());

// Don't encode the port in a public repo.
const port = process.env.AS_PO;
const pass = process.env.AS_PA;
const endpoint = process.env.AS_E;
const exclude_old_transactions = process.env.AS_O || false;

// Handle both prod and sandbox environments.
const verifyURLs = {
  prod: 'https://buy.itunes.apple.com/verifyReceipt',
  test: 'https://sandbox.itunes.apple.com/verifyReceipt',
};

// Sends a post request to the specified URL
const verifyWithUrl = async (payload, url) => {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

/**
 * Adds a post endpoint.
 */
app.post(endpoint, async (req, res) => {
  const payload = {
    'receipt-data': req.body,
    password: pass,
    'exclude-old-transactions': exclude_old_transactions,
  };

  // First use prod endpoint...
  let prodRes = await verifyWithUrl(payload, verifyURLs.prod);
  let prodData = await prodRes.json();

  // ...then fall back to sandbox endpoint if we have a sandbox receipt.
  if (prodData.status == 21007) {
    const sandboxRes = await verifyWithUrl(payload, verifyURLs.test);
    const sandboxData = await sandboxRes.json();
    return res.send(sandboxData);
  }
  res.send(prodData);
});

app.listen(port, () => {
  console.log(
    `App subscription verification service listening on port ${port}`
  );
});
