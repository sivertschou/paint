const getCircles = (colors: String[], index: number) => {
  const iterations = [
    '<circle class="cls-1" cx="250" cy="329" r="140" />',
    '<circle class="cls-2" cx="511" cy="735" r="159" />',
    '<circle class="cls-3" cx="515" cy="398" r="201" />',
    '<circle class="cls-1" cx="744" cy="278" r="182" />',
  ];

  const content = iterations.filter((_item, i) => i <= index).reduce((combined, item) => `${combined}${item}`, '');

  return `
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <defs>
        <style>.cls-1{fill:${colors[0 % colors.length]};}.cls-2{fill:${colors[1 % colors.length]};}.cls-3{fill:${
    colors[2 % colors.length]
  };}</style>
    </defs>
    <title>Artboard 1</title>
    ${content}
    </svg>`;
};
export default getCircles;
