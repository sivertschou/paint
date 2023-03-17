import { Painting } from '../types';

const renderPainting = (colors: string[], outline: string, iterations: string[], index: number) => {
  const content = iterations.filter((_item, i) => i < index).reduce((combined, item) => `${combined}${item}`, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
        <defs>
            <style>.cls-1{fill:${colors[0 % colors.length]};}.cls-2{fill:${colors[1 % colors.length]};}.cls-3{fill:${
    colors[2 % colors.length]
  };}.cls-4{fill:${colors[3 % colors.length]};}.outline{fill:${outline};}</style>
        </defs>
        ${content}
    </svg>`;
};

export const dogPainting: Painting = {
  name: 'doge',
  iterations: [
    `<path d="M1683.47,1170.48c-71.265,-3.926 -99.208,-133.041 -139.112,-201.214c-30.874,-52.748 -71.73,-43.945 -61.423,-48.431c50.678,-22.057 43.02,-41.123 69.018,-85.655c10.529,-18.036 188.585,100.531 261.125,123.647c55.504,17.688 151.298,-25.024 174.114,15.051c22.817,40.076 36.166,205.049 -37.214,225.4c-70.5,19.551 -102.487,-19.762 -266.508,-28.798Z" class="cls-1"/>`,
    `<path d="M1238.2,1181.6c-32.243,-11.028 -62.81,-63.027 -44.741,-91.918c20.177,-32.262 42.495,-159.153 109.5,-182.145c32.008,-10.983 20.823,7.897 41.622,15.478c15.888,5.79 43.276,5.602 51.091,6.796c34.7,5.302 63.631,1.311 87.258,-8.972c50.678,-22.057 218.868,295.648 54.847,286.612c-126.405,-6.964 -242.191,-6.223 -299.577,-25.851Z" class="cls-2"/>`,
    `<path d="M1786.63,546.979c-1.683,18.886 -13.81,77.444 -62.814,127.277c-41.618,42.322 -89.796,76.539 -124.515,88.792c-28.396,10.022 -36.85,16.801 -32.972,22.321c7.247,10.318 -18.504,45.059 -11.403,47.954c43.175,17.602 134.703,70.109 188.337,96.486c42.017,20.663 65.183,43.248 131.06,30.417c36.846,-7.176 64.668,2.359 64.677,-30.417c0.007,-26.904 -58.827,-146.872 -65.445,-226.306c-2.961,-35.538 -26.518,-39.556 -44.865,-102.739c-20.79,-71.596 -38.619,-92.398 -42.06,-53.785Z" class="cls-3"/>`,
    `<path d="M1482.01,658.19c-5.288,-1.29 -15.552,8.025 -30.278,16.373c-14.127,8.009 -35.309,10.932 -41.991,18.561c-10.541,12.035 59.719,-6.212 115.508,30.567c35.032,23.096 27.886,30.629 40.717,49.296c6.652,9.677 88.77,-30.398 159.326,-98.608c30.029,-29.031 54.593,-95.513 62.306,-122.836c5.89,-20.867 0.485,-48.531 -14.226,-61.663c-33.965,-30.32 -15.373,-59.785 -54.536,-90.857c-16.286,-12.921 -24.664,-81.415 -45.869,-54.055c-8.511,10.98 -26.422,21.664 -33.862,33.077c-17.006,26.091 -19.873,50.337 -19.873,50.337c0,0 -6.667,56.117 -20.027,80.437c-13.45,24.485 -34.936,53.489 -72.49,68.331c-17.464,6.903 46.692,7.917 39.623,40.047c-14.503,65.912 -60.088,46.905 -84.328,40.993Z" class="cls-2"/>`,
    `<path d="M1500.83,583.177c-36.423,5.063 -32.619,48.895 -28.077,62.755c14.522,21.386 -41.559,35.564 -86.318,55.936c-8.127,3.699 -45.288,-64.924 -64.027,-116.773c-12.974,-35.896 -6.255,-48.815 -19.668,-85.607c-10.459,-28.69 -21.361,-30.278 -29.764,-55.345c-19.197,-57.264 -18.805,-82.019 -18.805,-82.019l62.785,-40.263c-0,-0 57.148,-11.561 93.564,-2.489c34.016,8.474 39.163,-48.151 66.595,-32.221c19.626,11.398 18.518,45.395 41.862,69.203c39.199,39.978 100.249,72.028 100.249,72.028c0,0 -10.497,139.796 -118.396,154.795Z" class="cls-1"/>`,
    `<path d="M944.434,643.78c-27.036,-23.357 8.401,10.409 7.878,61.939c-0.313,30.875 31.781,31.156 22.835,71.549c-8.947,40.394 -13.009,11.671 -16.848,60.79c-3.839,49.119 29.845,33.789 24.023,72.62c-8.989,59.961 -0.762,67.378 -0.682,109.549c0.08,42.17 91.835,27.169 54.696,107.277c-37.139,80.107 155.835,-22.72 155.835,-22.72c-0,0 45.618,-195.183 120.628,-199.525c22.707,-1.314 -2.25,-34.471 -0,-50.912c5.181,-37.87 6.224,-77.079 6.224,-77.079c-0,0 -6.271,-37.892 -17.79,-34.819c-11.675,3.113 -20.687,51.118 -52.262,53.502c-31.574,2.384 -39.627,-15.174 -48.545,-32.903c-8.918,-17.729 9.26,-47.904 -2.17,-38.014c-28.353,24.536 -131.091,-5.772 -173.395,-19.315c-30.729,-9.837 -53.391,-38.583 -80.427,-61.939Z" class="cls-3"/>`,
    `<path d="M1173.48,402.042c-0,-0 37.725,-32.851 74.918,-39.819c18.105,-3.392 19.381,81.476 32.821,97.124c31.856,37.091 29.574,94.411 48.139,139.348c23.502,56.889 63.158,98.392 57.082,103.173c-24.319,19.135 -64.237,75.332 -64.568,75.398c-3.043,0.605 -21.419,-108.238 -110.566,-59.286c-80.411,44.156 -187.766,-12.261 -187.766,-12.261c-0,0 29.555,-104.774 26.489,-166.245c-2.265,-45.402 -39.942,-47.293 -29.326,-68.794c12.411,-25.137 45.906,-15.379 81.134,-26.274c34.928,-10.802 71.643,-42.364 71.643,-42.364Z" class="cls-2"/>`,
    `<path d="M1473.12,923.716c-49.404,10.188 -142.075,10.494 -151.74,-21.993c-9.666,-32.488 -18.521,-109.154 17.042,-147.408c35.564,-38.255 34.41,-63.437 108.805,-55.94c74.394,7.497 108.804,44.754 118.031,78.893c9.227,34.14 -42.734,136.26 -92.138,146.448Z" class="cls-4"/>`,
    `<path d="M1316.96,320.448c-0,-0 3.46,-29.312 11.89,-69.573c7.584,-36.217 19.188,-81.293 35.913,-121.865c18.051,-43.79 42.067,-82.332 73.429,-98.821c23.97,-12.603 68.541,0.853 87.772,35.319c15.658,28.063 25.765,63.71 38.528,105.449c9.631,31.498 35.852,73.623 43.944,105.049c16.782,65.174 123.884,3.866 38.795,97.366c-9.776,10.742 -14.494,34.77 -28.001,52.403c-1.719,2.245 -52.528,-26.494 -104.085,-69.747c-15.473,-12.98 -18.979,-68.948 -43.943,-71.718c-22.812,-2.531 -38.138,42.149 -51.834,37.146c-50,-18.263 -102.408,-1.008 -102.408,-1.008Z" class="cls-4"/>`,
    `<path d="M1173.48,400.319c-0,0 -28.795,27.447 -71.643,43.236c-28.372,10.454 -73.125,3.774 -83.015,23.857c-9.36,19.006 31.325,34.788 32.775,74.996c2.433,67.473 -28.511,163.311 -28.511,163.311c-0,0 -50.861,-33.326 -83.072,-66.057c-18.234,-18.529 14.358,-40.071 -5.927,-56.227c-16.268,-12.956 -36.694,-10.344 -43.414,-20.677c-23.125,-35.566 -2.357,-59.132 -21.321,-93.862c-28.119,-51.497 -45.702,-94.98 -35.07,-109.409c15.141,-20.548 97.465,-7.142 157.714,1.172c45.269,6.246 79.103,-8.278 119.413,1.623c48.293,11.862 62.071,38.037 62.071,38.037Z" class="cls-4"/>`,
    `<g id="Outlines" class="outline">
        <path d="M1177.79,380.517c15.508,-9.032 41.233,-22.232 64.259,-32.514c17.981,-8.029 47.507,-26.837 60.184,-35.095c1.431,-10.555 5.012,-34.83 11.376,-65.225c7.755,-37.035 19.655,-83.12 36.757,-124.608c19.601,-47.549 46.526,-88.766 80.579,-106.67c12.463,-6.553 29.164,-8.215 46.374,-4.349c23.768,5.34 48.436,21.115 62.245,45.864c16.118,28.887 26.684,65.519 39.821,108.484c9.69,31.689 35.992,74.102 44.133,105.718c3.286,12.762 12.013,18.001 20.917,20.954c8.449,2.802 17.173,3.95 24.121,5.58c12.44,2.918 20.671,8.479 24.41,16.149c5.875,6.206 9.797,13.805 11.627,21.948c4.918,7.526 9.532,18.785 13.947,29.811c2.079,5.191 4.159,10.288 6.375,14.583c1.231,2.383 2.187,4.556 3.599,5.677c22.956,18.212 29.193,35.82 34.46,53.452c3.758,12.58 6.564,25.307 20.768,37.986c8.71,7.775 15.198,19.318 18.712,32.275c2.243,2.232 4.22,4.66 5.926,7.24c3.034,2.6 6.368,6.445 9.618,11.829c7.303,12.098 16.288,34.556 25.655,66.815c10.409,35.845 22.693,51.502 31.378,65.59c7.378,11.967 12.624,23.072 14.051,40.199c4.533,54.411 34.374,128.178 51.706,176.619c8.438,23.583 13.795,42.012 13.793,50.984c-0.001,4.179 -0.369,7.888 -1.028,11.192c21.636,1.92 38.292,9.573 47.173,25.17c14.654,25.739 26.467,99.531 15.96,159.214c-7.712,43.81 -27.951,79.303 -62.546,88.897c-30.833,8.551 -54.927,6.988 -84.219,1.181c-39.728,-7.875 -90.018,-24.075 -187.307,-29.435c-12.319,-0.679 -24.865,5.402 -39.536,11.938c-27.741,12.361 -61.046,27.514 -106.152,25.029c-128.187,-7.062 -245.566,-6.761 -303.761,-26.666c-6.735,-2.304 -26.482,-1.296 -50.724,-1.06c-41.792,0.407 -95.222,0.13 -127.463,-10.749c-18.693,-6.307 -31.101,-16.617 -35.743,-29.531c-3.355,-9.333 -3.251,-20.608 2.976,-34.04c6.746,-14.549 8.826,-24.773 6.642,-32.623c-3.169,-11.393 -14.634,-16.042 -24.683,-21.524c-8.774,-4.786 -17.291,-9.554 -23.718,-15.397c-8.815,-8.015 -14.356,-17.843 -14.381,-31.153c-0.081,-43.071 -8.327,-50.645 0.854,-111.887c0.801,-5.341 0.788,-8.922 -0.409,-11.627c-1.248,-2.819 -3.474,-4.546 -5.531,-6.576c-2.063,-2.035 -4.154,-4.133 -6.145,-6.509c-7.321,-8.739 -14.091,-20.857 -12.062,-46.812c2.347,-30.035 5.792,-36.058 8.989,-40.96c2.112,-3.239 4.564,-5.663 8.179,-21.984c3.83,-17.294 -3.481,-24.111 -9.415,-31.695c-7.522,-9.612 -13.957,-19.89 -13.787,-36.645c0.158,-15.632 -3.5,-29.398 -7.323,-39.902c-6.26,-7.603 -9.866,-16.946 -10.582,-26.688c-0.168,-1.226 -0.196,-2.347 -0.132,-3.358c-0.009,-1.697 0.07,-3.401 0.236,-5.104l0,-0.002c-0.943,-8.211 1.321,-16.661 4.134,-24.867c0.795,-2.317 1.608,-4.601 2.089,-6.853c0.235,-1.101 0.4,-2.23 -0.781,-3.17c-9.942,-7.919 -21.889,-8.614 -30.039,-11.751c-7.379,-2.839 -13.011,-6.901 -16.728,-12.619c-13.643,-20.982 -14.657,-38.341 -14.739,-55.66c-0.058,-12.325 0.766,-24.647 -7.195,-39.228c-20.766,-38.03 -35.739,-72.062 -39.215,-94.193c-2.237,-14.252 0.22,-25.055 5.276,-31.917c6.414,-8.704 20.598,-15.105 40.685,-16.668c34.051,-2.65 88.43,5.681 131.695,11.651c21.372,2.949 40.043,0.873 58.131,-0.65c20.821,-1.753 40.961,-2.804 62.868,2.577c33.714,8.281 52.771,22.939 62.666,33.358Zm155.339,-63.659c0.494,2.28 0.477,4.679 -0.1,7.023c-0.103,0.416 -0.201,0.834 -0.295,1.254c-1.093,4.906 -4.461,8.907 -8.94,10.873c-8.717,5.723 -47.022,30.601 -69.046,40.435c-28.743,12.834 -62.408,30.19 -69.688,36.206c-4.183,3.456 -9.863,4.486 -14.994,2.718c-0.558,-0.192 -1.118,-0.382 -1.681,-0.57c-3.604,-1.203 -6.644,-3.682 -8.548,-6.97c-1.403,-2.423 -14.437,-21.16 -52.142,-30.421c-18.403,-4.52 -35.336,-3.26 -52.827,-1.788c-20.224,1.703 -41.104,3.765 -65.001,0.468c-35.504,-4.9 -78.806,-11.668 -110.985,-11.885c-9.576,-0.064 -18.054,0.427 -24.795,1.923c-3.016,0.669 -5.678,0.867 -7.032,2.317c-0.077,0.6 -0.39,3.232 -0.261,5.082c0.243,3.492 1.021,7.47 2.193,11.881c5.232,19.701 17.884,46.454 34.033,76.029c9.033,16.542 10.673,30.914 10.939,44.968c0.283,14.939 -2.001,29.449 9.466,47.396c0.403,0.211 1.436,0.743 2.108,1.002c2.257,0.868 4.805,1.565 7.507,2.329c9.746,2.758 20.815,6.214 30.749,14.125c12.529,9.98 14.246,21.037 12.111,32.658c-0.822,4.474 -2.437,9.093 -4.01,13.732c-1.06,3.124 -2.693,6.168 -2.015,9.258c0.409,1.861 0.472,3.781 0.188,5.666c-0.17,1.122 -0.237,2.251 -0.201,3.368c0.002,0.067 0.004,0.134 0.005,0.201c0.004,0.066 0.008,0.133 0.012,0.199c0.208,3.844 1.64,7.563 4.349,10.384c1.437,1.496 2.561,3.264 3.305,5.2c5.263,13.69 10.573,32.448 10.355,53.958c-0.112,11.049 6.539,16.161 11.454,22.587c9.11,11.914 16.949,25.373 11.013,52.172c-3.177,14.345 -6.016,21.268 -8.301,25.582c-3.8,7.174 -5.958,4.053 -8.225,33.053c-0.676,8.649 -0.072,14.603 1.642,19.008c2.636,6.773 7.571,9.685 11.215,13.606c7.885,8.483 14.452,18.353 11.041,41.101c-8.797,58.682 -0.588,65.941 -0.51,107.211c0.013,6.82 5.729,9.888 11.428,13.377c7.101,4.348 15.226,8.239 22.606,12.889c12.291,7.744 22.508,17.525 27.048,31.648c4.226,13.146 3.775,30.911 -7.83,55.943c-1.928,4.158 -2.963,7.513 -1.925,10.402c1.032,2.871 3.798,4.73 7.086,6.566c7.993,4.462 19.149,7.197 31.836,9.155c38.103,5.882 88.814,3.704 121.164,3.764c16.543,0.03 29.026,1.01 34.614,2.922c56.578,19.351 170.771,18.171 295.395,25.037c39.064,2.152 67.738,-11.675 91.763,-22.38c19.844,-8.841 37.262,-15.505 53.925,-14.587c83.279,4.588 133.042,16.84 170.932,25.486c34.421,7.854 58.039,12.872 90.557,3.854c24.13,-6.692 34.816,-33.726 40.196,-64.284c9.124,-51.829 0.373,-116.052 -12.353,-138.403c-2.126,-3.734 -5.648,-5.849 -9.856,-7.264c-6.566,-2.208 -14.517,-2.753 -23.293,-2.655c-6.813,0.075 -12.885,-4.288 -14.986,-10.769c-1.112,-3.431 -2.401,-6.882 -3.859,-10.34c-1.835,-4.352 -1.595,-9.303 0.653,-13.458c0.958,-1.772 1.116,-4.175 1.117,-7.295c0.002,-9.95 -9.343,-33.466 -20.178,-63.045c-18.023,-49.203 -41.142,-113.096 -45.214,-161.964c-1.23,-14.761 -7.149,-22.806 -14.254,-33.892c-9.115,-14.222 -20.27,-32.13 -30.046,-65.798c-7.21,-24.829 -13.967,-43.269 -19.903,-54.863c-1.89,-3.693 -4.763,-7.715 -5.355,-8.531c-2.274,-1.402 -4.155,-3.368 -5.455,-5.716c-0.987,-1.783 -2.338,-3.385 -4.042,-4.687c-2.991,-2.287 -5.052,-5.581 -5.801,-9.271c-1.651,-8.127 -4.862,-15.788 -10.187,-20.541c-16.203,-14.464 -22.492,-28.694 -27.058,-43.02c-4.921,-15.445 -6.644,-31.273 -26.786,-47.254c-5.919,-4.696 -11.762,-14.474 -16.673,-26.101c-4.906,-11.614 -9.024,-25.548 -14.529,-32.14c-1.881,-2.252 -3.087,-4.99 -3.479,-7.898c-0.506,-3.746 -2.216,-7.286 -5.163,-9.862c-1.558,-1.362 -2.818,-3.011 -3.72,-4.842c-3.72,-0.862 -14.453,-3.358 -22.08,-5.218c-20.838,-5.082 -42.452,-15.352 -50.156,-45.273c-8.043,-31.235 -34.183,-73.071 -43.756,-104.378c-12.388,-40.515 -22.036,-75.175 -37.235,-102.415c-9.268,-16.611 -25.921,-27.067 -41.874,-30.651c-9.273,-2.084 -18.336,-2.003 -25.051,1.528c-28.672,15.074 -49.775,50.938 -66.278,90.972c-16.347,39.655 -27.656,83.723 -35.068,119.121c-6.135,29.301 -9.591,52.686 -10.965,62.792Zm-383.26,319.669c-0.011,1.867 -0.357,3.719 -1.025,5.466c0.488,-1.278 1.081,-3.101 1.025,-5.466Z"/>
        <path d="M1480.46,592.856c5.909,-5.367 19.2,-10.477 33.296,-12.152c13.828,-1.644 27.971,-0.008 35.404,3.806c11.08,5.686 24.353,25.428 26.556,40.942c1.586,11.168 -1.817,20.36 -8.038,26.011c-4.679,4.249 -17.319,9.228 -32.314,11.521c-12.631,1.931 -26.944,2.622 -36.868,1.644c-6.498,-0.64 -11.673,-2.153 -14.982,-3.852c-8.937,-4.586 -15.331,-15.158 -16.195,-28.498c-0.97,-14.962 5.323,-32.322 13.141,-39.422Z"/>
        <path d="M1228.3,704.008c9.019,-1.939 33.565,1.6 48.4,8.578c11.036,5.192 17.171,13.173 18.714,19.48c1.371,5.604 0.006,15.452 -6.152,25.744c-6.027,10.075 -16.271,21.825 -24.719,28.596c-5.705,4.574 -11.205,7.144 -15.145,7.991c-7.197,1.547 -15.929,-0.349 -24.097,-6.573c-10.963,-8.353 -21.418,-25.514 -23.64,-34.593c-2.265,-9.258 -0.317,-22.808 5.545,-32.86c5.033,-8.629 12.637,-14.546 21.094,-16.363Z"/>
        <path d="M1394.9,792.123c-21.007,5.06 -37.355,15.377 -39.88,26.732c-2.525,11.356 8.725,39.885 24.728,41.402c8.805,0.835 33.637,21.864 50.741,14.518c16.286,-6.995 25.016,-42.261 27.663,-46.142c20.485,-30.037 -3.881,-58.388 -18.584,-59.927c-19.778,-2.069 -29.461,19.755 -44.668,23.417Z"/>
    </g>`,
    `<g id="øyne">
        <circle cx="1529.31" cy="602.209" r="12.079" style="fill:#fff;"/>
        <circle cx="1254.17" cy="728.704" r="12.079" style="fill:#fff;"/>
    </g>`,
  ],
  numColors: 4,
  renderContent: renderPainting,
};