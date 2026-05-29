import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import ffmpeg from "@ffmpeg-installer/ffmpeg";

const root = process.cwd();
const tempRoot = path.join(root, ".tmp", "product-alpha");
const outputRoot = path.join(root, "assets", "product-alpha");

const videos = [
  ["driveline1.mp4", "driveline1.webm"],
  ["driveline2.mp4", "driveline2.webm"],
  ["driveline3.mp4", "driveline3.webm"],
  ["electric vehicle1.mp4", "electric-vehicle1.webm"],
  ["electric vehicle2.mp4", "electric-vehicle2.webm"],
  ["housing1.mp4", "housing1.webm"],
  ["housing2.mp4", "housing2.webm"],
  ["housing3.mp4", "housing3.webm"],
  ["housing4.mp4", "housing4.webm"],
  ["housing5.mp4", "housing5.webm"],
  ["steering1.mp4", "steering1.webm"],
  ["steering2.mp4", "steering2.webm"],
];

function run(args, label) {
  const result = spawnSync(ffmpeg.path, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status}`);
  }
}

function isBackgroundCandidate(red, green, blue) {
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const luma = red * 0.2126 + green * 0.7152 + blue * 0.0722;
  const saturation = max - min;

  return max < 38 || (luma < 48 && saturation < 22);
}

function markConnectedBackground(png) {
  const { width, height, data } = png;
  const visited = new Uint8Array(width * height);
  const stack = [];

  const pushIfBackground = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;

    const index = y * width + x;
    if (visited[index]) return;

    const pixel = index * 4;
    if (!isBackgroundCandidate(data[pixel], data[pixel + 1], data[pixel + 2])) return;

    visited[index] = 1;
    stack.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  while (stack.length) {
    const index = stack.pop();
    const x = index % width;
    const y = Math.floor(index / width);

    pushIfBackground(x + 1, y);
    pushIfBackground(x - 1, y);
    pushIfBackground(x, y + 1);
    pushIfBackground(x, y - 1);
  }

  return visited;
}

function featherAlpha(alpha, width, height) {
  const smoothed = new Uint8Array(alpha);

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x;
      if (alpha[index] !== 255) continue;

      let transparentNeighbors = 0;
      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          if (offsetX === 0 && offsetY === 0) continue;
          if (alpha[(y + offsetY) * width + x + offsetX] === 0) transparentNeighbors += 1;
        }
      }

      if (transparentNeighbors >= 5) smoothed[index] = 196;
      else if (transparentNeighbors >= 3) smoothed[index] = 224;
    }
  }

  return smoothed;
}

function processFrame(inputPath, outputPath) {
  const png = PNG.sync.read(readFileSync(inputPath));
  const { width, height, data } = png;
  const connectedBackground = markConnectedBackground(png);
  const alpha = new Uint8Array(width * height);

  for (let index = 0; index < alpha.length; index += 1) {
    alpha[index] = connectedBackground[index] ? 0 : 255;
  }

  const smoothed = featherAlpha(alpha, width, height);

  for (let index = 0; index < smoothed.length; index += 1) {
    data[index * 4 + 3] = smoothed[index];
  }

  writeFileSync(outputPath, PNG.sync.write(png));
}

function buildVideo(inputName, outputName) {
  const inputPath = path.join(root, inputName);
  if (!existsSync(inputPath)) throw new Error(`Missing input video: ${inputName}`);

  const baseName = path.parse(outputName).name;
  const rawDir = path.join(tempRoot, baseName, "raw");
  const keyedDir = path.join(tempRoot, baseName, "keyed");

  rmSync(path.join(tempRoot, baseName), { recursive: true, force: true });
  mkdirSync(rawDir, { recursive: true });
  mkdirSync(keyedDir, { recursive: true });
  mkdirSync(outputRoot, { recursive: true });

  console.log(`extract: ${inputName}`);
  run(
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      inputName,
      "-vf",
      "scale=1280:-2:flags=lanczos,fps=24,format=rgba",
      path.join(rawDir, "frame_%04d.png"),
    ],
    `extract ${inputName}`,
  );

  const frames = readdirSync(rawDir).filter((file) => file.endsWith(".png")).sort();
  frames.forEach((frame) => {
    processFrame(path.join(rawDir, frame), path.join(keyedDir, frame));
  });

  console.log(`encode: ${outputName}`);
  run(
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-framerate",
      "24",
      "-i",
      path.join(keyedDir, "frame_%04d.png"),
      "-c:v",
      "libvpx-vp9",
      "-deadline",
      "good",
      "-cpu-used",
      "4",
      "-b:v",
      "0",
      "-crf",
      "32",
      "-pix_fmt",
      "yuva420p",
      "-auto-alt-ref",
      "0",
      "-metadata:s:v:0",
      "alpha_mode=1",
      "-an",
      path.join(outputRoot, outputName),
    ],
    `encode ${outputName}`,
  );
}

videos.forEach(([inputName, outputName]) => buildVideo(inputName, outputName));
