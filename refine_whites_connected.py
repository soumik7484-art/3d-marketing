import os
import sys
from pathlib import Path
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

files = [
    "fig3.png"
]

print("Color-keying out only large white background pockets (keeping small highlights)...\n")

for filename in files:
    img_path = public / filename
    if not img_path.exists():
        continue
        
    print(f"  Processing {filename} ...", end=" ", flush=True)
    img = Image.open(img_path).convert("RGBA")
    width, height = img.size
    pixels = list(img.getdata())
    
    # We want to identify connected components of pixels where R >= 248, G >= 248, B >= 248 and A > 100 (currently opaque).
    visited = set()
    to_transparent = set()
    
    for y in range(height):
        for x in range(width):
            idx = y * width + x
            if idx in visited:
                continue
                
            r, g, b, a = pixels[idx]
            if a > 100 and r >= 248 and g >= 248 and b >= 248:
                # Find all connected pixels in this component
                component = []
                queue = [(x, y)]
                visited.add(idx)
                
                while queue:
                    curr_x, curr_y = queue.pop(0)
                    component.append((curr_x, curr_y))
                    
                    # 4-connectivity
                    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nx, ny = curr_x + dx, curr_y + dy
                        if 0 <= nx < width and 0 <= ny < height:
                            n_idx = ny * width + nx
                            if n_idx not in visited:
                                nr, ng, nb, na = pixels[n_idx]
                                if na > 100 and nr >= 248 and ng >= 248 and nb >= 248:
                                    visited.add(n_idx)
                                    queue.append((nx, ny))
                
                # If the component of white pixels is larger than 100 pixels, it's a background pocket.
                # If it's smaller, it's a highlight (like eye sparkles or metallic reflection), so we keep it.
                if len(component) > 100:
                    for cx, cy in component:
                        to_transparent.add(cy * width + cx)
                        
    # Apply changes
    new_data = []
    for idx, item in enumerate(pixels):
        if idx in to_transparent:
            new_data.append((item[0], item[1], item[2], 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Save to temp and overwrite to avoid OneDrive lock
    tmp_out = tmpdir / filename
    img.save(tmp_out, "PNG")
    img_path.write_bytes(tmp_out.read_bytes())
    print(f"OK (cleared {len(to_transparent)} white pixels)")

print("\nDone! Inner white background pockets have been cleared.")
