#!/usr/bin/env node

/**
 * Generate PWA icons for BedrockELA
 * Creates simple colored squares with emoji/text since we don't have a graphic designer
 */

const fs = require('fs');
const { createCanvas } = require('canvas');

// Icon sizes needed
const sizes = [72, 96, 128, 144, 152, 192, 384, 512, 1024];

// BedrockELA brand colors
const bgColor = '#305853'; // Teal green
const emoji = '📚'; // Book emoji

async function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // Add emoji in center
    const fontSize = Math.floor(size * 0.6);
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, size / 2, size / 2);
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/icon-${size}x${size}.png`, buffer);
    console.log(`✅ Generated icon-${size}x${size}.png`);
}

async function main() {
    if (!fs.existsSync('icons')) {
        fs.mkdirSync('icons', { recursive: true });
    }
    
    console.log('🎨 Generating PWA icons...\n');
    
    for (const size of sizes) {
        try {
            await generateIcon(size);
        } catch (err) {
            console.error(`❌ Failed to generate ${size}x${size}:`, err.message);
        }
    }
    
    console.log('\n✅ All icons generated!');
    console.log('📁 Files saved to: icons/');
}

main().catch(console.error);
