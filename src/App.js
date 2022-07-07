import './styles/reset.css';
import './styles/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './containers/SignUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  );
}
