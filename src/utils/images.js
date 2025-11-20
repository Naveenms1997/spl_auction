// Import all images in the folder as URLs
const imageModules = import.meta.glob('../assets/images/*', { eager: true, as: 'url' });

// Map filenames to URLs for easy lookup
export const imagesMap = Object.fromEntries(
  Object.entries(imageModules).map(([key, value]) => {
    const filename = key.split('/').pop();
    return [filename, value];
  })
);

// Helper function to get URL by filename
export const getImageUrl = (filename) => imagesMap[filename];
