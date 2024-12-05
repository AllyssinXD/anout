import ListEntity from "../entities/ListEntity";

export default function useLoadLists(project_id: string | undefined): ListEntity[] {
  // Verifica se o project_id foi fornecido
  if (!project_id || project_id.trim().length === 0) {
    throw new Error("Project ID is required to load lists.");
  }

  // Placeholder: retorna uma lista fictícia
  return [
    new ListEntity(
      "1", // ID da lista
      "My First List", // Nome
      project_id, // ID do projeto associado
      new Date(), // Data de criação
      new Date(), // Data de atualização
      [] // To-Do's associados (vazio por enquanto)
    ),
    new ListEntity(
      "2",
      "Another List",
      project_id,
      new Date(),
      new Date(),
      []
    ),
  ];
}