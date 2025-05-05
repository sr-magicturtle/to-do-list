document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    const input = document.getElementById("taskInput");
    input.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            addTask();
        }
    });
});

function addTask() {
	const input = document.getElementById("taskInput");
	const taskText = input.value.trim();
	if (taskText == "") return;

	const li = document.createElement("li");

    // create checkbox on left 
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;
    checkbox.className = "task-checkbox";

    // label for task text 
    const span = document.createElement("span");
    span.textContent = taskText;
    span.className = "task-text";

    // toggle completed 
    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed", checkbox.checked);
        saveTasks();
    });

    // delete button 
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "❌";
	deleteButton.onclick = () => {
		li.remove();
		saveTasks();
	};

    // put the task tgt 
	li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
	document.getElementById("taskList").appendChild(li);
	input.value = "";
	saveTasks();
}

function saveTasks() {
	const tasks = [];
	document.querySelectorAll("#taskList li").forEach(li => {
		const text = li.querySelector("span").textContent;
		const done = li.querySelector("input[type=checkbox]").checked;
        tasks.push({ text,done });
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
	const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach(task => {
		const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.className = "task-checkbox";

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";
        if (task.done) span.classList.add("completed");


		checkbox.addEventListener("change", () => {
			span.classList.toggle("completed", checkbox.checked);
			saveTasks();
		});

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "❌";
		deleteButton.onclick = () => {
			li.remove();
			saveTasks();
		};

		li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
		document.getElementById("taskList").appendChild(li);
	});
}
