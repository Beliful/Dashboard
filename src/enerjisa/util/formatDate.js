const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short',
}

export const formatDate = (timestamp) => {
  const date = new Date(timestamp)

  return date.toLocaleString('en-US', options)
}
