import pica from 'pica';

async function getFileBufferRemote(url) {
  const response = await fetch(url);
  return await response.arrayBuffer();
}

async function arrayBufferToBase64(buffer) {
  const blob = new Blob([buffer], { type: 'image/png' });
  const img = document.createElement('img');
  img.src = URL.createObjectURL(blob);

  await new Promise(resolve => {
    img.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = 20;
  resizedCanvas.height = (img.height / img.width) * 20;

  await pica().resize(canvas, resizedCanvas);

  const resizedBlob = await new Promise(resolve => resizedCanvas.toBlob(resolve, 'image/png'));

  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(resizedBlob);
  });
}

export async function getPlaceholderImage(filepath) {
  try {
    console.log("running ...")
    const originalBuffer = await getFileBufferRemote(filepath);
    const resizedBase64 = await arrayBufferToBase64(originalBuffer);
    return {
      src: filepath,
      placeholder: resizedBase64
    };
  } catch (err) {
    console.log(err);
    return {
      src: filepath,
      placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg=='
    };
  }
}
