export const PORT = process.env.PORT || 5000;
export const JWT = {
  SECRET: process.env.JWT_SECRET || "test123",
  EXPIRES_IN: process.env.JWT_EXPIRE_IN || "1h",
};
export const RESERVATION_EXPIRY_DAY =
  Number(process.env.RESERVATION_EXPIRY_DAY) || 1;
