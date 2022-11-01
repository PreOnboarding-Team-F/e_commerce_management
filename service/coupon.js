import {
  NotFoundException,
  BadRequestException,
} from '../util/exception/index.js';
import Coupon from '../model/coupon.js';
import CouponHistory from '../model/couponHistory.js';

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

/**
 * 유저에게 쿠폰을 발급해주는 코드입니다.
 */
const giveCouponTOuser = async (couponId, userId) => {
  /**
   * 없는 쿠폰이거나 쿠폰의 수량이 없으면 메시지를 반환합니다.
   */
  const getCouponInfo = await Coupon.getCouponInfo(couponId);
  const couponQuantity = getCouponInfo.dataValues['quantity'];

  if (!getCouponInfo || couponQuantity === 0) {
    throw new NotFoundException('유효하지 않은 쿠폰입니다.');
  }

  /**
   * 쿠폰을 가지고 있거나 사용한지 않은 쿠폰이면 메시지를 반환합니다.
   */
  const isExistCouponToUser = await CouponHistory.userCouponInfo(userId);
  const notUseCoupon = isExistCouponToUser.dataValues['useDate'];

  if (isExistCouponToUser && !notUseCoupon) {
    throw new NotFoundException('이미 쿠폰을 가지고있는 유저입니다.');
  }

  CouponHistory.giveCouponToUser(couponId, userId);
};

/**
 * 발급된 쿠폰 사용
 */
const useCoupon = async (couponId, userId) => {
  const getCoupon = await Coupon.getCouponInfo(couponId);
};

export default {
  createCoupon,
  giveCouponTOuser,
  useCoupon,
};
