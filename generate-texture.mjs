import sharp from 'sharp';

async function main() {
  const width = 128; // Small tileable dimension
  const height = 128;
  const buffer = Buffer.alloc(width * height * 4);
  
  for (let i = 0; i < buffer.length; i += 4) {
    // Generate subtle transparent noise: 10% density of fine white/grey dust specks
    const isNoisePixel = Math.random() < 0.10;
    if (isNoisePixel) {
      const val = Math.floor(220 + Math.random() * 35); // Very bright specks
      buffer[i] = val;     // R
      buffer[i + 1] = val; // G
      buffer[i + 2] = val; // B
      // Low opacity alpha (8 to 32 out of 255) to make it extremely subtle and premium
      buffer[i + 3] = Math.floor(8 + Math.random() * 24); 
    } else {
      buffer[i] = 0;
      buffer[i + 1] = 0;
      buffer[i + 2] = 0;
      buffer[i + 3] = 0; // Transparent background
    }
  }

  try {
    await sharp(buffer, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
    .png()
    .toFile('public/texture.png');
    console.log('✓ Successfully generated transparent space-dust public/texture.png');
  } catch (err) {
    console.error('Error generating texture:', err);
    process.exit(1);
  }
}

main();
