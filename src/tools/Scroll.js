// manage scroll behavior
const scroll = {
  /**
   * Get scroll height of element
   * @param {string} id element id
   * @returns {number} scroll height
   */
  getScrollPos(id) {
    let element = document.getElementById(id);
    if (!element) return null;
    let headerOffset = 180;
    let elementPosition = element.getBoundingClientRect().top;
    return Math.floor(elementPosition + window.pageYOffset - headerOffset);
  },
  scrollToTarget(id) {
    window.scrollTo({
      top: this.getScrollPos(id),
      behavior: "smooth",
    });
  },
  getCurrnetPoint(pointList) {
    for (let i = 0; i < pointList.length; i++) {
      let l = this.getScrollPos(pointList[i].id);
      let r =
        i === pointList.length - 2
          ? document.body.scrollHeight
          : this.getScrollPos(pointList[i + 1].id);
      if (l <= window.scrollY && window.scrollY < r) return pointList[i].id;
    }
  },
};

export default scroll;
