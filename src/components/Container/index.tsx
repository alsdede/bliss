import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;

    max-width: ${theme.grid.container};
    margin-left: auto;
    margin-right: auto;
    padding-top: 10rem;
    padding-left: calc(${theme.grid.gutter} / 2);
    padding-right: calc(${theme.grid.gutter} / 2);
  `}
`
