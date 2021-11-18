import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    border-radius: ${theme.border.radius};
  `}
`

export const ImageBox = styled.a`
  max-height: 12rem;

  position: relative;
  max-width: 12rem;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-size: 80rem 14rem;
  animation: placeholderShimmer 1s linear infinite forwards;
  @keyframes placeholderShimmer {
    0% {
      background-position: -40rem 0;
    }
    100% {
      background-position: 40rem 0;
    }
  }
`
export const Image = styled.img`
  object-fit: 'cover';
  width: 12rem;
  height: 12rem;
`
export const Content = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    height: 100%;
    margin: ${theme.spacings.xsmall};
  `}
`

export const Info = styled.div`
  max-width: 100%fit-content;
  text-decoration: none;
`

export const Title = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    line-height: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.black};
  `}
`

export const Date = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    line-height: ${theme.font.sizes.xsmall};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacings.xsmall};
  `}
`
