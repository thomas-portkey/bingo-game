const decorateImgPaths = (imgPaths: Array<string>, extra?: Array<string>): Array<string> => {
  imgPaths.push(...(extra || []));
  return imgPaths;
};

const SharedImgs: Array<string> = decorateImgPaths([
  require('../../public/1.png').default.src,
  require('../../public/2.png').default.src,
  require('../../public/3.png').default.src,
  require('../../public/4.png').default.src,
  require('../../public/5.png').default.src,
  require('../../public/6.png').default.src,
  require('../../public/account.png').default.src,
  require('../../public/bingo.png').default.src,
  require('../../public/board_bg.png').default.src,
  require('../../public/btn_var1.png').default.src,
  require('../../public/btn_var2.png').default.src,
  require('../../public/circle_ray.png').default.src,
  require('../../public/clock.png').default.src,
  require('../../public/close.png').default.src,
  require('../../public/congratulations.svg').default.src,
  require('../../public/external_icon.png').default.src,
  require('../../public/lock.png').default.src,
  require('../../public/qrcode.png').default.src,
  require('../../public/question2.png').default.src,
  require('../../public/reload.png').default.src,
  require('../../public/sand_clock.png').default.src,
  require('../../public/truck.svg').default.src,
]);

const ImgSourceMap: { pc: Array<string>; mobile: Array<string> } = {
  pc: decorateImgPaths(
    [
      require('../../public/balance_pc.png').default.src,
      require('../../public/bg_pc.png').default.src,
      require('../../public/bingo_pc.png').default.src,
      require('../../public/bingo_white_pc.png').default.src,
      require('../../public/bitcoin.svg').default.src,
      require('../../public/btn_pc_var3.png').default.src,
      require('../../public/btn_pc_var4.png').default.src,
      require('../../public/copy.svg').default.src,
      require('../../public/frame_pc.png').default.src,
      require('../../public/frame_pc_1.png').default.src,
      require('../../public/frame_pc_2.png').default.src,
      require('../../public/frame_pc_bingo.png').default.src,
      require('../../public/frame_pc_cutdown.png').default.src,
      require('../../public/gradient_button_blue.svg').default.src,
      require('../../public/gradient_button_orange.svg').default.src,
      require('../../public/lose_pc.svg').default.src,
      require('../../public/menu_pc.png').default.src,
      require('../../public/numbers_pc.png').default.src,
      require('../../public/numbers_pc_win.png').default.src,
      require('../../public/question.png').default.src,
      require('../../public/rectangle_pc.png').default.src,
      require('../../public/settingBtn_1.png').default.src,
      require('../../public/settingBtn_2.png').default.src,
      require('../../public/settingBtn_3.png').default.src,
      require('../../public/warn.svg').default.src,
    ],
    SharedImgs,
  ),
  mobile: decorateImgPaths(
    [
      require('../../public/BG@3x.png').default.src,
      require('../../public/aelf_symbol.png').default.src,
      require('../../public/btn_var3.png').default.src,
      require('../../public/button_bg.png').default.src,
      require('../../public/copy_button.png').default.src,
      require('../../public/copy_button.png').default.src,
      require('../../public/frame.png').default.src,
      require('../../public/frame_no_icon.png').default.src,
      require('../../public/gradient_button_blue_mobile.svg').default.src,
      require('../../public/gradient_button_orange_mobile.svg').default.src,
      require('../../public/lose_mobile.svg').default.src,
      require('../../public/numbers_mobile.png').default.src,
      require('../../public/numbers_mobile_win.png').default.src,
    ],
    SharedImgs,
  ),
};

export default ImgSourceMap;
