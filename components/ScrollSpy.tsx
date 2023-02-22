import { ReactNode, useEffect, useState } from "react";

interface ScrollSpyProp {
  targetID: string;
  baseLineOption?: BaseLineOption;
  elementOption?: ElementOption;
  execOnStart?: boolean;
  activeClassName?: string;
  className?: string;
  children?: ReactNode;
}

export enum BaseLinePositionType {
  TOP,
  MIDDLE,
  BOTTOM,
}

interface BaseLineOption {
  position?: BaseLinePositionType;
  offset?: number;
}

interface ElementOption {
  topOffset?: number;
  bottomOffset?: number;
}

export function ScrollSpy(prop: ScrollSpyProp) {
  const [active, setActive] = useState(false);

  const targetID = prop.targetID;
  const baseLineOption = {
    position: BaseLinePositionType.TOP,
    offset: 0,
    ...prop.baseLineOption,
  };

  const elementOption = {
    topOffset: 0,
    bottomOffset: 0,
    ...prop.elementOption,
  };

  const execOnStart = prop.execOnStart ?? true;
  const activeClassName = prop.activeClassName ?? "";
  const className = prop.className ?? "";

  const onScrollEvent = () => {
    const elementRect: DOMRect = document
      .querySelector("#" + prop.targetID)
      ?.getBoundingClientRect();
    const topScroll =
      elementRect.top + window.scrollY + elementOption.topOffset;
    const bottomScroll =
      elementRect.bottom + window.scrollY + elementOption.bottomOffset;
    const baseLinePos =
      window.scrollY +
      (baseLineOption.position == BaseLinePositionType.TOP
        ? 0
        : baseLineOption.position == BaseLinePositionType.MIDDLE
        ? window.innerHeight / 2
        : window.innerHeight) +
      baseLineOption.offset;

    setActive(topScroll <= baseLinePos && baseLinePos <= bottomScroll);
  };

  const onClickEvent = () => {
    const elementRect: DOMRect = document
      .querySelector("#" + targetID)
      ?.getBoundingClientRect();
    window.scrollTo({
      top: elementRect.top + window.scrollY - baseLineOption.offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", onScrollEvent);
    if (execOnStart) onScrollEvent();
    return () => {
      window.removeEventListener("scroll", onScrollEvent);
    };
  });

  return (
    <div
      className={className + " " + (active ? activeClassName : "")}
      onClick={onClickEvent}
    >
      {prop.children}
    </div>
  );
}
