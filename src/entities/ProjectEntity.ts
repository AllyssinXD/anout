class ProjectEntity {
    id: string; // Unique identifier for the project
    name: string; // Project name
    description: string; // Optional description of the project
    ownerId: string; // ID of the user who owns the project
    members: Member[]; // List of users with access to the project
    createdAt: Date; // Date the project was created
    updatedAt: Date; // Last time the project was updated
    lastAccessed: Date; // Optional: Last time the project was accessed
    isArchived: boolean; // Indicates if the project is archived
  
    constructor(
      id: string,
      name: string,
      description: string,
      ownerId: string,
      createdAt: Date,
      updatedAt: Date,
      lastAccessed: Date,
      members: Member[] = [],
      isArchived: boolean = false
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.ownerId = ownerId;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.lastAccessed = lastAccessed;
      this.members = members;
      this.isArchived = isArchived;
    }
  
    // Adds a member to the project
    addMember(userId: string, username: string, role: 'viewer' | 'editor'): void {
      if (!this.members.find((member) => member.user_id === userId)) {
        this.members.push({ user_id: userId, username, role });
      }
    }
  
    // Removes a member from the project
    removeMember(userId: string): void {
      this.members = this.members.filter((member) => member.user_id !== userId);
    }
  
    // Checks if a user has access to the project
    hasAccess(userId: string): boolean {
      return this.ownerId === userId || !!this.members.find((member) => member.user_id === userId);
    }
  
    // Updates the "lastAccessed" timestamp
    updateLastAccessed(): void {
      this.lastAccessed = new Date();
    }
  
    // Archives the project
    archive(): void {
      this.isArchived = true;
    }
  
    // Restores the project from archive
    restore(): void {
      this.isArchived = false;
    }
  }
  
  // Member interface to represent each user's role in the project
  interface Member {
    user_id: string;
    username: string; // ID of the user
    role: 'viewer' | 'editor'; // Role in the project
  }
  
  export default ProjectEntity;