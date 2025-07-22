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
    const client = await Client.connect("HarryLee02/Vietnamese-spam-detection"); // TODO: Replace with your actual Space URL
    const result = await client.predict("/predict", [input]);
    res.status(200).json(result.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 