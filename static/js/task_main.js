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

function deleteTask(taskId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
    fetch(`/API/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Tâche supprimée avec succès");
          location.reload(); // Recharge la page pour mettre à jour la liste
        } else {
          alert("Erreur lors de la suppression de la tâche");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de la suppression de la tâche");
      });
  }
}

function closeDetails() {
  document.getElementById("task-details").style.display = "none";
}

document
  .getElementById("add-task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const taskData = {
      titre: document.getElementById("task-name").value,
      description: document.getElementById("task-desc").value,
      statut: "à faire",
      priorite: "moyenne",
      auteur: {
        nom: document.getElementById("task-author-lastname").value,
        prenom: document.getElementById("task-author-firstname").value,
        email: document.getElementById("task-email").value,
      },
    };

    fetch("/API/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Tâche ajoutée avec succès !");
          location.reload(); // Recharge la page pour afficher la nouvelle tâche
        } else {
          throw new Error("Erreur lors de l'ajout de la tâche");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
        alert("Erreur lors de l'ajout de la tâche");
      });
  });