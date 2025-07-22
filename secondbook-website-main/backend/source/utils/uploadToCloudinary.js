import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a local file path or remote URL to Cloudinary.
 * Returns secure URL.
 * @param {string} src - path or URL of image
 * @param {object} opts - extra cloudinary options
 * @returns {Promise<string>}
 */
export const uploadToCloudinary = async (src, opts = {}) => {
  const { secure_url } = await cloudinary.uploader.upload(src, {
    folder: opts.folder || 'book-market',
    ...opts,
  });
  return secure_url;
};
