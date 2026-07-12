import os
import sys
from pathlib import Path
from rembg import remove
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

brain  = r"C:\Users\Soumik\.gemini\antigravity\brain\e4b08671-2b4e-449a-9e6c-d39307cd3f23"
public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

sources = {
    # Standard
    "fig1.png": Path(brain) / "fig1_white_1783711985370.png",
    "fig2.png": Path(brain) / "fig2_white_1783712001124.png",
    "fig3.png": Path(brain) / "fig3_white_1783712015563.png",
    "fig4.png": Path(brain) / "fig4_white_1783712027710.png",
    # Gold
    "fig1_gold.png":   Path(brain) / "fig1_gold_1783884049326.png",
    "fig2_gold.png":   Path(brain) / "fig2_gold_1783884080030.png",
    "fig3_gold.png":   Path(brain) / "fig3_gold_1783884111204.png",
    "fig4_gold.png":   Path(brain) / "fig4_gold_1783884141338.png",
    # Silver
    "fig1_silver.png": Path(brain) / "fig1_silver_1783884065066.png",
    "fig2_silver.png": Path(brain) / "fig2_silver_1783884096347.png",
    "fig3_silver.png": Path(brain) / "fig3_silver_1783884126314.png",
    "fig4_silver.png": Path(brain) / "fig4_silver_1783884155983.png",
}

print("Defringing all 12 figurines using alpha matting...\n")

for out_name, src_path in sources.items():
    print(f"  Processing {out_name} ...", end=" ", flush=True)
    
    input_data = src_path.read_bytes()
    
    # Using alpha matting to calculate precise alpha transitions on boundaries
    # and erode_size to eat slightly into the white boundary to eliminate halos.
    output_data = remove(
        input_data,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=15
    )
    
    # Write to temp first to avoid OneDrive lock
    tmp_out = tmpdir / out_name
    tmp_out.write_bytes(output_data)
    
    img = Image.open(tmp_out)
    print(f"OK {img.width}x{img.height} RGBA")
    
    # Write to public/
    (public / out_name).write_bytes(output_data)

print("\nDone! All 12 transparent PNGs are defringed and updated in /public/")
