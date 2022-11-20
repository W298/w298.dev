import { Unity, Blender } from "@icons-pack/react-simple-icons";

export const projectData = [
  {
    category: "Game Development",
    projectCardList: [
      {
        title: "Intersection",
        imgSrc: "/imgs/projectCardImage/intersection.png",
        description: [
          "Traffic Management Simulation Game",
          "Develop with Unity Engine",
        ],
        lastCommit: new Date(),
        tags: [
          { icon: Unity, title: "Unity", color: "black" },
          { icon: Blender, title: "Blender", color: "#d57132" },
        ],
        repo: {
          active: true,
          href: "https://github.com/W298/Intersection",
        },
        notion: {
          active: false,
        },
      },
    ],
  },
  {
    category: "Web Developement",
    projectCardList: [],
  },
  {
    category: "etc",
    projectCardList: [],
  },
];
