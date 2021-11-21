import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Title = styled.h1`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.large};
    font-size: ${theme.font.sizes.large};
    line-height: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacings.large};
  `}
`
