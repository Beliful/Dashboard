import ReactDOMServer from 'react-dom/server'
export const createCustomIcon = (icon, color) => {
  let svgString = ReactDOMServer.renderToString(icon)
  svgString = svgString.replace(/<path/g, `<path fill="${color}"`) // set color of the icon

  return new L.DivIcon({
    html: svgString,
    className: 'custom-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  })
}
