// import multer from 'multer';


// const storage = multer.diskStorage({
//     destination: "frontend/public/uplodedImages",
//     filename: (req, file, callback) => {
//         const filename = file.originalname;
//         callback(null, filename);
//     }
// });


// export const uploadImages = multer({ storage: storage }).single('imgUrl');

import multer from "multer";

const storage = multer.diskStorage({
  destination: "../frontend/public/uplodedImages",
  filename: (req, file, callback) => {
    const filename = file.originalname;
    callback(null, filename);
  },
});

const profile = multer({
  storage: storage,
  limits: { files: 12 },
});

export const upload = profile.array("images", 12);