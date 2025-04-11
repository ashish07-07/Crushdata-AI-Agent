import { screen, imageResource, mouse, Button, sleep } from '@nut-tree/nut-js';

async function testChromeIconClick() {
  try {
    // 1. Load your saved Chrome icon image
    const chromeIcon = await imageResource('chrome-desktop-icon.png');
    
    // 2. Look for the icon on screen
    const iconPosition = await screen.find(chromeIcon, {
      confidence: 0.9,
      searchRegion: screen.from(0, 0).to(800, 600)
    });
    
    // 3. Move to icon and double-click
    await mouse.setPosition(iconPosition);
    await mouse.click(Button.LEFT);
    await mouse.click(Button.LEFT);
    
    // 4. Wait for Chrome to open
    await sleep(3000);
    console.log('Success! Chrome should be opening now!');

  } catch (error) {
    console.error('Failed:', error);
  }
}

// Run the test
testChromeIconClick();

export function POST()
{
            
}