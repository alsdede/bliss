import styled, { css } from 'styled-components'
import { darken } from 'polished'
import media from 'styled-media-query'
import { Container } from 'components/Container'

export const WrapperContainer = styled(Container)`
  max-width: 100rem;
`
export const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacings.large};
    svg {
      color: ${theme.colors.white};
    }
  `}
`
export const Left = styled.div``
export const Right = styled.div``
export const BackButton = styled.button`
  border: 0;
  text-decoration: none;
  cursor: pointer;
  background: none;
  color: white;
`
export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
    padding: ${theme.spacings.xxsmall};
    ${media.greaterThan('medium')`

    `}
  `}
`
export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: ${theme.spacings.small};
  `}
`
export const Image = styled.img`
  object-fit: 'cover';
  width: 60rem;
  height: 40rem;
  ${media.lessThan('small')`
      width: 100%;
      height:100%;
    `}
`

export const Info = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    ${media.lessThan('medium')`

      margin-top:${theme.spacings.small};
    `}
  `}
`

export const InfoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`
export const InfoHeader = styled.div`
  ${({ theme }) => css`
    ${media.greaterThan('medium')`
    margin-left: ${theme.spacings.large};
    `}
  `}
`
export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.black};

    ${media.lessThan('medium')`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.bold};
    margin-bottom: ${theme.spacings.small};

    `}
  `}
`
export const Date = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.secondary};
  `}
`

export const Item = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `}
`
export const ItemLabel = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    margin-bottom: ${theme.spacings.xxsmall};
  `}
`
