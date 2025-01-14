import sharp from 'sharp'
import getImageColors from 'get-image-colors';  // Import the package

function bufferToBase64(buffer) {
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function getFileBufferRemote(url) {
  const response = await fetch(url)
  return Buffer.from(await response.arrayBuffer())
}

export async function getPlaceholderImage(filepath, size = 20, quality = 50) {
  try {
    const originalBuffer = await getFileBufferRemote(filepath)
    const resizedBuffer = await sharp(originalBuffer)
      .resize(size)
      .jpeg({ quality })
      .toBuffer()
    return {
      src: filepath,
      placeholder: bufferToBase64(resizedBuffer)
    }
  } catch (err) {
    console.log(err)
    return {
      src: filepath,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
    }
  }
}
const isSupportedFileType = (url) => {
  if (typeof url !== 'string') return false; // Ensure the input is a string

  // Extract the part before query parameters
  const path = url.split('?')[0]; // Removes everything after the '?'

  // Supported extensions
  const supportedExtensions = ['.jpg', '.jpeg', '.png'];

  // Check if the path ends with any of the supported extensions
  return supportedExtensions.some((ext) => path.toLowerCase().endsWith(ext));
};

export const ExtractColors = async (imageUrl) => {
  let colors = [];
  try {
    // Validate file type using string manipulation
    if (!isSupportedFileType(imageUrl)) {
      console.warn(`Skipping unsupported file type for URL: ${imageUrl}`);
      return ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"]; // Return transparent color for unsupported files
    }

    // Proceed to extract colors if valid
    const colorsArray = await getImageColors(imageUrl);
    if (colorsArray && Array.isArray(colorsArray)) {
      colors = colorsArray.map((color) => color.hex());
    }
    console.log({ colors });
    return colors.length > 0 ? colors : ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"]; // Return fallback transparent color
  } catch (err) {
    console.error("Error fetching colors:", err.message || err);
    return ["#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00", "#FFFFFF00"]; // Return fallback color for errors
  }
};
