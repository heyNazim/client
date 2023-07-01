import React from 'react';
import {Helmet} from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import toast, { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keywords, author}) => {
  return (
    <>
   <div>
  <meta charSet="UTF-8" />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="author" content={author}/>
  <title>{title}</title>

</div>

    <Header/>
    <main style={{minHeight: "70vh"}}>
    <Toaster />

      {children}
    </main>
    <Footer/>
    </>
  )
}

export default Layout