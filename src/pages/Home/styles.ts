import styled, { css } from 'styled-components'
import { darken } from 'polished'
import media from 'styled-media-query'
import Button from 'components/Button'
export const Wrapper = styled.main``

export const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    justify-content: space-between;
    margin-top: ${theme.spacings.xlarge};
    ${media.lessThan('small')`
    flex-direction:column;
    align-items:flex-start;
    `}
  `}
`
export const Right = styled.div`
  display: flex;
`
export const Left = styled.div`
  display: flex;
`

export const ShowMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
`

export const ShowMoreButton = styled.button`
  ${({ theme }) => css`
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    color: ${theme.colors.white};
    background-color: transparent;
    border: none;
    padding: ${theme.spacings.xsmall};
    transition: color ${theme.transition.default};

    > svg {
      transition: color ${theme.transition.default};
      color: ${theme.colors.primary};
    }

    &:hover {
      color: ${darken(0.3, theme.colors.white)};

      > svg {
        color: ${darken(0.2, theme.colors.primary)};
      }
    }
  `}
`
export const ShowMoreLoading = styled.img`
  width: 4rem;
`

export const ModalRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: flex-start;
    margin-bottom: 2rem;
  `}
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
