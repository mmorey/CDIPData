#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function convertToJson() {
  // Read the txt file
  const txtContent = fs.readFileSync(
    path.join("public", "data", "cdip_sccoos.txt"),
    "utf8"
  );
  const lines = txtContent.trim().split("\n");

  // Convert each line to an object
  const data = lines.map((line) => {
    const fields = line.split("\t");
    return {
      timestamp: fields[0],
      station_number: fields[1],
      station_name: fields[2],
      latitude: parseFloat(fields[3]),
      longitude: parseFloat(fields[4]),
      depth_cm: parseInt(fields[5]),
      hs_m: fields[6] ? parseFloat(fields[6]) : null,
      tp_s: fields[7] ? parseFloat(fields[7]) : null,
      dp_deg: fields[8] ? parseFloat(fields[8]) : null,
      sst_c: fields[9] ? parseFloat(fields[9]) : null,
    };
  });

  // Create the final JSON object with metadata
  const jsonOutput = {
    last_updated: new Date().toISOString(),
    data: data,
  };

  // Write to JSON file
  fs.writeFileSync(
    path.join("public", "data", "cdip_sccoos.json"),
    JSON.stringify(jsonOutput, null, 2)
  );
}

convertToJson();
