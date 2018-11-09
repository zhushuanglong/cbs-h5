let domain = '';
if(process.env.NODE_ENV === 'production') {
  domain = 'http://api.cucoe.net'
} else {
  domain = 'http://api.cucoe.net'
}
export default domain