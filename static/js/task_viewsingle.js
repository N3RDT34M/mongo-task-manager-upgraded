// Fonction pour marquer une sous-tâche comme terminée
function markSubTaskAsComplete(taskId, subTaskId) {
    fetch(`/API/tasks/${taskId}/subtasks/${subTaskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ statut: "terminée" }),
    })
        .then((response) => {
            if (response.ok) {
                alert("Sous-tâche marquée comme terminée.");
                location.reload(); // Recharge la page pour refléter les changements
            } else {
                alert("Erreur lors de la mise à jour de la sous-tâche.");
            }
        })
        .catch((error) => console.error("Erreur:", error));
}

// Fonction pour supprimer une sous-tâche
function deleteSubTask(taskId, subTaskId) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette sous-tâche ?")) {
        fetch(`/API/tasks/${taskId}/subtasks/${subTaskId}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    alert("Sous-tâche supprimée.");
                    location.reload();
                } else {
                    alert("Erreur lors de la suppression de la sous-tâche.");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    }
}

// Fonction pour ajouter une sous-tâche
function addSubTask(taskId) {
    const titre = prompt("Entrez le titre de la nouvelle sous-tâche :");
    if (titre) {
        fetch(`/API/tasks/${taskId}/subtasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ titre }),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Sous-tâche ajoutée.");
                    location.reload();
                } else {
                    alert("Erreur lors de l'ajout de la sous-tâche.");
                }
            })
            .catch((error) => console.error("Erreur:", error));
    }
}

// Fonction pour supprimer un commentaire
function deleteComment(taskId, commentId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
    fetch(`/api/tasks/${taskId}/comments/${commentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Commentaire supprimé.");
          location.reload();
        } else {
          alert("Erreur lors de la suppression du commentaire.");
        }
      })
      .catch((error) => console.error("Erreur:", error));
  }
}

// Fonction pour ajouter un commentaire
function addComment(taskId) {
  const contenu = prompt("Entrez le contenu du commentaire :");
  if (contenu) {
    fetch(`/api/tasks/${taskId}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contenu }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Commentaire ajouté.");
          location.reload();
        } else {
          alert("Erreur lors de l'ajout du commentaire.");
        }
      })
      .catch((error) => console.error("Erreur:", error));
  }
}
