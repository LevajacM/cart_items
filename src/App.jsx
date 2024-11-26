// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useGlobalContext } from './context/Context';

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className='loading-container'>
        <article className='loading'></article>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
