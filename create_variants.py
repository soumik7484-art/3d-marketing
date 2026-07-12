import os
from pathlib import Path
from PIL import Image
import colorsys

public = Path(__file__).parent / "public"

def shift_hue(input_path, output_path, hue_shift):
    """Shifts the hue of an RGBA image by a fraction (0.0 to 1.0)"""
    if not input_path.exists():
        print(f"File not found: {input_path}")
        return
        
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = list(img.getdata())
    
    new_pixels = []
    for r, g, b, a in pixels:
        if a == 0:
            new_pixels.append((r, g, b, 0))
            continue
            
        # Convert RGB to HSV
        h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
        
        # Shift hue
        h = (h + hue_shift) % 1.0
        
        # Convert HSV back to RGB
        nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
        new_pixels.append((int(nr * 255), int(ng * 255), int(nb * 255), a))
        
    img.putdata(new_pixels)
    img.save(output_path, "PNG")
    print(f"Created hue-shifted variant: {output_path.name}")

# Create two new standard dolls:
# 1. "Luna" (Goth/Purple Edition) - based on Starla (fig3.png), shifted to purple/violet (shift by 0.35)
shift_hue(public / "fig3.png", public / "fig5.png", 0.35)

# 2. "Volt" (Electric/Yellow-Green Edition) - based on Blaze (fig1.png), shifted to yellow-green (shift by 0.22)
shift_hue(public / "fig1.png", public / "fig6.png", 0.22)
