/**
 * 
 * 
 * @param array 
 * @returns 
 */
function Flat(array) {
  return array
    .reduce((a, b) =>
      a.concat(Array.isArray(b)
        ? Flat(b)
        : b)
      , []
    )
}