import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage for book images
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "book-images", // Cloudinary folder specifically for book images
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [
      { width: 400, height: 600, crop: "fill" }, // Optimize for book cover dimensions
    ],
  },
});

// Export upload middleware for multiple book images
export const uploadBookImages = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});
