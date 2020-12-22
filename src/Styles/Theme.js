const calcRem = size => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(22),
  xxxl: calcRem(24),
  titleSize: calcRem(50)
};

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18)
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18)
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200)
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`
};

const deviceSizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '450px',
  tablet: '768px',
  tabletL: '1024px'
};

const colors = {
  black: '#000000',
  white: '#FFFFFF',
  gray_1: '#222222',
  gray_2: '#767676',
  green_1: '#3cb46e',
  primary: '#816da3',
  secondary: '#6d79a3',
  tertiary: '#6da39e'
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`
};

const Button = {
  primary: {
    padding: '20px',
    margin: '10px',
    backgroundColor: 'red'
  },
  kakao: {
    backgroundColor: '#ffe500',
    border: '1px solid #ffe500',
    height: '45px',
    marginTop: '',
    borderRadius: '2px',
    fontSize: '14px',
    fontWeight: 'normal',
    color: '#000'
  }
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
  Button
};

export default theme;
