import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/mynavbar/style.mynavbar.css'
import '../components/footer/style.footer.css'
import {Provider} from "react-redux"
import {wrapper, store} from "../store";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(App)
