import React from 'react'

const ICONS = {
PERSON: { path: "M24 24c4.42 0 8-3.59 8-8 0-4.42-3.58-8-8-8s-8 3.58-8 8c0 4.41 3.58 8 8 8zm0 4c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z", viewBox: "0 0 48 48" },
ADMIN: { path: "M8 20v14h6V20H8zm12 0v14h6V20h-6zM4 44h38v-6H4v6zm28-24v14h6V20h-6zM23 2L4 12v4h38v-4L23 2z", viewBox: "0 0 48 48" },
SETTINGS: { path: "M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97L9.9 10.1c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z", viewBox: "0 0 48 48" },
SPY: { path: "M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-58.5c11-18.9 17.8-40.6 17.8-64v-.3c39.2-7.8 64-19.1 64-31.7 0-13.3-27.3-25.1-70.1-33-9.2-32.8-27-65.8-40.6-82.8-9.5-11.9-25.9-15.6-39.5-8.8l-27.6 13.8c-9 4.5-19.6 4.5-28.6 0L182.1 3.4c-13.6-6.8-30-3.1-39.5 8.8-13.5 17-31.4 50-40.6 82.8-42.7 7.9-70 19.7-70 33 0 12.6 24.8 23.9 64 31.7v.3c0 23.4 6.8 45.1 17.8 64H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM176 480l-41.6-192 49.6 32 24 40-32 120zm96 0l-32-120 24-40 49.6-32L272 480zm41.7-298.5c-3.9 11.9-7 24.6-16.5 33.4-10.1 9.3-48 22.4-64-25-2.8-8.4-15.4-8.4-18.3 0-17 50.2-56 32.4-64 25-9.5-8.8-12.7-21.5-16.5-33.4-.8-2.5-6.3-5.7-6.3-5.8v-10.8c28.3 3.6 61 5.8 96 5.8s67.7-2.1 96-5.8v10.8c-.1.1-5.6 3.2-6.4 5.8z", viewBox: "0 0 448 512" },
FOOTBALL: { path: "M483.8 179.4C449.8 74.6 352.6 8 248.1 8c-25.4 0-51.2 3.9-76.7 12.2C41.2 62.5-30.1 202.4 12.2 332.6 46.2 437.4 143.4 504 247.9 504c25.4 0 51.2-3.9 76.7-12.2 130.2-42.3 201.5-182.2 159.2-312.4zm-74.5 193.7l-52.2 6.4-43.7-60.9 24.4-75.2 71.1-22.1 38.9 36.4c-.2 30.7-7.4 61.1-21.7 89.2-4.7 9.3-10.7 17.8-16.8 26.2zm0-235.4l-10.4 53.1-70.7 22-64.2-46.5V92.5l47.4-26.2c39.2 13 73.4 38 97.9 71.4zM184.9 66.4L232 92.5v73.8l-64.2 46.5-70.6-22-10.1-52.5c24.3-33.4 57.9-58.6 97.8-71.9zM139 379.5L85.9 373c-14.4-20.1-37.3-59.6-37.8-115.3l39-36.4 71.1 22.2 24.3 74.3-43.5 61.7zm48.2 67l-22.4-48.1 43.6-61.7H287l44.3 61.7-22.4 48.1c-6.2 1.8-57.6 20.4-121.7 0z", viewBox: "0 0 496 512" },
MAIL: { path: "M40 8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm0 28H8V16l16 10 16-10v20zM24 22L8 12h32L24 22z", viewBox: "0 0 48 48"},
SIGNIN: { path: "M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z", viewBox: "0 0 512 512"},
SIGNOUT: { path: "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z", viewBox: "0 0 512 512"},
REGISTER: { path: "M79.18 282.94a32.005 32.005 0 0 0-20.24 20.24L0 480l4.69 4.69 92.89-92.89c-.66-2.56-1.57-5.03-1.57-7.8 0-17.67 14.33-32 32-32s32 14.33 32 32-14.33 32-32 32c-2.77 0-5.24-.91-7.8-1.57l-92.89 92.89L32 512l176.82-58.94a31.983 31.983 0 0 0 20.24-20.24l33.07-84.07-98.88-98.88-84.07 33.07zM369.25 28.32L186.14 227.81l97.85 97.85 199.49-183.11C568.4 67.48 443.73-55.94 369.25 28.32z", viewBox: "0 0 512 512"},
FIRSTAID: { path: "M96 480h320V128h-32V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v48H96v352zm96-384h128v32H192V96zm320 80v256c0 26.51-21.49 48-48 48h-16V128h16c26.51 0 48 21.49 48 48zM64 480H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v352zm288-208v32c0 8.837-7.163 16-16 16h-48v48c0 8.837-7.163 16-16 16h-32c-8.837 0-16-7.163-16-16v-48h-48c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h48v-48c0-8.837 7.163-16 16-16h32c8.837 0 16 7.163 16 16v48h48c8.837 0 16 7.163 16 16z", viewBox: "0 0 512 512" },
SEND: { path: "M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z", viewBox: "0 0 512 512" },
WARNING: { path: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z", viewBox: "0 0 24 24"}
}

const SVGIcon = (props) => {
  return (
  <i className="icon"><svg aria-hidden="true" role="img" data-Tip={props.dataTip} onClick={props.onClick} width={props.width} height={props.height} fill={props.fill} viewBox={props.viewBox}>
    <path d={props.path}></path>
  </svg></i>
  )
}

const SVG = (props) => {
  return (
  <svg aria-hidden="true" role="img" data-Tip={props.dataTip} onClick={props.onClick} width={props.width} height={props.height} fill={props.fill} viewBox={props.viewBox}>
    <path d={props.path}></path>
  </svg>
  )
}

const SVGSpinner = (props) => {
  <svg width={props.width}  height={props.height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"  style="background: none;">
    <circle cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" 
      ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" stroke="#f0edec" stroke-width="10" 
      r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(65.8966 50 50)">
        <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" 
          keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite">
        </animateTransform>
    </circle>
  </svg>
}

// const SVGSpinner = (props) => {
//   return (
//   <svg width={props.width}  height={props.height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;">
//     <g transform="rotate(0 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(30 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(60 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(90 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(120 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(150 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(180 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(210 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(240 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(270 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(300 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
//       </rect>
//       </g><g transform="rotate(330 50 50)">
//       <rect x="47" y="24" rx="9.4" ry="4.8" width="6" height="12" fill={props.fill}>
//         <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
//       </rect>
//     </g>
//   </svg>
//   )
// }

export { SVGIcon, SVG, SVGSpinner, ICONS }