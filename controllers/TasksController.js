const Task = require("../models/Task");

async function getAllTasks(req, res) {
  try {
    let query = {};

    if (req.query.statut) query.statut = req.query.statut;
    if (req.query.priorite) query.priorite = req.query.priorite;
    if (req.query.categorie) query.categorie = req.query.categorie;
    if (req.query.etiquette) query.etiquettes = req.query.etiquette;
    if (req.query.apres) query.echeance = { $gte: new Date(req.query.apres) };
    if (req.query.avant)
      query.echeance = { ...query.echeance, $lte: new Date(req.query.avant) };
    if (req.query.q) {
      query.$or = [
        { titre: { $regex: req.query.q, $options: "i" } },
        { description: { $regex: req.query.q, $options: "i" } },
      ];
    }

    let sort = {};
    if (req.query.tri) {
      sort[req.query.tri] = req.query.ordre === "desc" ? -1 : 1;
    }

    const tasks = await Task.find(query).sort(sort);
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches", error });
  }
}

async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la tâche", error });
  }
}

async function createTask(req, res) {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de la tâche", error });
  }
}

async function updateTask(req, res) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour de la tâche", error });
  }
}

async function deleteTask(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la tâche", error });
  }
}

async function getAllSubTasks(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json(task.sousTaches);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des sous-tâches",
        error,
      });
  }
}

async function getSubTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    const subTask = task.sousTaches.find(
      (subTask) => subTask.id === req.params.subTaskId
    );

    if (!subTask) {
      return res.status(404).json({ message: "Sous-tâche non trouvée" });
    }
    res.status(200).json(subTask);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de la sous-tâche",
        error,
      });
  }
}

async function createSubTask(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    const subTask = { ...req.body, statut: req.body.statut ?? "à faire" };
    task.sousTaches.push(subTask);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de la sous-tâche", error });
  }
}

async function updateSubTask(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    const subTask = task.sousTaches.find(subTask => subTask.id === req.params.subTaskId);
    if (!subTask) {
      return res.status(404).json({ message: "Sous-tâche non trouvée" });
    }
    Object.assign(subTask, req.body);
    await task.save();
    res.status(200).json(subTask);
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la mise à jour de la sous-tâche",
        error,
      });
  }
}

async function deleteSubTask(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    let index = task.sousTaches.findIndex(subTask => subTask.id.toString() === req.params.subTaskId);
    
    if (index === -1) {
      return res.status(404).json({ message: "Sous-tâche non trouvée" });
    }

    task.sousTaches.splice(index, 1);
    await task.save();
    res.status(200).json({ message: "Sous-tâche supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de la sous-tâche",
        error,
      });
  }
}

async function getAllComments(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json(task.commentaires);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des commentaires",
        error,
      });
  }
}

async function getCommentById(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    const comment = task.commentaires.find(
      (comment) => comment.id === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }
    res.status(200).json(comment);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération du commentaire",
        error,
      });
  }
}

async function createComment(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    const newComment = {
      ...req.body,
      auteur: /*req.user ??*/ {
        email: "mail@domain.exemple",
        prenom: "Utilisateur",
        nom: "Invité"
      }, // Supposons que l'utilisateur est disponible via req.user
      date: new Date(),
    };

    task.commentaires.push(newComment);
    await task.save();
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création du commentaire", error });
  }
}

async function deleteComment(req, res) {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    const index = task.commentaires.findIndex(
      (comment) => comment.id.toString() === req.params.commentId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    task.commentaires.splice(index, 1);
    await task.save();
    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du commentaire", error });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,

  getAllSubTasks,
  getSubTaskById,
  createSubTask,
  updateSubTask,
  deleteSubTask,

  getAllComments,
  getCommentById,
  createComment,
  deleteComment,
};
