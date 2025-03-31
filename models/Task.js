const mongoose = require("mongoose");

const SubTaskSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  statut: {
    type: String,
    enum: ["à faire", "en cours", "terminée", "annulée"],
    required: true,
  },
  echeance: { type: Date },
});

const CommentSchema = new mongoose.Schema({
  auteur: {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
  },
  date: { type: Date, default: Date.now },
  contenu: { type: String, required: true },
});

const EditsHistorySchema = new mongoose.Schema({
  champModifie: { type: String, required: true },
  ancienneValeur: { type: mongoose.Schema.Types.Mixed },
  nouvelleValeur: { type: mongoose.Schema.Types.Mixed },
  date: { type: Date, default: Date.now },
});

const TasksSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  dateCreation: { type: Date, default: Date.now },
  echeance: { type: Date },
  statut: {
    type: String,
    enum: ["à faire", "en cours", "terminée", "annulée"],
    required: true,
    default: "à faire",
  },
  priorite: {
    type: String,
    enum: ["basse", "moyenne", "haute", "critique"],
    required: true,
    default: "moyenne",
  },
  auteur: {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
  },
  categorie: { type: String },
  etiquettes: { type: [String], default: [] },
  sousTaches: { type: [SubTaskSchema], default: [] },
  commentaires: { type: [CommentSchema], default: [] },
  historiqueModifications: {
    type: [EditsHistorySchema],
    default: [],
  },
});

TasksSchema.index({ statut: 1, priorite: 1, echeance: 1 });

module.exports = mongoose.model("Task", TasksSchema);
