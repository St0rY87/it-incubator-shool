import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import { RootStateOrAny } from 'store';
import {App} from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={{} as RootStateOrAny }>
    <App/>
  </Provider>
)
