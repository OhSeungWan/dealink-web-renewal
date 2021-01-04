import styled, { css } from 'styled-components';

export const Button = styled.button`
  margin: 5px;
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
              max-width: 400px;
              padding: 15px;
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
        padding: 12px;
        font-size: 16px;
        ${props => {
          if (props.common) {
            return css`
              width: 100%;
              max-width: 400px;
              padding: 15px;
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
              max-width: 400px;
              padding: 15px;
            `;
          }
        }}
      `;
    } else if (props.kakao) {
      return css`
        background-color: ${({ theme }) => theme.Button.kakao.backgroundColor};
        border-radius: ${({ theme }) => theme.Button.kakao.borderRadius};
        border: ${({ theme }) => theme.Button.kakao.border};
        font-size: ${({ theme }) => theme.Button.kakao.fontSize};
        padding: ${({ theme }) => theme.paddings.lg};
        height: ${({ theme }) => theme.Button.kakao.height};
        margin-top: ${({ theme }) => theme.Button.kakao.marginTop};
        font-weight: ${({ theme }) => theme.Button.kakao.fontWeight};
        color: ${({ theme }) => theme.Button.kakao.color};
        width: 100vw;
        max-width: 400px;
        ${props => {
          if (props.common) {
            return css`
              width: 100vw;
              max-width: 400px;
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
              max-width: 400px;
              padding: 15px;
            `;
          }
        }}
      `;
    }
  }};
`;
