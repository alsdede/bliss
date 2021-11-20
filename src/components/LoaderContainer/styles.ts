import styled, { css } from 'styled-components'

export const ContainerLoader = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: ${theme.grid.container};
    margin-left: auto;
    margin-right: auto;

    padding-left: calc(${theme.grid.gutter} / 2);
    padding-right: calc(${theme.grid.gutter} / 2);
  `}
`
export const Loading = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.mainBg};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20rem;
    height: 40rem;
    min-width: 56rem;
    svg {
      height: 10rem;
      width: 10rem;
    }
  `}
`
