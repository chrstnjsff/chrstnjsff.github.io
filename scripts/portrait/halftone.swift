// Subject-lift + halftone portrait, mirroring a dithered dot-screen cutout.
// usage: swift halftone.swift <in.jpg> <out.png> <dotWidth> <angleDeg> <contrast> <brightness>
import Foundation
import CoreImage
import Vision
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else { fatalError("usage: halftone.swift in out [dotWidth] [angleDeg] [contrast] [brightness]") }
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let dotWidth = args.count > 3 ? Double(args[3])! : 9.0
let angle = (args.count > 4 ? Double(args[4])! : 0.0) * .pi / 180
let contrast = args.count > 5 ? Double(args[5])! : 1.05
let brightness = args.count > 6 ? Double(args[6])! : 0.0
let gamma = args.count > 7 ? Double(args[7])! : 1.0
let targetSize = args.count > 8 ? Double(args[8])! : 1152.0

guard var input = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else {
  fatalError("cannot load \(inURL.path)")
}
input = input.transformed(by: CGAffineTransform(translationX: -input.extent.origin.x, y: -input.extent.origin.y))
let ctx = CIContext()

// ---- 1. subject mask via Vision ------------------------------------------
let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: input)
try handler.perform([request])
guard let obs = request.results?.first else { fatalError("no subject found") }
let maskPB = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
var mask = CIImage(cvPixelBuffer: maskPB)
// scale mask to match input extent exactly
let sx = input.extent.width / mask.extent.width
let sy = input.extent.height / mask.extent.height
mask = mask.transformed(by: CGAffineTransform(scaleX: sx, y: sy))

// ---- 2. subject bounding box (scan a small render of the mask) ----------
let probeW = 256
let probeH = 256
var probe = [UInt8](repeating: 0, count: probeW * probeH)
let smallMask = mask.transformed(by: CGAffineTransform(
  scaleX: CGFloat(probeW) / mask.extent.width,
  y: CGFloat(probeH) / mask.extent.height))
ctx.render(smallMask, toBitmap: &probe, rowBytes: probeW,
           bounds: CGRect(x: 0, y: 0, width: probeW, height: probeH),
           format: .R8, colorSpace: nil)
var minX = probeW, maxX = 0, minY = probeH, maxY = 0
for y in 0..<probeH {
  for x in 0..<probeW where probe[y * probeW + x] > 64 {
    minX = min(minX, x); maxX = max(maxX, x)
    minY = min(minY, y); maxY = max(maxY, y)
  }
}
guard minX < maxX else { fatalError("empty mask") }
let fx = mask.extent.width / CGFloat(probeW)
let fy = mask.extent.height / CGFloat(probeH)
// pad sides/top a touch; clamp to image
var bbox = CGRect(x: CGFloat(minX) * fx, y: CGFloat(minY) * fy,
                  width: CGFloat(maxX - minX + 1) * fx, height: CGFloat(maxY - minY + 1) * fy)
bbox = bbox.insetBy(dx: -bbox.width * 0.04, dy: 0)
bbox.size.height += bbox.height * 0.05
bbox = bbox.intersection(input.extent)

// ---- 3. grayscale over white, tone tweaks --------------------------------
let white = CIImage(color: CIColor.white).cropped(to: input.extent)
let overWhite = input.composited(over: white)
let mono = overWhite
  .applyingFilter("CIColorControls", parameters: [
    kCIInputSaturationKey: 0,
    kCIInputContrastKey: contrast,
    kCIInputBrightnessKey: brightness,
  ])
  .applyingFilter("CIHighlightShadowAdjust", parameters: [
    "inputHighlightAmount": 1.0,
    "inputShadowAmount": 0.35,
  ])
  .applyingFilter("CIColorClamp", parameters: [
    "inputMinComponents": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputMaxComponents": CIVector(x: 1, y: 1, z: 1, w: 1),
  ])
  .applyingFilter("CIGammaAdjust", parameters: ["inputPower": gamma])

// ---- 4. dot-screen halftone ----------------------------------------------
let half = mono.applyingFilter("CIDotScreen", parameters: [
  kCIInputCenterKey: CIVector(x: input.extent.midX, y: input.extent.midY),
  kCIInputAngleKey: angle,
  kCIInputWidthKey: dotWidth,
  kCIInputSharpnessKey: 0.7,
]).cropped(to: input.extent)

if ProcessInfo.processInfo.environment["HT_DEBUG"] != nil {
  try ctx.writePNGRepresentation(of: mono.cropped(to: input.extent), to: URL(fileURLWithPath: outURL.path + ".mono.png"), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
  try ctx.writePNGRepresentation(of: half, to: URL(fileURLWithPath: outURL.path + ".half.png"), format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
}

// ---- 5. keep dots only inside the subject, as black-on-transparent -------
let inverted = half.applyingFilter("CIColorInvert")           // white dots on black
let inside = inverted.applyingFilter("CIMultiplyCompositing", // zero outside subject
                                     parameters: [kCIInputBackgroundImageKey: mask])
let alpha = inside.applyingFilter("CIMaskToAlpha")            // alpha = dot coverage
let blackDots = alpha.applyingFilter("CIColorMatrix", parameters: [
  "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
  "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
  "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
  "inputAVector": CIVector(x: 0, y: 0, z: 0, w: 1),
])

// ---- 6. crop to subject, compose on square canvas, bottom-anchored -------
let cropped = blackDots.cropped(to: bbox)
  .transformed(by: CGAffineTransform(translationX: -bbox.origin.x, y: -bbox.origin.y))
let side = max(bbox.width, bbox.height)
let dx = (side - bbox.width) / 2
let canvas = CIImage(color: CIColor.clear).cropped(to: CGRect(x: 0, y: 0, width: side, height: side))
let placed = cropped
  .transformed(by: CGAffineTransform(translationX: dx, y: 0))
  .composited(over: canvas)

// ---- 7. scale to 1152px and write ----------------------------------------
let target: CGFloat = CGFloat(targetSize)
let scale = target / side
let final = placed.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
  .cropped(to: CGRect(x: 0, y: 0, width: target, height: target))

try ctx.writePNGRepresentation(
  of: final, to: outURL, format: .LA8,
  colorSpace: CGColorSpace(name: CGColorSpace.linearGray)!)
print("wrote \(outURL.path) bbox=\(Int(bbox.width))x\(Int(bbox.height)) dot=\(dotWidth) angle=\(args.count > 4 ? args[4] : "0")")
