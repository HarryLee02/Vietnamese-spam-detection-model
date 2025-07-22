# Vietnamese-spam-detection-model

## Overview
This repo contains only files that provide a simple web form for checking spam using a machine learning model API deployed at Hugging - Gradio Space.

The model itself is in another repo on [huggingface.co/HarryLee02](https://huggingface.co/spaces/HarryLee02/Vietnamese-spam-detection/tree/main)

## Features

The website contains minimal features since I only want to deploy my model. However, I was generous enough to add these:
- **Detection**: This is the main purpose of the model, it takes `Vietnamese-only` input and return output
- **Language**: A dropdown menu to change between English - Vietnamese


## How it works
- The form sends user input to a backend API route (`/api/predict`) via AJAX.
- The backend API route uses the `@gradio/client` package to connect to Gradio Space and return the results.
- The frontend displays the spam score and category returned by the model.

## Project Structure

```
📦 Vietnamese-spam-detection-model
├── 📁 api
│   └── 📄 predict.js
├── 📄 .gitignore
├── 📄 app.js
├── 📄 index.html
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md
```
`api/predict.js`: Vercel/Next.js API route for backend inference.

`index.html`: The frontend form.

`app.js`: Optional Express server for local development.

`package.json`: Project dependencies.

## Backend API Route Example (Vercel/Next.js)
`api/predict.js`:
```js
import { Client } from "@gradio/client";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: 'Missing input' });
  }
  try {
    const client = await Client.connect("HarryLee02/Vietnamese-spam-detection"); 
    // Replace with your actual Space URL if you also want to train and host your own model.
    const result = await client.predict("/predict", [input]);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

## Local Development
Run this to install dependencies and start local server at http://localhost:3000
```bash
npm install
node app.js
```

For API testing, change `/api/predict.js` logic in your own backend or deploy to Vercel.

## Deploying to Vercel

Click this:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHarryLee02%2FVietnamese-spam-detection-model.git)

or follow the steps below:

1. Clone this GitHub repo.
2. Connect the repo to Vercel (https://vercel.com/import).
3. Vercel will auto-detect the API route in `api/predict.js` and serve `index.html` as a static file.
4. Make sure to update the Gradio Space URL in `api/predict.js` if you are using your own model.
