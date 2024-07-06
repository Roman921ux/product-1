import styled from 'styled-components'

interface IFlexBlock {
  flexD?: boolean;
  justifyC?: boolean;
  gap?: string;
  padd?: string;
  alignI?: string
}

export const Block = styled.div<IFlexBlock>`
    display: flex;
    gap: ${props => props.gap};
    flex-direction: ${props => props.flexD ? 'column' : ''};
    justify-content: ${props => props.justifyC ? 'space-between' : ''};
    padding: ${props => props.padd};
    align-items: ${props => props.alignI}
  `
