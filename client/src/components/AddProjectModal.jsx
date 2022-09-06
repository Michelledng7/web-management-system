import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { ADD_PROJECT } from '../mutations/projectMutation';

export default function AddProjectModal() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('');
	const [clientId, setClientId] = useState('');

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, status, clientId },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [addProject, ...projects] },
			});
		},
	});

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(name, description);
		if (name === '' || description === '') {
			return alert('Please fill in all fields');
		}
		addProject(name, description, status, clientId);
		setName('');
		setDescription('');
		setStatus('');
		setClientId('');
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-secondary'
				data-bs-toggle='modal'
				data-bs-target='#addProjectModal'
			>
				<div className='d-flex align-items-center'>
					<FaUser className='icon' />
					<div>Add Project</div>
				</div>
			</button>

			<div
				className='modal fade'
				id='addProjectModal'
				aria-labelledby='addProjectModalLabel'
				aria-hidden='true'
			>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='addProjectModalLabel'>
								Add a Project
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<form onSubmit={onSubmit}>
							<div className='mb-3'>
								<label className='form-label'>Name</label>
								<input
									type='text'
									className='form-control'
									id='name'
									value={name}
									onChange={(e) => setName(e.target.value)}
								></input>

								<label className='form-label'>Description</label>
								<input
									type='description'
									className='form-control'
									id='description'
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								></input>
							</div>
							<button
								type='submit'
								data-bs-dismiss='modal'
								className='btn btn-primary'
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
