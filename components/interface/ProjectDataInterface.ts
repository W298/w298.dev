export interface CategoryData {
  categoryTitle: string;
  projectCardList: ProjectCardData[];
}

export interface ProjectCardData {
  title: string;
  imgSrc: string;
  description: string[];
  lastCommit: string;
  tags: string[];
  repo: string | null;
  notion: string | null;
  link: string | null;
}
