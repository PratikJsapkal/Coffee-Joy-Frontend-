// Universal image handler for ALL APIs & pages

export const normalizeImages = (images) => {
  if (!images) return [];

  // Case 1: Already array
  if (Array.isArray(images)) return images;

  // Case 2: JSON string array
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      // not JSON
    }
  }

  // Case 3: Single string URL
  if (typeof images === "string") return [images];

  // Case 4: Object with url
  if (typeof images === "object" && images.url) return [images.url];

  return [];
};

export const getValidImage = (img) => {
  if (!img) return "/images/placeholder.png";

  // String URL
  if (typeof img === "string") {
    if (
      img.startsWith("http://") ||
      img.startsWith("https://") ||
      img.startsWith("/")
    ) {
      return img;
    }
  }

  // Object format
  if (typeof img === "object" && img.url) {
    return img.url;
  }

  return "/images/placeholder.png";
};
