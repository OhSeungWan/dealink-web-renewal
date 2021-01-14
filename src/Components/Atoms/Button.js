import styled, { css } from 'styled-components';

export const Button = styled.button`
  margin: 0 auto;
  color: white;
  font-size: 20px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  ${props => {
    if (props.primary) {
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        ${props => {
          if (props.common) {
            return css`
              width: 100%;
              max-width: 360px;
              padding: 10px;
              border: none;
            `;
          }
        }}
        border-radius: 5px;
      `;
    } else if (props.secondary) {
      return css`
        background-color: ${({ theme }) => theme.colors.secondary};
        color: black;
        font-weight: 400;
        border: none;
        padding: 5px;
        border-radius: 5px;
        margin: 10px;
        font-size: 14px;
        ${props => {
          if (props.common) {
            return css`
              width: 100%;
              max-width: 360px;
              padding: 10px;
            `;
          }
        }}
      `;
    } else if (props.tertiary) {
      return css`
        background-color: ${({ theme }) => theme.colors.tertiary};
        border-radius: 5px;
        ${props => {
          if (props.common) {
            return css`
              width: 100%;
              max-width: 360px;
              padding: 10px;
            `;
          }
        }}
      `;
    } else if (props.kakao) {
      return css`
        width: 100%;
        border: none;

        ${props => {
          if (props.common) {
            return css`
              width: 100vw;
              max-width: 360px;
              padding: 15px;
            `;
          }
        }}
      `;
    } else {
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 5px;
        ${props => {
          if (props.common) {
            return css`
              width: 100vw;
              max-width: 360px;
              padding: 15px;
            `;
          }
        }}
      `;
    }
  }};
`;
