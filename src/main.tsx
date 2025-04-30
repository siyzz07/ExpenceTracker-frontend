import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SpeechContext from './Context/SpeechContext.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <SpeechContext>  */}
    <Provider store={store}>
    <App />
    </Provider>
    {/* </SpeechContext> */}
  </StrictMode>,
)
