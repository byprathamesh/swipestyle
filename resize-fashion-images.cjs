const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/assets/fashion');
const size = { width: 400, height: 600 };

fs.readdirSync(dir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    const filePath = path.join(dir, file);
    sharp(filePath)
      .resize(size.width, size.height, { fit: 'cover' })
      .jpeg({ quality: 75 })
      .toFile(filePath + '.tmp', (err, info) => {
        if (err) return console.error('Error processing', file, err);
        fs.renameSync(filePath + '.tmp', filePath);
        console.log('Optimized', file);
      });
  }
}); 