import { StrictMode } from 'react'


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import { About, Contact, Github, GithubInfoLoader, Home, User,  } from './components/index.js'
import Founder from './components/About/Founder.jsx'
// import { GithubInfoLoader } from './components/Github/GithubInfo.js'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: '',
//         element: <Home/>

//       },
//       {
//         path: 'about',
//         element: <About/>
//       },
//       {
//         path: 'contact',
//         element: <Contact/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route  path='about' element={<About/>}>
        <Route loader={GithubInfoLoader}  path='ceo' element={<Founder/>} />
      </Route>
      <Route path='contact/ceo' element={<Founder/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='user/:userId' element={<User/>}/>
      <Route 
      loader={GithubInfoLoader}
      path='github'
      element={<Github/>}
      />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
