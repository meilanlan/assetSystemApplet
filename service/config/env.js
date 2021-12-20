let ApiUrl = '';

const testUrl = "https://temporary.tallrich.cn/api.php";
const onlineUrl = "";

let imgUrl = "https://temporary.tallrich.cn/"

if (process.env.NODE_ENV === 'development') {
  // 开发环境
  ApiUrl = 'https://temporary.tallrich.cn/api.php';
} else {
  // 生产环境
  ApiUrl = 'https://temporary.tallrich.cn/api.php';
}

export {
  ApiUrl,
  testUrl,
  onlineUrl,
  imgUrl
}