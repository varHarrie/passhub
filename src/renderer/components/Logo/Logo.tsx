import { styled } from '../../styles'

export type LogoSize = 'small' | 'large'

export interface Props {
  className?: string
  size?: LogoSize
}

export default function Logo (props: Props) {
  const { className, size = 'large' } = props

  const mainPath = `
    m16.002,46l-16,0l0,-28a17.883,17.883 0 0 1 5.272,-12.728a17.882,
    17.882 0 0 1 12.727,-5.272l6,0a17.882,17.882 0 0 1 12.728,5.272a17.883,
    17.883 0 0 1 5.272,12.728a17.883,17.883 0 0 1 -5.272,12.728a17.882,
    17.882 0 0 1 -12.728,5.272l-8,0l0,10l0.001,0zm4.999,-36a5.006,
    5.006 0 0 0 -5,5a4.965,4.965 0 0 0 1.987,3.991l-0.987,5.675a1.024,
    1.024 0 0 0 1.044,1l5.912,0a1.024,1.024 0 0 0 1.044,-1l-0.987,
    -5.676a4.963,4.963 0 0 0 1.987,-3.99a5.006,5.006 0 0 0 -4.999,-5l-0.001,0z
  `

  const shadowPath = `
    m10.001,36l6,0a0,0 0 0 1 0,0l0,10a6,6 0 0 1 -6,6l-4,0a6,6 0 0 1 -6,-6l0,
    0a10,10 0 0 1 10,-10z
  `

  return (
    <Wrapper className={className} size={size}>
      <svg xmlns='http://www.w3.org/2000/svg' width='42' height='52' viewBox='0 0 42 52'>
        <g>
          <path d={mainPath} fill='#fff' />
          <path d={shadowPath} fill='#e0e0e0' />
        </g>
      </svg>
    </Wrapper>
  )
}

const logoSizes = {
  small: '32px',
  large: '80px'
}

const Wrapper = styled.div<{ size: LogoSize }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => logoSizes[p.size]};
  height: ${(p) => logoSizes[p.size]};
  border-radius: 18.75%;
  background: #999;

  svg {
    width: 50%;
  }
`
