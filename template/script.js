document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
	const input = document.getElementById("taskInput");
	const taskText = input.value.trim();
	if (taskText == "") return;

	const taskList = document.getElementById("taskList");

	const li = document.createElement("li");
	li.textContent = taskText;

	li.addEventListener("click", () => {
		li.classList.toggle("completed");
		saveTasks();
	});

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "❌";
	deleteButton.onclick = () => {
		li.remove();
		saveTasks();
	};

	li.appendChild(deleteButton);
	taskList.appendChild(li);
	input.value = "";
	saveTasks();
}

function saveTasks() {
	const tasks = [];
	document.querySelectorAll("#taskList li").forEach(li => {
		tasks.push({
			text: li.firstChild.textContent,
			done: li.classList.contains("completed")
		});
	});
	localstorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach(task => {
		const li = document.createElement("li");
		li.textContent = task.text;
		if (task.done) li.classList.add("completed");

		li.addEventListener("click", () => {
			li.classList.toggle("completed");
			saveTasks();
		});

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "❌";
		deleteButton.onclick = () => {
			li.remove();
			saveTasks();
		};

		li.appendChild(deleteButton);
		document.getElementById("taskList").appendChild(li);
	});
}
