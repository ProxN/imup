import { createGlobalStyle, css } from 'styled-components';
import Media from './media';

export default createGlobalStyle`
    *,
    *::before,
    *::after{
        margin:0;
        padding:0;
        box-sizing:inherit;
    }
    
    html{
        box-sizing:border-box;
        height:100%;
        width:100%;
        font-size:10px;
    }
    
    #root,
    body{
        width:100%;
        min-height:100%;
    }

    body{
        font-weight:normal;
        ${({ theme }) => css`
          background-color: ${theme.colors.bg};
          line-height: ${theme.lineHeight};
          font-size: ${theme.fontSizeBase}px;
          color: ${theme.colors.textInverse.main};
          font-family: ${theme.fontFamily};
        `};
    }

    a{
        text-decoration:none;
    }

    h1,h2,h3,h4,h5,h6{
        font-weight:normal;
        margin:0;
    }

    section{
        padding:0px 50px;
        height:100vh;
        ${Media.thone}{
            padding:0 25px;
        }
    }

    
    ::-webkit-scrollbar {
        background:#2d2b4c;
        width:5px;
    }
    ::-webkit-scrollbar-thumb {
        background:#484567;
        border-radius:5px;
    }
    
`;
