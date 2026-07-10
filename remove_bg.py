import os, sys
from pathlib import Path
from rembg import remove
from PIL import Image

# Force UTF-8 output
sys.stdout.reconfigure(encoding="utf-8")

brain  = r"C:\Users\Soumik\.gemini\antigravity\brain\e4b08671-2b4e-449a-9e6c-d39307cd3f23"
public = Path(__file__).parent / "public"
tmpdir = Path(os.environ.get("TEMP", r"C:\Temp")) / "toonhub"
tmpdir.mkdir(parents=True, exist_ok=True)

sources = {
    "fig1.png": Path(brain) / "fig1_white_1783711985370.png",
    "fig2.png": Path(brain) / "fig2_white_1783712001124.png",
    "fig3.png": Path(brain) / "fig3_white_1783712015563.png",
    "fig4.png": Path(brain) / "fig4_white_1783712027710.png",
}

print("rembg - AI background removal\n")

for out_name, src_path in sources.items():
    print(f"  Processing {src_path.name} ...", end=" ", flush=True)

    input_data  = src_path.read_bytes()
    output_data = remove(input_data)

    # Write to temp first to avoid OneDrive lock
    tmp_out = tmpdir / out_name
    tmp_out.write_bytes(output_data)

    img = Image.open(tmp_out)
    print(f"OK  {img.width}x{img.height} RGBA")

    # Write into public/
    (public / out_name).write_bytes(output_data)

print("\nDone! Transparent PNGs written to /public/")
