import os
from pathlib import Path
from PIL import Image
import colorsys

public = Path(__file__).parent / "public"

def shift_hue(input_path, output_path, hue_shift):
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
            
        h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
        h = (h + hue_shift) % 1.0
        nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
        new_pixels.append((int(nr * 255), int(ng * 255), int(nb * 255), a))
        
    img.putdata(new_pixels)
    img.save(output_path, "PNG")
    print(f"Created extra doll variant: {output_path.name}")

# Create 2 more unique standard dolls:
# 1. "Gwen" (Nebula/Pink-Purple Edition) - based on Flora (fig2.png), shifted by 0.65 (turns green to pink-purple)
shift_hue(public / "fig2.png", public / "fig11.png", 0.65)

# 2. "Jolt" (Acid/Neon-Green Edition) - based on Nexus (fig4.png), shifted by 0.80 (turns blue to neon green)
shift_hue(public / "fig4.png", public / "fig12.png", 0.80)
