const colors = {
  gray0: '#fff',
  gray1: '#f6f6f6',
  gray2: '#e0e0e0',
  gray3: '#999',
  gray4: '#525A5B'
}

const common = {
  border: '1px solid',
  borderRadius: '3px',
  boxShadow: '0 2x 12px rgba(0, 0, 0, 0.1)'
}

export const lightTheme = {
  fontSize: '14px',
  fontFamily: 'consolas',
  background: colors.gray0,
  size: {
    small: '28px',
    medium: '32px',
    large: '36px'
  },
  button: {
    borderRadius: common.borderRadius,
    normal: {
      color: [colors.gray3, colors.gray4, colors.gray4],
      background: [colors.gray0, colors.gray0, colors.gray1],
      borderColor: [colors.gray2, colors.gray2, colors.gray2],
      border: common.border
    },
    solid: {
      color: [colors.gray3, colors.gray4, colors.gray4],
      background: [colors.gray1, colors.gray1, colors.gray2],
      borderColor: ['noon', 'noon', 'noon'],
      border: 'none'
    }
  },
  checkbox: {
    size: {
      small: '16px',
      medium: '18px',
      large: '20px'
    },
    background: [colors.gray2, colors.gray2, colors.gray3],
    borderRadius: common.borderRadius
  },
  divider: {
    background: [colors.gray2, colors.gray3, colors.gray3]
  },
  groupItem: {
    height: '42px',
    color: [colors.gray3, colors.gray3, colors.gray4],
    background: ['transparent', colors.gray2, colors.gray2],
    markHeight: '100%',
    markActiveWidth: '4px',
    markBackground: colors.gray3
  },
  input: {
    borderRadius: common.borderRadius,
    normal: {
      color: [colors.gray3, colors.gray3, colors.gray4],
      background: [colors.gray0, colors.gray0, colors.gray0],
      borderColor: [colors.gray2, colors.gray2, colors.gray3],
      border: common.border,
      placeholderColor: colors.gray2
    },
    solid: {
      color: [colors.gray3, colors.gray3, colors.gray4],
      background: [colors.gray1, colors.gray1, colors.gray2],
      borderColor: ['none', 'none', 'none'],
      border: 'none',
      placeholderColor: colors.gray2
    }
  },
  logo: {
    background: colors.gray3
  },
  menu: {
    background: colors.gray0,
    border: common.border,
    borderColor: colors.gray2,
    boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.1)'
  },
  message: {
    background: colors.gray0,
    boxShadow: common.boxShadow,
    borderRadius: common.borderRadius
  },
  modal: {
    width: '320px',
    background: colors.gray0,
    boxShadow: common.boxShadow,
    borderRadius: common.borderRadius,
    maskBackground: 'rgba(0, 0, 0, 0.1)'
  },
  sidebar: {
    width: '200px',
    background: colors.gray1,
    titleColor: colors.gray3
  },
  windowActions: {
    width: '42px',
    height: '26px',
    color: [colors.gray2, colors.gray3, colors.gray3],
    background: ['transparent', colors.gray1, colors.gray2]
  }
}

export type Theme = typeof lightTheme
