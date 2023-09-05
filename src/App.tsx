import { Link } from 'react-router-dom';
import Button from './components/ui/Button/Button';
import Input from './components/ui/Input/Input';

function App() {
	return (
		<>
			<Button appearance="small">Хеллоу</Button>
			<Button appearance="big">Хеллоу2</Button>
			<Input placeholder="Email" />
		</>
	);
}

export default App;
