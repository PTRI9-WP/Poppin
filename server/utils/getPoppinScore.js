function getPoppinScore(poppinPercentage) {
  let updatedPoppinScore;
  switch (true) {
    case poppinPercentage <= 20:
      updatedPoppinScore = 20;
      break;

    case poppinPercentage <= 40:
      updatedPoppinScore = 40;
      break;

    case poppinPercentage <= 60:
      updatedPoppinScore = 60;
      break;

    case poppinPercentage <= 80:
      updatedPoppinScore = 80;
      break;

    case poppinPercentage <= 100:
      updatedPoppinScore = 100;
      break;
  }
  return updatedPoppinScore;
}

module.exports = getPoppinScore;
