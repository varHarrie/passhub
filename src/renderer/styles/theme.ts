export interface Theme {
  window: {
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
    background: string
    border: string
    borderRadius: string
  }
}

export const theme: Theme = {
  window: {
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
  input: {
    sizes: {
      medium: '32px',
      large: '36px'
    },
    padding: {
      medium: '6px',
      large: '8px'
    },
    color: 'inherit',
    background: '#fff',
    border: '1px solid #E0E0E0',
    borderRadius: '3px'
  }
}
