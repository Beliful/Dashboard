import ReactDOMServer from 'react-dom/server'
export const createCustomIcon = (icon, color, size=30) => {
  let svgString = ReactDOMServer.renderToString(icon)
  svgString = svgString.replace(/<path/g, `<path fill="${color}"`) // set color of the icon

  return new L.DivIcon({
    html: svgString,
    className: 'custom-icon',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2],
  })
}
