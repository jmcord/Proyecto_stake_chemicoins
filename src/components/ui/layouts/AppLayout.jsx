import PropTypes from 'prop-types'; // Importa PropTypes desde la biblioteca prop-types
import Header from '../../Header';
import Footer from '../../Footer';
import backgroundImage from '/bc.png'; // Importa la imagen de fondo

export default function AppLayout({ children }) {
  return (
    <>
      <Header />
      <main
        className='min-h-[85vh]'
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
