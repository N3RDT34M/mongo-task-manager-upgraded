// filepath: public/js/tasks.js
document.getElementById('filter').addEventListener('input', function (event) {
    const filterValue = event.target.value.toLowerCase();
    const tasks = document.querySelectorAll('#task-list li');
    tasks.forEach(task => {
        const taskName = task.querySelector('h3').textContent.toLowerCase();
        task.style.display = taskName.includes(filterValue) ? '' : 'none';
    });
});

function viewDetails(taskId) {
    window.location.href = `/dashboard/showTask/${taskId}`;
}

function editTask(taskId) {
    console.log('Modifier la tâche :', taskId);
}

function deleteTask(taskId) {
    console.log('Supprimer la tâche :', taskId);
}

function closeDetails() {
    document.getElementById('task-details').style.display = 'none';
}