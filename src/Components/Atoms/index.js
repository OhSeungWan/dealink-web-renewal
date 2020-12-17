import styled, { css } from 'styled-components';

export const Button = styled.button`
  ${props => {
    if (props.primary) {
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 5px;
      `;
    }
    if (props.secondary) {
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        border-radius: 5px;
      `;
    }
    if (props.tertiary) {
      return css`
        background-color: ${({ theme }) => theme.colors.tertiary};
        border-radius: 5px;
      `;
    }

    if (props.kakao) {
      return css`
        background-color: yellow;
        border-radius: 5px;
      `;
    }
  }}
`;

export const Text = styled.span``;

export const Input = styled.input``;

export const Container = styled.div``;

export const Border = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: solid 1px black;
`;
