import { uploadImageCloudinary } from "../services/uploadImageService";

export const changeImageType = async (data) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = data.content;

  const imgElements = tempDiv.querySelectorAll("img");
  const uploadedURLs = new Set();

  for (let img of imgElements) {
    const src = img.getAttribute("src");

    if (src.startsWith('data:image')) {
      if (uploadedURLs.has(src)) {
        img.setAttribute("src", uploadedURLs.get(src));
        continue;
      }

      try {
        const res = await uploadImageCloudinary(src);
        img.setAttribute("src", res.url);
        uploadedURLs.add(src, res.url);
      } catch (error) {
        console.error('Upload thất bại:', error);
        img.remove();
      }
    }
  }

  const cleanHTML = tempDiv.innerHTML;

  return cleanHTML;
}