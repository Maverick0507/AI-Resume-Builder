import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  techStack: { type: [String] }, // Name matches the schema now
  projectLink: { type: String }, // Field to store project link
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
