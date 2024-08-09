import { imageDB } from "../firebase/config";
import { Product } from "../types";
import { SelectedProduct } from "../types/productTypes";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const calculateTotalItems = (selectedProducts: SelectedProduct[]) => {
  return selectedProducts.reduce(
    (accumulator, currentProduct: SelectedProduct) => {
      return accumulator + currentProduct.count;
    },
    0
  );
};

export const calculateTotalAmount = (selectedProducts: SelectedProduct[]) => {
  return selectedProducts.reduce(
    (accumulator, currentProduct: SelectedProduct) => {
      return accumulator + currentProduct.price * currentProduct.count;
    },
    0
  );
};

export const ImageUpload = (file: any) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const storageRef = ref(imageDB, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(
        storageRef,
        file as unknown as Blob
      );

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    } else {
      reject("No file selected."); // Reject the promise if no file is selected
    }
  });
};

export const ImageDelete = (item: Product) => {
  const decodedUrl = decodeURIComponent(item.img_url);
  const pathRegex = /\/o\/(.+?)\?/;
  const match = decodedUrl.match(pathRegex);

  if (match) {
    const filePath = match[1];

    return new Promise((resolve, reject) => {
      if (filePath) {
        const storageRef = ref(imageDB, `${filePath}`);
        deleteObject(storageRef)
          .then(() => {
            console.log("file deleted successfully");
            resolve("file deleted successfully");
          })
          .catch((error) => {
            console.log("Error while deleting the file: ", error);
            reject("Error while deleting the file");
          });
      } else {
        reject("No file name provided.");
      }
    });
  } else {
    console.error("Failed to extract file path from URL");
  }
};
