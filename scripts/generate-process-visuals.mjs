import { chromium } from "playwright-core";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "assets", "process-videos");

const browserCandidates = [
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];

const executablePath = browserCandidates.find((candidate) => fsSync.existsSync(candidate));

if (!executablePath) {
  throw new Error("No local Chromium or Edge executable was found.");
}

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });

const scenes = [
  { key: "development", label: "Development Response" },
  { key: "machining", label: "Precision Machining" },
  { key: "quality", label: "Quality Inspection" },
  { key: "supply", label: "Mass Production Supply" },
];

await page.setContent(String.raw`
  <html>
    <body style="margin:0;background:#050403;overflow:hidden">
      <canvas id="stage" width="1280" height="720"></canvas>
      <script>
        const canvas = document.getElementById("stage");
        const ctx = canvas.getContext("2d");
        const W = canvas.width;
        const H = canvas.height;

        const colors = {
          bg: "#050403",
          panel: "#15100c",
          line: "rgba(255,250,244,0.42)",
          dim: "rgba(255,250,244,0.14)",
          text: "#fffaf4",
          orange: "#e9631a",
          soft: "#ffb174",
          metal: "#c8c7c4",
          darkMetal: "#62605d",
        };

        function ease(t) {
          return 1 - Math.pow(1 - t, 3);
        }

        function loop(t) {
          return (Math.sin(t * Math.PI * 2) + 1) / 2;
        }

        function clear(t, title, label) {
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, W, H);
          const grd = ctx.createRadialGradient(W * 0.5, H * 0.48, 120, W * 0.5, H * 0.48, 760);
          grd.addColorStop(0, "rgba(233,99,26,0.18)");
          grd.addColorStop(0.46, "rgba(20,14,10,0.5)");
          grd.addColorStop(1, "rgba(0,0,0,0.96)");
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, W, H);

          ctx.globalAlpha = 0.12;
          ctx.strokeStyle = "#fffaf4";
          ctx.lineWidth = 1;
          for (let x = -80 + (t * 80) % 80; x < W + 80; x += 80) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + 180, H);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;

          ctx.fillStyle = "rgba(255,250,244,0.44)";
          ctx.font = "700 16px Arial";
          ctx.letterSpacing = "2px";
          ctx.fillText(("SEOULIND / " + label).toUpperCase(), 54, 68);
        }

        function roundedRect(x, y, w, h, r) {
          ctx.beginPath();
          ctx.moveTo(x + r, y);
          ctx.arcTo(x + w, y, x + w, y + h, r);
          ctx.arcTo(x + w, y + h, x, y + h, r);
          ctx.arcTo(x, y + h, x, y, r);
          ctx.arcTo(x, y, x + w, y, r);
          ctx.closePath();
        }

        function metalPart(x, y, s, rot = 0) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          ctx.scale(s, s);
          const body = ctx.createLinearGradient(-220, -80, 220, 90);
          body.addColorStop(0, "#595855");
          body.addColorStop(0.24, "#eeeeea");
          body.addColorStop(0.48, "#9e9b96");
          body.addColorStop(0.75, "#f8f5ef");
          body.addColorStop(1, "#56524f");
          ctx.fillStyle = body;
          roundedRect(-260, -74, 520, 148, 54);
          ctx.fill();
          ctx.strokeStyle = "rgba(255,255,255,0.5)";
          ctx.lineWidth = 5;
          ctx.stroke();
          for (const cx of [-172, -62, 74, 184]) {
            ctx.beginPath();
            ctx.arc(cx, 0, 33, 0, Math.PI * 2);
            ctx.fillStyle = "#25211e";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(cx, 0, 16, 0, Math.PI * 2);
            ctx.fillStyle = "#efece7";
            ctx.fill();
          }
          ctx.restore();
        }

        function drawDevelopment(t) {
          clear(t, "Drawing Review / Prototype", "Development Response");
          const p = ease((t % 1));
          ctx.save();
          ctx.translate(W * 0.54, H * 0.55);
          ctx.rotate(-0.08 + Math.sin(t * Math.PI * 2) * 0.015);
          ctx.strokeStyle = "rgba(255,250,244,0.16)";
          ctx.lineWidth = 1;
          for (let x = -420; x <= 420; x += 42) {
            ctx.beginPath(); ctx.moveTo(x, -220); ctx.lineTo(x, 220); ctx.stroke();
          }
          for (let y = -210; y <= 210; y += 42) {
            ctx.beginPath(); ctx.moveTo(-430, y); ctx.lineTo(430, y); ctx.stroke();
          }
          ctx.strokeStyle = colors.orange;
          ctx.lineWidth = 4;
          ctx.setLineDash([18, 14]);
          ctx.lineDashOffset = -p * 90;
          roundedRect(-300, -130, 600, 260, 42);
          ctx.stroke();
          ctx.setLineDash([]);
          metalPart(0, 16, 0.72, -0.06);
          ctx.strokeStyle = "rgba(255,250,244,0.78)";
          ctx.lineWidth = 2;
          for (const [x1, y1, x2, y2] of [[-340,-158,-210,-158],[220,-158,340,-158],[-340,164,340,164]]) {
            ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
          }
          ctx.fillStyle = colors.soft;
          ctx.font = "800 20px Arial";
          ctx.fillText("REV. " + String(Math.floor(p * 24)).padStart(2, "0"), 214, -175);
          ctx.restore();
        }

        function drawMachining(t) {
          clear(t, "CNC Precision Machining", "Precision Machining");
          const p = loop(t * 1.2);
          ctx.save();
          ctx.translate(W * 0.53, H * 0.56);
          metalPart(0, 82, 0.86, -0.03);
          ctx.translate(0, -40 - p * 26);
          const tool = ctx.createLinearGradient(-30, -220, 30, 80);
          tool.addColorStop(0, "#3d3a36");
          tool.addColorStop(0.5, "#f6f2ea");
          tool.addColorStop(1, "#6c6760");
          ctx.fillStyle = tool;
          roundedRect(-44, -250, 88, 272, 22);
          ctx.fill();
          ctx.fillStyle = colors.orange;
          ctx.beginPath();
          ctx.moveTo(-38, 20); ctx.lineTo(38, 20); ctx.lineTo(0, 98); ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "rgba(233,99,26,0.9)";
          ctx.lineWidth = 3;
          for (let i = 0; i < 18; i++) {
            const a = i * 0.35 + t * 8;
            const len = 54 + (i % 5) * 8;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * 30, 96 + Math.sin(a) * 14);
            ctx.lineTo(Math.cos(a) * len, 108 + Math.sin(a) * len * 0.38);
            ctx.stroke();
          }
          ctx.restore();
        }

        function drawQuality(t) {
          clear(t, "Measurement / Quality Gate", "Quality Inspection");
          const sweep = 150 + (t % 1) * 760;
          ctx.save();
          ctx.translate(W * 0.54, H * 0.56);
          metalPart(0, 24, 0.84, 0.04);
          ctx.strokeStyle = "rgba(255,250,244,0.32)";
          ctx.lineWidth = 2;
          for (const [x, y] of [[-240,-120],[-80,-144],[90,-128],[245,-92]]) {
            ctx.beginPath();
            ctx.moveTo(x, y - 44);
            ctx.lineTo(x, y + 116);
            ctx.stroke();
            ctx.fillStyle = colors.orange;
            ctx.beginPath();
            ctx.arc(x, y, 7 + loop(t + x * 0.01) * 6, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          ctx.save();
          ctx.globalAlpha = 0.82;
          ctx.fillStyle = "rgba(233,99,26,0.18)";
          ctx.fillRect(sweep, 182, 26, 410);
          ctx.strokeStyle = colors.orange;
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(sweep, 172); ctx.lineTo(sweep, 604); ctx.stroke();
          ctx.restore();

          ctx.fillStyle = "rgba(255,250,244,0.72)";
          ctx.font = "800 24px Arial";
          ctx.fillText("LOT PASS  " + Math.round(96 + loop(t) * 3) + "%", 920, 574);
        }

        function drawSupply(t) {
          clear(t, "Production Flow / Stable Supply", "Mass Production Supply");
          const p = t % 1;
          ctx.save();
          ctx.translate(0, 0);
          ctx.strokeStyle = "rgba(255,250,244,0.2)";
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.moveTo(190, 446);
          ctx.bezierCurveTo(420, 258, 662, 620, 1058, 330);
          ctx.stroke();
          ctx.strokeStyle = colors.orange;
          ctx.lineWidth = 8;
          ctx.setLineDash([90, 36]);
          ctx.lineDashOffset = -p * 360;
          ctx.beginPath();
          ctx.moveTo(190, 446);
          ctx.bezierCurveTo(420, 258, 662, 620, 1058, 330);
          ctx.stroke();
          ctx.setLineDash([]);

          const nodes = [[190,446,"DEV"],[426,334,"CNC"],[664,506,"QC"],[880,412,"PACK"],[1058,330,"SHIP"]];
          for (let i = 0; i < nodes.length; i++) {
            const [x, y, label] = nodes[i];
            ctx.fillStyle = i <= Math.floor(p * nodes.length) ? colors.orange : "#2b2520";
            roundedRect(x - 72, y - 42, 144, 84, 18);
            ctx.fill();
            ctx.fillStyle = "#fffaf4";
            ctx.font = "900 20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(label, x, y + 8);
            ctx.textAlign = "left";
          }
          for (let i = 0; i < 10; i++) {
            const x = 250 + ((i * 86 + p * 280) % 740);
            const y = 594 + Math.sin(i + t * 6) * 8;
            ctx.fillStyle = "rgba(255,250,244,0.18)";
            roundedRect(x, y, 58, 34, 5);
            ctx.fill();
          }
          ctx.restore();
        }

        const drawers = {
          development: drawDevelopment,
          machining: drawMachining,
          quality: drawQuality,
          supply: drawSupply,
        };

        async function recordScene(key, label) {
          const stream = canvas.captureStream(30);
          const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
          const chunks = [];
          recorder.ondataavailable = (event) => {
            if (event.data.size) chunks.push(event.data);
          };
          let start = performance.now();
          recorder.start();
          await new Promise((resolve) => {
            function tick(now) {
              const seconds = (now - start) / 1000;
              drawers[key](seconds / 4, label);
              if (seconds < 4.2) {
                requestAnimationFrame(tick);
                return;
              }
              recorder.stop();
              recorder.onstop = resolve;
            }
            requestAnimationFrame(tick);
          });
          drawers[key](0.32, label);
          const poster = canvas.toDataURL("image/png");
          const blob = new Blob(chunks, { type: "video/webm" });
          const buffer = await blob.arrayBuffer();
          return {
            webm: Array.from(new Uint8Array(buffer)),
            poster,
          };
        }
      </script>
    </body>
  </html>
`);

for (const scene of scenes) {
  const result = await page.evaluate(({ key, label }) => recordScene(key, label), scene);
  const videoPath = path.join(outputDir, `${scene.key}.webm`);
  const posterPath = path.join(outputDir, `${scene.key}.png`);
  const posterBytes = Buffer.from(result.poster.replace(/^data:image\/png;base64,/, ""), "base64");

  await fs.writeFile(videoPath, Buffer.from(result.webm));
  await fs.writeFile(posterPath, posterBytes);
  console.log(`generated ${path.relative(root, videoPath)}`);
}

await browser.close();
