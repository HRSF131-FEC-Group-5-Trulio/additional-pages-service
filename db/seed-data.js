const FORMAT = '.webp';
const generatePaths = () => {
  return new Array(100).fill(0).map((elem, index) => {
    return 'image' + (index % 33 + 1) + FORMAT;
  })
}
const paths = generatePaths();

module.exports = {
  root: 'https://s3-us-west-1.amazonaws.com/fec.hr/',
  paths
}