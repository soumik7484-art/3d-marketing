import os
from pathlib import Path
from PIL import Image

public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

files = [
    "fig1.png", "fig2.png", "fig3.png", "fig4.png",
    "fig1_gold.png", "fig2_gold.png", "fig3_gold.png", "fig4_gold.png",
    "fig1_silver.png", "fig2_silver.png", "fig3_silver.png", "fig4_silver.png"
]

print("Color-keying out remaining bright white pockets in all 12 figurines...\n")

for filename in files:
    img_path = public / filename
    if not img_path.exists():
        continue
        
    print(f"  Refining {filename} ...", end=" ", flush=True)
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    removed_pixels = 0
    
    for item in data:
        r, g, b, a = item
        # If the pixel is very bright white/near-white (e.g. RGB > 245)
        # and it's currently opaque (a > 200), we make it transparent.
        # We use a threshold of 245 to avoid hitting off-white/cream highlights on the toys.
        if a > 0 and r >= 245 and g >= 245 and b >= 245:
            # Turn transparent
            new_data.append((r, g, b, 0))
            removed_pixels += 1
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Save to temp and then overwrite to bypass OneDrive locks
    tmp_out = tmpdir / filename
    img.save(tmp_out, "PNG")
    
    img_path.write_bytes(tmp_out.read_bytes())
    print(f"OK (cleared {removed_pixels} white pixels)")

print("\nDone! All inner white background pockets have been cleared.")
