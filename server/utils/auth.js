import bcrypt from "bcrypt";

// This is function is used for hashing the plain password
export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

// This function is used for comparing the plain password with hashed password
export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
