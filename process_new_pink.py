import os
import sys
from pathlib import Path
from rembg import remove
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

sources = {
    "fig3.png":        public / "fig3_new_raw.png",
    "fig3_gold.png":   public / "fig3_gold_new_raw.png",
    "fig3_silver.png": public / "fig3_silver_new_raw.png",
}

print("Running rembg on new pink girl dolls...\n")

for dest_name, src_path in sources.items():
    print(f"  Segmenting {src_path.name} -> {dest_name} ...", end=" ", flush=True)
    
    input_data = src_path.read_bytes()
    
    # Process with alpha matting and erosion to keep boundaries sharp and clean
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
    
    # Verify PNG
    img = Image.open(tmp_out)
    print(f"OK {img.width}x{img.height} RGBA")
    
    # Write to public/
    (public / dest_name).write_bytes(output_data)

print("\nDone! New pink girl dolls are transparent and ready.")
