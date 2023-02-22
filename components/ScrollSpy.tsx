import { ReactNode, useEffect, useState } from "react";

interface ScrollSpyProp {
  targetID: string;
  baseLineOption: BaseLineOption;
  elementOption: ElementOption;
  execOnStart: boolean;
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
  position: BaseLinePositionType;
  offset: number;
}

interface ElementOption {
  topOffset: number;
  bottomOffset: number;
}

export function ScrollSpy({
  targetID,
  baseLineOption,
  elementOption,
  execOnStart,
  activeClassName,
  className,
  children,
}: ScrollSpyProp) {
  const [active, setActive] = useState(false);

  const onScrollEvent = () => {
    const elementRect: DOMRect = document
      .querySelector("#" + targetID)
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
      {children}
    </div>
  );
}
