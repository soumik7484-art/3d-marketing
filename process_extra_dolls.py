import os
import sys
from pathlib import Path
from rembg import remove
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

new_dolls = {
    "fig5.png":  public / "fig5_raw.png",
    "fig6.png":  public / "fig6_raw.png",
    "fig7.png":  public / "fig7_raw.png",
    "fig8.png":  public / "fig8_raw.png",
    "fig9.png":  public / "fig9_raw.png",
    "fig10.png": public / "fig10_raw.png",
}

print("Running rembg on 6 new standard unique dolls...\n")

for dest_name, src_path in new_dolls.items():
    print(f"  Segmenting {src_path.name} -> {dest_name} ...", end=" ", flush=True)
    input_data = src_path.read_bytes()
    
    # Process with alpha matting and erosion to keep boundaries clean
    output_data = remove(
        input_data,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=15
    )
    
    # Write to temp first
    tmp_out = tmpdir / dest_name
    tmp_out.write_bytes(output_data)
    
    # Post-process: clean out any large white background pockets (size > 100 pixels)
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
                        
    # Apply pocket transparency
    new_pixels = []
    for idx, item in enumerate(pixels):
        if idx in to_transparent:
            new_pixels.append((item[0], item[1], item[2], 0))
        else:
            new_pixels.append(item)
            
    img.putdata(new_pixels)
    
    # Save final
    img.save(tmp_out, "PNG")
    
    # Overwrite public
    (public / dest_name).write_bytes(tmp_out.read_bytes())
    print(f"OK (cleared {len(to_transparent)} white pocket pixels)")

print("\nDone! All 6 new dolls are transparent, pocket-cleared, and ready.")
