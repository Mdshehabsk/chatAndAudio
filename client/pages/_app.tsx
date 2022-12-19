import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  Layout  from '../components/layout/Layout'
import { store } from '../toolkit/store/store'
 // @ts-ignore:next-line
import { Provider } from 'react-redux'
import { QueryClient,  QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store} >
    <QueryClientProvider client={queryClient} >
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
}
