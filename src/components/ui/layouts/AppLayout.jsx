import Header from '../../Header'
import Footer from '../../Footer'
import PropTypes from 'prop-types'


export default function AppLayout({children}){
    return (
        <>
          <Header/>
          <main className='min-h-[85vh]'>{children}</main>
          <Footer />
        </>
      )
}