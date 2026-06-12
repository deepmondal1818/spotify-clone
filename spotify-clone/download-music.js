const https = require('https');
const fs = require('fs');
const path = require('path');

const musicFiles = [
  {
    name: 'blinding-lights.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    name: 'as-it-was.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    name: 'stay.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    name: 'levitating.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
  {
    name: 'peaches.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
  },
  {
    name: 'good-4-u.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3'
  },
  {
    name: 'montero.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3'
  },
  {
    name: 'heat-waves.mp3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3'
  }
];

const audioDir = path.join(__dirname, 'public', 'audio');

if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

let downloaded = 0;
let failed = 0;

function downloadFile(file) {
  return new Promise((resolve) => {
    const filePath = path.join(audioDir, file.name);
    const fileStream = fs.createWriteStream(filePath);

    console.log(`⬇️ Downloading ${file.name}...`);

    https.get(file.url, (response) => {
      if (response.statusCode !== 200) {
        console.log(`❌ Failed to download ${file.name} (Status: ${response.statusCode})`);
        failed++;
        fileStream.close();
        fs.unlink(filePath, () => {});
        response.resume();
        return resolve();
      }

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => {
          console.log(`✅ Downloaded ${file.name}`);
          downloaded++;
          resolve();
        });
      });

      fileStream.on('error', (err) => {
        console.log(`❌ File error for ${file.name}: ${err.message}`);
        failed++;
        fs.unlink(filePath, () => {});
        resolve();
      });
    }).on('error', (err) => {
      console.log(`❌ Network error for ${file.name}: ${err.message}`);
      failed++;
      fs.unlink(filePath, () => {});
      resolve();
    });
  });
}

async function downloadAll() {
  console.log('🎵 Starting music downloads...\n');

  for (const file of musicFiles) {
    await downloadFile(file);
  }

  console.log(`\n✨ Done! Downloaded: ${downloaded}, Failed: ${failed}`);
  console.log(`📁 Files saved to: ${audioDir}`);
}

downloadAll().catch((err) => {
  console.error('Unexpected error:', err);
});