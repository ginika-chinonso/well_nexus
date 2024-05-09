// styles
import GlobalStyles from '@styles/global';
import 'react-grid-layout/css/styles.css';
import './fonts/icomoon/style.css';
import 'swiper/css';
import 'swiper/css/effect-fade';

// components
import AppLayout from './AppLayout';
import {SnackbarProvider} from 'notistack';

// utils
import {ThemeProvider, StyleSheetManager} from 'styled-components';
import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
import {preventDefault} from '@utils/helpers';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

// contexts
import {SidebarContextAPI} from '@contexts/sidebarContext';

// hooks
import {useEffect} from 'react';
import {useInterfaceContext} from '@contexts/interfaceContext';
import {useDispatch} from 'react-redux';

// actions
import {saveToLocalStorage} from '@store/features/layout';

import '@rainbow-me/rainbowkit/styles.css';
import {
  // getDefaultWallets,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig, http, WagmiProvider} from 'wagmi';

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  baseSepolia,
  zora,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { injected } from 'wagmi/connectors'

// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';




// const { chains, publicClient } = configureChains(
//   [mainnet, polygon, optimism, arbitrum, base, zora, baseSepolia],
//   [
//     alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
//     publicProvider()
//   ]
// );



// const config = getDefaultConfig({
//   appName: 'My RainbowKit App',
//   projectId: 'YOUR_PROJECT_ID',
//   chains: [mainnet, baseSepolia],
//   transports: {
//     [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/oDFA6iwybGc1efkLGghYfZh1PNn2B3pB'),
//   },
// });

const wagmiConfig = createConfig({
  chains: [mainnet, base, baseSepolia],
  connectors: [injected()], 
  transports: {
    [baseSepolia.id]: http('https://base-sepolia.g.alchemy.com/v2/oDFA6iwybGc1efkLGghYfZh1PNn2B3pB'),
  },
  autoConnect: true,
})

const queryClient = new QueryClient();

const App = () => {
    const page = document.documentElement;
    const {isDarkMode, direction} = useInterfaceContext();
    const theme = createTheme({
        direction: direction,
    });
    const cacheRtl = createCache({
        key: 'css-rtl',
        stylisPlugins: [rtlPlugin],
    });

    useDispatch()(saveToLocalStorage());

    useEffect(() => {
        page.setAttribute('dir', direction);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction]);

    return (
      <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >

        <CacheProvider value={cacheRtl}>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={{theme: isDarkMode ? 'dark' : 'light'}}>
                    <SnackbarProvider maxSnack={3}
                                      anchorOrigin={{
                                          vertical: 'top',
                                          horizontal: direction === 'ltr' ? 'right' : 'left',
                                      }}
                                      autoHideDuration={3000}
                    >
                        <SidebarContextAPI>
                            <GlobalStyles/>
                            <StyleSheetManager stylisPlugins={direction === 'rtl' ? [rtlPlugin] : []}>
                                <AppLayout/>
                            </StyleSheetManager>
                        </SidebarContextAPI>
                    </SnackbarProvider>
                </ThemeProvider>
            </MuiThemeProvider>
        </CacheProvider>

        </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
    );
}

export default App;
