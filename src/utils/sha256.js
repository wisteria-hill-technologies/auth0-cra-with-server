import crypto from 'crypto';
const sha256 = (buffer) => {
  return crypto.createHash('sha256').update(buffer).digest();
};

export default sha256;