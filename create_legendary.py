import os
from pathlib import Path
from PIL import Image, ImageEnhance
import colorsys

public = Path(__file__).parent / "public"

def make_cyan_diamond(input_path, output_path):
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
        
        # Shift hue to Cyan (Cyan is around 180 degrees, which is 0.5 in colorsys)
        h = 0.52
        
        # Increase saturation and value to give a vibrant, crystal look
        s = min(s * 1.3, 1.0)
        v = min(v * 1.2, 1.0)
        
        # Convert back to RGB
        nr, ng, nb = colorsys.hsv_to_rgb(h, s, v)
        new_pixels.append((int(nr * 255), int(ng * 255), int(nb * 255), a))
        
    img.putdata(new_pixels)
    
    # Enhance contrast to give that crystal "hard highlights" diamond reflection look
    contrast = ImageEnhance.Contrast(img)
    img = contrast.enhance(1.4)
    
    # Enhance sharpness to make sparkles pop
    sharpness = ImageEnhance.Sharpness(img)
    img = sharpness.enhance(1.5)
    
    img.save(output_path, "PNG")
    print(f"Created legendary cyan diamond figurine: {output_path.name}")

# Use the magic wizard (fig10.png) as the base for the legendary edition
make_cyan_diamond(public / "fig10.png", public / "fig_legendary.png")
