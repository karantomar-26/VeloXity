import './globals.css';
import { Routes , Route } from 'react-router-dom';
import SigninForm from './_auth/Forms/SigninForm';
import SignupForm from './_auth/Forms/SignupForm';
import  Home  from './_root/Pages/Home';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import { Toaster } from './components/ui/toaster';

function App() {

  return (
    <main className='flex h-screen'>
        <Routes>
          {/* Public routes */}
          <Route element= {<AuthLayout/>}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>


          {/* Private routes */}
          <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          </Route>
          
        </Routes>

        <Toaster />
    </main>
  )
}

export default App
