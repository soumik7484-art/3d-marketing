import os
import sys
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

filename = "fig3.png"
img_path = public / filename

if img_path.exists():
    print(f"Targeted pocket clearing for {filename}...")
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = list(img.getdata())
    
    new_data = []
    cleared = 0
    
    for y in range(height):
        for x in range(width):
            idx = y * width + x
            r, g, b, a = pixels[idx]
            
            # Define safe bounding boxes for the pigtail background pockets:
            # Left pocket: x between 200 and 420, y between 150 and 460
            # Right pocket: x between 600 and 800, y between 150 and 460
            in_left_pocket_zone = (200 <= x <= 420) and (150 <= y <= 460)
            in_right_pocket_zone = (600 <= x <= 800) and (150 <= y <= 460)
            
            if (in_left_pocket_zone or in_right_pocket_zone):
                # In these zones, the background is light/white (RGB all high)
                # We use a threshold of 210 to catch any remaining shadows/refractions in the white pocket.
                if r >= 200 and g >= 200 and b >= 200 and a > 0:
                    new_data.append((r, g, b, 0))
                    cleared += 1
                    continue
            
            new_data.append((r, g, b, a))
            
    img.putdata(new_data)
    
    # Save to temp and overwrite to avoid OneDrive lock
    tmp_out = tmpdir / filename
    img.save(tmp_out, "PNG")
    img_path.write_bytes(tmp_out.read_bytes())
    print(f"Successfully cleared {cleared} pocket pixels in {filename}!")
else:
    print(f"Error: {filename} not found.")
