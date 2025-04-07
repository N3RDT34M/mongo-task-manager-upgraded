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

// Fonction pour gérer le tri
function setupTri() {
    const selectTri = document.createElement('select');
    selectTri.id = 'tri-select';
    selectTri.className = 'form-select';
    selectTri.innerHTML = `
        <option value="dateCreation">Date de création</option>
        <option value="echeance">Date d'échéance</option>
        <option value="priorite">Priorité</option>
    `;

    const selectOrdre = document.createElement('select');
    selectOrdre.id = 'ordre-select';
    selectOrdre.className = 'form-select';
    selectOrdre.innerHTML = `
        <option value="desc">Décroissant</option>
        <option value="asc">Croissant</option>
    `;

    // Ajouter les sélecteurs à la page
    const container = document.createElement('div');
    container.className = 'row mb-3';
    container.innerHTML = `
        <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text">Trier par</span>
                ${selectTri.outerHTML}
            </div>
        </div>
        <div class="col-md-6">
            <div class="input-group">
                <span class="input-group-text">Ordre</span>
                ${selectOrdre.outerHTML}
            </div>
        </div>
    `;

    document.querySelector('#task-list').parentNode.insertBefore(container, document.querySelector('#task-list'));

    // Gérer les changements de tri
    document.getElementById('tri-select').addEventListener('change', updateTri);
    document.getElementById('ordre-select').addEventListener('change', updateTri);

    // Initialiser les valeurs depuis l'URL ou utiliser les valeurs par défaut
    const urlParams = new URLSearchParams(window.location.search);
    const tri = urlParams.get('tri') || 'dateCreation';
    const ordre = urlParams.get('ordre') || 'desc';
    
    document.getElementById('tri-select').value = tri;
    document.getElementById('ordre-select').value = ordre;

    // Appliquer le tri initial
    updateTri();
}

function updateTri() {
    const tri = document.getElementById('tri-select').value;
    const ordre = document.getElementById('ordre-select').value;
    
    const urlParams = new URLSearchParams(window.location.search);
    
    // Toujours définir le tri et l'ordre, même si ce sont les valeurs par défaut
    urlParams.set('tri', tri);
    urlParams.set('ordre', ordre);

    // Mettre à jour l'URL sans recharger la page
    const nouvelleUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
    window.history.pushState({}, '', nouvelleUrl);
    
    // Récupérer les tâches triées via l'API
    fetch(`/API/tasks?${urlParams.toString()}`)
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Vider la liste actuelle
            
            tasks.forEach(task => {
                const taskElement = document.createElement('li');
                taskElement.className = 'list-group-item';
                taskElement.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="mb-1">${task.titre}</h5>
                            <p class="mb-1">${task.description}</p>
                            <small class="text-muted">
                                <span class="badge bg-${getStatusColor(task.statut)}">${task.statut}</span>
                                <span class="badge bg-${getPriorityColor(task.priorite)}">${task.priorite}</span>
                            </small>
                        </div>
                        <div>
                            <button class="btn btn-primary btn-sm me-2" onclick="viewDetails('${task._id}')">Voir détails</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteTask('${task._id}')">Supprimer</button>
                        </div>
                    </div>
                `;
                taskList.appendChild(taskElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des tâches:', error);
            alert('Erreur lors de la mise à jour de la liste des tâches');
        });
}

function getStatusColor(status) {
    const colors = {
        'à faire': 'secondary',
        'en cours': 'warning',
        'terminée': 'success'
    };
    return colors[status] || 'secondary';
}

function getPriorityColor(priority) {
    const colors = {
        'basse': 'success',
        'moyenne': 'warning',
        'haute': 'danger'
    };
    return colors[priority] || 'secondary';
}

// Appeler setupTri quand le DOM est chargé
document.addEventListener('DOMContentLoaded', setupTri);