export const validateCouponType = value => {
  if (value === 1 || value === 2 || value === 3) {
    return true;
  }
};

// export const validateCouponDiscountRate = () => {
//   if (couponStatusId === 1) {
//     if (discountRate >= 1000 && discountRate <= 10000) return true;
//   }

//   if (couponStatusId === 2) {
//     if (discountRate >= 1 && discountRate <= 10) return true;
//   }

//   if (couponStatusId === 3) {
//     if (discountRate >= 10000 && discountRate <= 100000) return true;
//   }
// };
