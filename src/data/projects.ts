// Os cases moram no Obsidian, em Content/Cases. Este JSON é gerado pelo
// publish-cases.py — editar case aqui é trabalho que o próximo sync desfaz
import projects from './projects.json';

// Imagem pode ser só o caminho ou { src, caption }. Quem não tem legenda segue
// string pura, então nada precisa ser migrado
export type ProjectImage = string | { src: string; caption: string };

type Section = {
  heading: string;
  body: string;
  images: ProjectImage[];
};

export type Project = {
  title: string;
  description: string;
  year: string;
  category: string;
  location: string;
  industry?: string;
  url?: string;
  cover: string;
  thumbnail: string;
  coverPosition?: string;
  tags: string[];
  challenge: Section;
  result: Section;
};

export const allProjects: Record<string, Project> = projects;

export type ProjectSlug = keyof typeof allProjects;

export function toImage(img: ProjectImage) {
  return typeof img === 'string' ? { src: img, caption: '' } : img;
}
