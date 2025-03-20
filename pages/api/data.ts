import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";

// SSE connection for data.json file to trigger page reload
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  const dataPath = path.join(process.cwd(), ".built/data.json");

  // Send initial message to keep the connection open
  res.write("data: connected\n\n");

  const sendUpdate = () => {
      res.write("data: update\n\n");
  };

  // Watch for file changes
  const watcher = fs.watch(dataPath, sendUpdate);

  // Handle client disconnect
  req.on("close", () => {
    watcher.close();
  });
}