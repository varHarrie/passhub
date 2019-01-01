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
    size: string
    background: string
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
    padding: {
      medium: string
      large: string
    }
    color: string
    focusColor: string
    background: string
    focusBackground: string
    border: string
    focusBorder: string
    borderRadius: string
  }
  icon: {}
}

export const theme: Theme = {
  window: {
    fontSize: '14px',
    fontFamily: 'consolas',
    background: '#fff',
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
    size: '1px',
    background: '#E0E0E0'
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
    background: '#fff'
  },
  editor: {
    background: '#fff'
  },
  input: {
    sizes: {
      medium: '32px',
      large: '36px'
    },
    padding: {
      medium: '6px',
      large: '8px'
    },
    color: '#999',
    focusColor: '#525A5B',
    background: '#fff',
    focusBackground: '#fff',
    border: '1px solid #E0E0E0',
    focusBorder: '1px solid #999',
    borderRadius: '3px'
  },
  icon: {}
}
