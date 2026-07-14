import os
import sys
from pathlib import Path
from rembg import remove
from PIL import Image
import colorsys

sys.stdout.reconfigure(encoding="utf-8")

brain  = r"C:\Users\Soumik\OneDrive\Desktop\zeolite"
brain_cache = r"C:\Users\Soumik\.gemini\antigravity\brain\e4b08671-2b4e-449a-9e6c-d39307cd3f23"
public = Path(brain) / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

# 1. Segment fig13, fig14, fig15 from raw generated sources
raw_sources = {
    "fig13.png": Path(brain_cache) / "fig13_raw_1784042612282.png",
    "fig14.png": Path(brain_cache) / "fig14_raw_1784042628478.png",
    "fig15.png": Path(brain_cache) / "fig15_raw_1784042642502.png",
}

print("Running rembg on 3 new generated dolls...\n")

for dest_name, src_path in raw_sources.items():
    if not src_path.exists():
        print(f"Error: {src_path} not found.")
        continue
        
    print(f"  Segmenting {src_path.name} -> {dest_name} ...", end=" ", flush=True)
    input_data = src_path.read_bytes()
    
    output_data = remove(
        input_data,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=15
    )
    
    tmp_out = tmpdir / dest_name
    tmp_out.write_bytes(output_data)
    
    # Run connected components white pocket sweep
    img = Image.open(tmp_out).convert("RGBA")
    width, height = img.size
    pixels = list(img.getdata())
    
    visited = set()
    to_transparent = set()
    
    for y in range(height):
        for x in range(width):
            idx = y * width + x
            if idx in visited:
                continue
                
            r, g, b, a = pixels[idx]
            if a > 100 and r >= 245 and g >= 245 and b >= 245:
                component = []
                queue = [(x, y)]
                visited.add(idx)
                
                while queue:
                    curr_x, curr_y = queue.pop(0)
                    component.append((curr_x, curr_y))
                    
                    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                        nx, ny = curr_x + dx, curr_y + dy
                        if 0 <= nx < width and 0 <= ny < height:
                            n_idx = ny * width + nx
                            if n_idx not in visited:
                                nr, ng, nb, na = pixels[n_idx]
                                if na > 100 and nr >= 245 and ng >= 245 and nb >= 245:
                                    visited.add(n_idx)
                                    queue.append((nx, ny))
                                    
                if len(component) > 100:
                    for cx, cy in component:
                        to_transparent.add(cy * width + cx)
                        
    new_pixels = []
    for idx, item in enumerate(pixels):
        if idx in to_transparent:
            new_pixels.append((item[0], item[1], item[2], 0))
        else:
            new_pixels.append(item)
            
    img.putdata(new_pixels)
    img.save(tmp_out, "PNG")
    (public / dest_name).write_bytes(tmp_out.read_bytes())
    print(f"OK (cleared {len(to_transparent)} white pocket pixels)")

# 2. Programmatically generate Doll 16 (Cleo / Pharaoh hue-shifted version) from fig9.png (Steampunk)
print("\nCreating Doll 16 by hue-shifting fig9.png (Steampunk) to Emerald/Pharaoh Edition...")
fig9_path = public / "fig9.png"
if fig9_path.exists():
    img9 = Image.open(fig9_path).convert("RGBA")
    w, h = img9.size
    pix9 = list(img9.getdata())
    
    new_pix9 = []
    for r, g, b, a in pix9:
        if a == 0:
            new_pix9.append((r, g, b, 0))
            continue
            
        h_val, s_val, v_val = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
        # Shift hue to emerald/turquoise (around 0.40)
        h_val = (h_val + 0.45) % 1.0
        nr, ng, nb = colorsys.hsv_to_rgb(h_val, s_val, v_val)
        new_pix9.append((int(nr * 255), int(ng * 255), int(nb * 255), a))
        
    img9.putdata(new_pix9)
    img16_out = tmpdir / "fig16.png"
    img9.save(img16_out, "PNG")
    (public / "fig16.png").write_bytes(img16_out.read_bytes())
    print("OK (Created fig16.png successfully)")
else:
    print("Error: fig9.png not found.")

print("\nDone! All 4 new transparent dolls are processed and in /public/")
