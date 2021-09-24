import { ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Head from 'next/head';
// import Footer from '../footer/Footer';
import WithFadeInAnimation from '../WithFadeInAnimation';
import useWindowResize from '../../hooks/useWindowResize';
// import Navbar from '../navbar/Navbar';
import mainTheme from '../../styles/mainTheme';

/* Full height container with 44px for
for out-of-viewport footer */
const LayoutContainer = styled.div<{ innerHeight: number }>`
  background-color: ${(props) => props.theme.backgroundColor};
  min-height: ${(props) => `calc(${props.innerHeight}px + 0px)`};
  height: ${(props) => `calc(${props.innerHeight}px + 0px)`};
  max-height: ${(props) => `calc(${props.innerHeight}px + 0px)`};
  min-width: 100vw;
  width: 100vw;
  max-width: 100vw;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  flex: auto;
  overflow: scroll;
`;

export default function Layout({ children }: { children: ReactNode }) {
  const { height: innerHeight } = useWindowResize();
  return (
    <ThemeProvider theme={mainTheme}>
      <WithFadeInAnimation>
        <LayoutContainer innerHeight={innerHeight}>
          <Head>
            <title>XGLB Cloud</title>
            <meta
              name='description'
              content='Xaption Gelangensbestätigung in der Cloud'
            />
            {/* viewport-fit=cover lets webpage scale to use notch-space on iOS when in landscape orientation
                maximum-scale=1 avoids automatic zoom on iOS when inputs are focused and focused element's font-size is less then 16px */}
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          {/* <Navbar /> */}
          <Main>{children}</Main>
          {/* <Footer /> */}
        </LayoutContainer>
      </WithFadeInAnimation>
    </ThemeProvider>
  );
}

// https://nextjs.org/docs/basic-features/layouts
// https://github.com/vercel/next.js/tree/canary/examples/layout-component
