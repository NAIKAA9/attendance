const https = require('https');

const indexNowPayload = {
  host: "eslavathnarasimhanaik.github.io",
  key: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
  keyLocation: "https://eslavathnarasimhanaik.github.io/9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d.txt",
  urlList: [
    "https://eslavathnarasimhanaik.github.io/",
    "https://eslavathnarasimhanaik.github.io/attendance/"
  ]
};

const loonemiPayload = {
  host: "naikaa.me",
  key: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
  keyLocation: "https://naikaa.me/9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d.txt",
  urlList: [
    "https://naikaa.me/"
  ]
};

function submitToIndexNow(payload) {
  const data = JSON.stringify(payload);
  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Submitting URLs for host: ${payload.host}`);
    console.log(`Status Code: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (d) => { body += d; });
    res.on('end', () => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ IndexNow successfully queued URLs for ${payload.host}! (Status: ${res.statusCode})`);
      } else {
        console.log(`❌ IndexNow failed for ${payload.host}:`, body || res.statusMessage);
      }
    });
  });

  req.on('error', (error) => {
    console.error(`❌ Request Error for ${payload.host}:`, error.message);
  });

  req.write(data);
  req.end();
}

console.log("🚀 Starting Instant IndexNow crawling submissions...");
submitToIndexNow(indexNowPayload);
submitToIndexNow(loonemiPayload);
