let domain = '';
if(process.env.NODE_ENV === 'production') {
  domain = 'https://api.waiwaimall.com'
} else {
  domain = ''
}
export default domain