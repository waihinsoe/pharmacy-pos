import { imageDB } from "../firebase/config";
import { SelectedProduct } from "../types/productTypes";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
