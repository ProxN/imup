import styled, { css } from 'styled-components';
import { Media } from '../styles';

export const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HomeContent = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
  `};
  border-radius: 1rem;
  min-width: 50rem;
  padding: 2rem;
  ${Media.thone} {
    min-width: 100%;
  }
  text-align: center;
`;

export const UploadBox = styled.div<{ hightLight?: boolean }>`
  ${({ theme, hightLight }) => css`
    border: 3px dashed ${theme.colors.primary.light};
    background: ${hightLight ? theme.colors.primary.dark : 'transparent'};
  `};
  height: 25rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

export const SvgContainer = styled.div`
  height: 12rem;
  color: ${({ theme }) => theme.colors.textInverse.secondary};
  pointer-events: none;
  svg {
    height: 100%;
    color: currentColor;
    opacity: 0.8;
  }

  ${Media.phone} {
    height: 10rem;
  }
`;

export const Label = styled.label`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes[4]}px;
    font-weight: ${theme.fontWeights[1]};
  `};
  opacity: 0.8;
  text-align: center;
  span {
    color: ${({ theme }) => theme.colors.secondary.main};
    opacity: 1;
  }
  pointer-events: none;
`;

export const SubText = styled(Label)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes[1]}px;
    span {
      border-bottom: 1px solid ${theme.colors.secondary.main};
      cursor: pointer;
    }
  `};
`;

export const UploadLoader = styled(HomeContent)`
  min-width: 35rem;
`;

export const UploadProgress = styled.div<{ progress?: number }>`
  ${({ theme }) => css`
    background: ${theme.colors.primary.dark};
  `};

  position: relative;
  margin-top: 1rem;
  height: 2rem;
  width: 100%;
  border-radius: 1rem;
  ::before {
    content: '';
    position: absolute;
    border-radius: 6px;
    height: 100%;
    width: ${({ progress }) => progress}%;
    left: 0;
    background: ${({ theme }) => theme.colors.secondary.main};
    transition: width 500ms ease-in-out;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ImagePreview = styled.img`
  height: 25rem;
  max-width: 100%;
  margin-top: 2rem;
  border-radius: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    border: 1px solid ${theme.colors.primary.light};
    color: ${theme.colors.textInverse.secondary};
  `};
  border-radius: 1rem;
`;

export const Input = styled.input`
  /* ${({ theme }) => css`
    background: ${theme.colors.primary.main};
    border: 1px solid ${theme.colors.primary.light};
    color: ${theme.colors.textInverse.secondary};
  `}; */
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textInverse.secondary};
  outline: none;
  padding: 1rem 1.5rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const CopyButton = styled.button`
  ${({ theme }) => css`
    background: ${theme.colors.secondary.main};
    color: ${theme.colors.textInverse.secondary};
    font-weight: ${theme.fontWeights[1]};
  `};
  border-radius: 1rem;
  border: none;
  width: 12rem;
  outline: none;
  cursor: pointer;
  ::hover {
    background: ${({ theme }) => theme.colors.secondary.light};
  }
`;

export const GoBack = styled(CopyButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary.main};
  width: 100%;
  margin-top: 2rem;
`;
