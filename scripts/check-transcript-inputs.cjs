const fs = require('fs');
const path = require('path');

const transcriptPath = 'C:/Users/dell/.gemini/antigravity/brain/db85d9da-7aa8-4a89-a7cb-87ec76cdebab/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT') {
      console.log('--- USER INPUT at step ' + obj.step_index + ' ---');
      console.log(obj.content ? obj.content.slice(0, 300) : '(no text)');
      if (obj.media) {
        console.log('Media:', obj.media.map(m => path.basename(m.uri)));
      }
    }
  } catch(e) {}
}

