import Button from 'components/Button'
import styled, { css } from 'styled-components'

type ModalProps = {
  isOpen: boolean
}

const modalModifiers = {
  open: () => css`
    opacity: 1;
  `,

  close: () => css`
    opacity: 0;
    pointer-events: none;
  `
}
export const Modal = styled.div<ModalProps>`
  ${({ theme, isOpen }) => css`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${theme.layers.modal};
    transition: opacity ${theme.transition.default};
    ${isOpen && modalModifiers.open()}
    ${!isOpen && modalModifiers.close()}
  `}
`

export const Close = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-align: right;
  `}
`

export const Content = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    max-width: min(120rem, 100%);
    max-height: 80rem;
    background-color: white;
    border-radius: ${theme.border.radius};
    z-index: ${theme.layers.modal};
  `}
`

export const ModalRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
`
export const ModalColumn = styled.div`
  display: flex;
  flex-direction: column;
`
export const ModalTitle = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    line-height: ${theme.font.sizes.medium};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.black};
  `}
`
export const CustomButton = styled(Button)`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall}; ;
  `}
`

export const ValidateMessage = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    color: #00ff00;
  `}
`
