export interface CategoryData {
  categoryTitle: string;
  projectCardList: ProjectCardData[];
}

export interface ProjectCardLinkData {
  repo: string | null;
  notion: string | null;
  link: string | null;
  youtube: string | null;
  velog: string | null;
  itchio: string | null;
  npm: string | null;
}

export interface ProjectCardData {
  title: string;
  pinned: boolean | null;
  released: boolean | null;
  imgSrc: string;
  description: string[];
  tags: string[];
  screenshots: string[];
  link: ProjectCardLinkData;
}
