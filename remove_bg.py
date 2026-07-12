import os, sys
from pathlib import Path
from rembg import remove
from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")

brain  = r"C:\Users\Soumik\.gemini\antigravity\brain\e4b08671-2b4e-449a-9e6c-d39307cd3f23"
public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

sources = {
    "fig1_gold.png":   Path(brain) / "fig1_gold_1783884049326.png",
    "fig1_silver.png": Path(brain) / "fig1_silver_1783884065066.png",
    "fig2_gold.png":   Path(brain) / "fig2_gold_1783884080030.png",
    "fig2_silver.png": Path(brain) / "fig2_silver_1783884096347.png",
    "fig3_gold.png":   Path(brain) / "fig3_gold_1783884111204.png",
    "fig3_silver.png": Path(brain) / "fig3_silver_1783884126314.png",
    "fig4_gold.png":   Path(brain) / "fig4_gold_1783884141338.png",
    "fig4_silver.png": Path(brain) / "fig4_silver_1783884155983.png",
}

print("rembg - removing backgrounds from premium variants\n")

for out_name, src_path in sources.items():
    print(f"  {out_name} ...", end=" ", flush=True)
    output_data = remove(src_path.read_bytes())
    tmp_out = tmpdir / out_name
    tmp_out.write_bytes(output_data)
    img = Image.open(tmp_out)
    print(f"OK  {img.width}x{img.height} RGBA")
    (public / out_name).write_bytes(output_data)

print("\nDone! All premium PNGs transparent.")
