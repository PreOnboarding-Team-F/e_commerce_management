import {
  NotFoundException,
  BadRequestException,
} from '../util/exception/index.js';
import Coupon from '../model/coupon.js';
import CouponHistory from '../model/couponHistory.js';
import DeliveryCost from '../model/deliveryCost.js';
import Order from '../model/order.js';

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

  await Coupon.createCoupon(discountRate, code, quantity, couponStatusId);
};

/**
 * 유저에게 쿠폰을 발급해주는 코드입니다.
 */
const giveCouponToUser = async (couponId, userId) => {
  /**
   * 없는 쿠폰이거나 쿠폰의 수량이 없으면 메시지를 반환합니다.
   */
  const getCouponInfo = await Coupon.getCouponInfo(couponId);
  if (!getCouponInfo) {
    throw new NotFoundException('유효하지 않은 쿠폰입니다.');
  } else {
    const couponQuantity = getCouponInfo.dataValues['quantity'];
    if (couponQuantity === 0) {
      throw new NotFoundException('유효하지 않은 쿠폰입니다.');
    }
  }

  /**
   * 쿠폰을 가지고 있거나 사용한지 않은 쿠폰이면 메시지를 반환합니다.
   */
  const isExistCouponToUser = await CouponHistory.isExistCouponToUser(userId);

  if (isExistCouponToUser) {
    const notUseCoupon = isExistCouponToUser.dataValues['useDate'];
    if (!notUseCoupon) {
      throw new NotFoundException('이미 쿠폰을 가지고있는 유저입니다.');
    }
  }

  CouponHistory.giveCouponToUser(userId, couponId);
};

/**
 * 발급된 쿠폰 사용
 */
const useCoupon = async (
  couponId,
  userId,
  countryId,
  price,
  quantity,
  city,
  buyrZipx
) => {
  /**
   * 유저가 쿠폰을 가지고 있는지 확인합니다.
   */
  const isExistCouponToUser = await CouponHistory.userCouponInfo(
    userId,
    couponId
  );

  if (isExistCouponToUser) {
    /**
     * 유저가 가진 쿠폰이 사용 가능한지 확인합니다.
     */
    const notUseCoupon = isExistCouponToUser.dataValues['useDate'];
    if (!notUseCoupon) {
      /**
       * 유저가 쿠폰을 가지고 있는 쿠폰의 정보를 가지고 와서 쿠폰 타입과 할인율을 가져옵니다.
       */

      const getCouponInfo = await Coupon.getCouponInfo(couponId);
      const couponType = getCouponInfo.dataValues['couponStatusId'];
      const discountCost = getCouponInfo.dataValues['discountRate'];

      /**
       * 유저의 국가를 확인한 후 수량에 맞는 배송료를 가져옵니다.
       */
      const getCostToDelivery = await DeliveryCost.getCostToDelivery(
        countryId,
        quantity
      );
      const deliveryCost = getCostToDelivery.dataValues['price'];

      /**
       * 쿠폰 타입에 따라 알맞은 할인을 적용합니다.
       */
      let discountPrice, discountDeliveryCost, totalDiscount;
      if (couponType === 1) {
        discountDeliveryCost = deliveryCost - discountCost;
        discountPrice = price;
        totalDiscount = deliveryCost - discountDeliveryCost;
      }

      if (couponType === 2) {
        discountPrice = price * (1 - discountCost / 100);
        discountDeliveryCost = deliveryCost;
        totalDiscount = price - discountPrice;
      }

      if (couponType === 3) {
        discountPrice = price - discountCost;
        discountDeliveryCost = deliveryCost;
        totalDiscount = price - discountPrice;
      }

      /**
       * 국가가 대한민국이 아니면 환율 적용 후 소수점 반올림을 합니다.
       */

      if (countryId !== 191) {
        discountPrice = Math.round(discountPrice / 1200);
        discountDeliveryCost = Math.round(discountDeliveryCost / 1200);
      }

      /**
       * 쿠폰의 수량과 사용한 수량 및 총 할인금액을 업데이트 합니다.
       */
      const resultCouponQuantity = getCouponInfo.dataValues['quantity'] - 1;
      const resultCouponUseNum = getCouponInfo.dataValues['useNum'] + 1;
      const resultCouponDiscountPrice =
        getCouponInfo.dataValues['totalDiscountPrice'] + totalDiscount;

      Coupon.updateCouponQuantity(
        couponId,
        resultCouponQuantity,
        resultCouponUseNum,
        resultCouponDiscountPrice
      );

      /**
       * 유저가 사용한 쿠폰의 사용일을 업데이트 합니다.
       */
      const todayDate = new Date();
      let year = todayDate.getFullYear();
      let month = todayDate.getMonth() + 1;
      let date = todayDate.getDate();
      const today = year + '-' + month + '-' + date;
      const totalPrice = discountPrice + discountDeliveryCost;

      CouponHistory.useToday(userId, couponId, today);

      /**
       * 주문 내역을 생성합니다.
       */
      Order.createOrder(
        today,
        quantity,
        totalPrice,
        city,
        buyrZipx,
        countryId,
        userId
      );
    } else {
      throw new NotFoundException('이미 사용한 쿠폰입니다.');
    }
  } else {
    throw new NotFoundException('쿠폰이 존재하지 않습니다.');
  }
};

/**
 * 발급 쿠폰 내역 조회
 */
const getCouponHistory = async () => {
  return await CouponHistory.getCouponHistory();
};

/**
 * 쿠폰 타입별 사용 횟수와 총 할인액
 */
const couponTypeDiscount = async () => {
  return await Coupon.couponTypeDiscount();
};

export default {
  createCoupon,
  giveCouponToUser,
  useCoupon,
  getCouponHistory,
  couponTypeDiscount,
};
