import AddClientModal from '../components/AddClientModal';
import Clients from '../components/Clients';
import Projects from '../components/Projects';

export default function Home() {
	return (
		<>
			<AddClientModal />
			<Projects />
			<Clients />
		</>
	);
}
