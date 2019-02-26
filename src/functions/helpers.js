const countTrueValues = (state, counter) => {
  const currentValues = Object.values(state)
  for (let i = 0; i < currentValues.length; i++) {
    if (currentValues[i] === true) {
      counter++
    }
  }
  return counter
}
const prepareState = imageData => {
  const newState = {}
  imageData.forEach((obj, i) => {
    newState[`pic_${i + 1}a`] = false
    newState[`pic_${i + 1}b`] = false
  })
  return newState
}
const makePairs = imageData => {
  const pairs = []
  imageData.forEach((obj, i) => {
    pairs.push({ [`pic_${i + 1}a`]: obj.link })
    pairs.push({ [`pic_${i + 1}b`]: obj.link })
  })
  return pairs
}
const shuffle = pairsArr => {
  let currentIndex = pairsArr.length,
    temporaryValue,
    randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = pairsArr[currentIndex]
    pairsArr[currentIndex] = pairsArr[randomIndex]
    pairsArr[randomIndex] = temporaryValue
  }
  return pairsArr
}
const splitArray = arrayToSplit => {
  const rowData = []
  let begin = 0
  let end = 5
  for (let i = 0; i < 4; i++) {
    rowData.push(arrayToSplit.slice(begin, end))
    begin = end
    end += 5
  }
  return rowData
}

export { countTrueValues, prepareState, makePairs, shuffle, splitArray }
