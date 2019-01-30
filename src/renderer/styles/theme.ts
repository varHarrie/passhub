export interface Theme {
  window: {
    fontSize: string
    fontFamily: string
    background: string
    border: string
    shadow: string
    actionWidth: string
    actionHeight: string
    actionColor: string
    actionHoverColor: string
    actionActiveColor: string
    actionBackground: string
    actionHoverBackground: string
    actionActiveBackground: string
  }
  login: {
    logoBackground: string
  }
  divider: {
    background: string
    hoverBackground: string
  }
  sidebar: {
    width: string
    background: string
    logoBackground: string
    titleColor: string
    itemHeight: string
    itemBackground: string
    itemHoverBackground: string
    itemMarkHeight: string
    itemMarkActiveWidth: string
    itemMarkBackground: string
    itemTitleColor: string
    itemTitleActiveColor: string
  }
  list: {
    width: string
    background: string
  }
  editor: {
    background: string
  }
  input: {
    sizes: {
      medium: string
      large: string
    }
    color: string
    focusColor: string
    background: string
    focusBackground: string
    border: string
    focusBorder: string
    placeholderColor: string
    solidColor: string
    solidFocusColor: string
    solidBackground: string
    solidFocusBackground: string
    solidBorder: string
    solidFocusBorder: string
    solidPlaceholderColor: string
    borderRadius: string
  }
  button: {
    sizes: {
      medium: string
      large: string
    }
    color: string
    hoverColor: string
    activeColor: string
    background: string
    hoverBackground: string
    activeBackground: string
    border: string
    hoverBorder: string
    activeBorder: string
    solidColor: string
    solidHoverColor: string
    solidActiveColor: string
    solidBackground: string
    solidHoverBackground: string
    solidActiveBackground: string
    solidBorder: string
    solidHoverBorder: string
    solidActiveBorder: string
    borderRadius: string
  }
  icon: {
    sizes: {
      small: string
      medium: string
      large: string
    }
  }
}

export const theme: Theme = {
  window: {
    fontSize: '14px',
    fontFamily: 'consolas',
    background: '#FFF',
    border: '1px solid #e0e0e0',
    shadow: '0 2x 12px rgba(0, 0, 0, 0.1)',
    actionWidth: '42px',
    actionHeight: '26px',
    actionColor: '#E0E0E0',
    actionHoverColor: '#999',
    actionActiveColor: '#999',
    actionBackground: 'transparent',
    actionHoverBackground: '#f6f6f6',
    actionActiveBackground: '#e0e0e0'
  },
  login: {
    logoBackground: '#999'
  },
  divider: {
    background: '#E0E0E0',
    hoverBackground: '#999'
  },
  sidebar: {
    width: '200px',
    background: '#F6F6F6',
    logoBackground: '#999',
    titleColor: '#999',
    itemHeight: '42px',
    itemBackground: 'transparent',
    itemHoverBackground: '#E0E0E0',
    itemMarkHeight: '100%',
    itemMarkActiveWidth: '4px',
    itemMarkBackground: '#999',
    itemTitleColor: '#999',
    itemTitleActiveColor: '#525A5B'
  },
  list: {
    width: '250px',
    background: '#FFF'
  },
  editor: {
    background: '#FFF'
  },
  input: {
    sizes: {
      medium: '32px',
      large: '36px'
    },
    color: '#999',
    focusColor: '#525A5B',
    background: '#FFF',
    focusBackground: '#FFF',
    border: '1px solid #E0E0E0',
    focusBorder: '1px solid #999',
    placeholderColor: '#E0E0E0',
    solidColor: '#999',
    solidFocusColor: '#525A5B',
    solidBackground: '#F6F6F6',
    solidFocusBackground: '#E0E0E0',
    solidBorder: 'none',
    solidFocusBorder: 'none',
    solidPlaceholderColor: '#E0E0E0',
    borderRadius: '3px'
  },
  button: {
    sizes: {
      medium: '32px',
      large: '36px'
    },
    color: '#999',
    hoverColor: '#525A5B',
    activeColor: '#525A5B',
    background: '#FFF',
    hoverBackground: '#FFF',
    activeBackground: '#F6F6F6',
    border: '1px solid #E0E0E0',
    hoverBorder: '1px solid #E0E0E0',
    activeBorder: '1px solid #E0E0E0',
    solidColor: '#999',
    solidHoverColor: '#525A5B',
    solidActiveColor: '#525A5B',
    solidBackground: '#F6F6F6',
    solidHoverBackground: '#F6F6F6',
    solidActiveBackground: '#E0E0E0',
    solidBorder: 'none',
    solidHoverBorder: 'none',
    solidActiveBorder: 'none',
    borderRadius: '3px'
  },
  icon: {
    sizes: {
      small: '16px',
      medium: '28px',
      large: '32px'
    }
  }
}
