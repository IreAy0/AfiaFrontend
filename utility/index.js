export function getCloudImagePathFromUrl (url) {
  if(String(url).includes('res.cloudinary.com')) {
    const [, path] = String(url).split('image/upload');
    return path;
  }
  return url
}
