import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { TPFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<TPFileRouter>();
export const UploadDropzone = generateUploadDropzone<TPFileRouter>();
