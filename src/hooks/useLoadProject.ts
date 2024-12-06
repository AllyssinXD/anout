import ProjectEntity from "../entities/ProjectEntity";

export default function useLoadProject(project_id: string | undefined): ProjectEntity {
  // Verifica se o project_id foi fornecido e tem um valor válido
  if (!project_id || project_id.trim().length === 0) {
    throw new Error("Project ID is required.");
  }

  // Placeholder para a entidade ProjectEntity
  return new ProjectEntity(
    "1", // ID do projeto
    "Placeholder Project", // Nome do projeto
    "This is a placeholder project.", // Descrição
    "ownerId123", // ID do proprietário
    new Date(), // Data de criação
    new Date(), // Data de atualização
    new Date(), // Último acesso
    [
      { user_id:"1", username: "user123", role: "editor" }, // Membros com papel no projeto
      { user_id:"2", username: "user456", role: "viewer" },
    ],
    false // Status de arquivamento
  );
}