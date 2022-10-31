import {
  NotFoundException,
  BadRequestException,
} from '../util/exception/index.js';
import Coupon from '../model/coupon.js';

/**
 * 쿠폰 코드를 랜덤으로 생성해주기 위한 함수 입니다.
 */
const randomCode = num => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

/**
 * 쿠폰을 생성하는 코드입니다.
 */
const createCoupon = async (discountRate, quantity, couponStatusId) => {
  const code = randomCode(16);

  /**
   * 쿠폰 타입에 따라 할인율의 범위를 지정해서 초과하거나 미만이면 메시지를 보냅니다.
   */
  if (couponStatusId === 1) {
    if (discountRate < 1000 || discountRate > 10000)
      throw new BadRequestException('할인율이 맞지 않습니다.');
  }

  if (couponStatusId === 2) {
    if (discountRate < 1 || discountRate > 10)
      throw new BadRequestException('할인율이 맞지 않습니다.');
  }

  if (couponStatusId === 3) {
    if (discountRate < 10000 || discountRate > 100000)
      throw new BadRequestException('할인율 맞지 않습니다.');
  }

  /**
   * 특정 타입의 같은 할인율을 가진 쿠폰이 존재하는지 판단합니다.
   */
  const isExistCoupon = await Coupon.getCouponId(couponStatusId, discountRate);

  if (isExistCoupon) {
    throw new NotFoundException('이미 존재하는 쿠폰 입니다.');
  }

  Coupon.createCoupon(discountRate, code, quantity, couponStatusId);
};

export default {
  createCoupon,
};
