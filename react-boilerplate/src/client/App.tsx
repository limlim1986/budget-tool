import './styles.css';
import IMAGE from './react.jpg';
import ClickCounter from './components/ClickCounter';

export default function App() {
  return (
    <>
      <h1>
        React Boilerplate
        {JSON.stringify(process.env.NODE_ENV)} - {process.env.name}
      </h1>
      <img src={IMAGE} alt="React Logo" width={300} height={200} />
      <ClickCounter />
    </>
  );
}
