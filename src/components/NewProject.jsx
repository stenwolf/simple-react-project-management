import { useRef } from "react"
import Input from "./Input"
import Modal from "./Modal";

export default function NewProject({ onSave, onCancel }) {
	const modalRef = useRef();
	const titleRef = useRef();
	const descriptionRef = useRef();
	const dueDateRef = useRef();

	const handleSave = () => {
		const title = titleRef.current.value;
		const description = descriptionRef.current.value;
		const dueDate = dueDateRef.current.value;

		if (title.trim() === '' || description.trim() === '' || dueDate.trim() === '') {
			modalRef.current.open();
			return;
		}
		onSave({ title, description, dueDate })
	}

	return (
		<>
			<Modal ref={modalRef} buttonText="Close">
				<h2 className="text-xl font-bold text-stone-700 my-4">
					Invalid Input.
				</h2>
				<p className="text-stone-600 mb-4">
					All fields are required.
				</p>
				<p className="text-stone-600 mb-4">
					Please provide a valid value for every input field.
				</p>
			</Modal>
			<div className="w-[35rem] mt-16">
				<menu className="flex items-center justify-end gap-4 my-4">
					<li>
						<button className="text-stone-800 hover:text-stone-950"
							onClick={onCancel}>
							Cancel
						</button>
					</li>
					<li>
						<button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
							onClick={handleSave}>
							Save
						</button>
					</li>
				</menu>
				<div>
					<Input ref={titleRef} label="Title" type="text" />
					<Input ref={descriptionRef} label="Description" textarea />
					<Input ref={dueDateRef} label="Due Date" type="date" />

				</div>
			</div>
		</>
	)
}