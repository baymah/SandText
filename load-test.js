// import http from 'k6/http';
import { sleep } from 'k6';

// export default function () {
//     // http.get('http://ec2-3-143-191-168.us-east-2.compute.amazonaws.com:3000/v1/api/video?take=20&page=1');
//         // http.get('http://api.edekee.io:80/v1/api/video?take=20&page=1');
//         // http.get('http://localhost:80/v1/auth');
//         http.get('http://app.edekee.io:3000/v1/api/product');
// 	sleep(0.5);
// }


// import http from 'k6/http';
// import { check } from 'k6';
// import { Rate } from 'k6/metrics';

// export const errorRate = new Rate('errors');

// export default function () {
//   const url = 'http://staging.edekee.io/80/v1/api/product';
// //   const params = {
// //     headers: {
// //       'Authorization': 'Token ffc62b27db68502eebc6e90b7c1476d29c581f4d',
// //       'Content-Type': 'application/json',
// //     },
// //   };
//   check(http.get(url), {
//     'status is 200': (r) => r.status == 200,
//   }) || errorRate.add(1);
// }




import http from 'k6/http';
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

// const img1 = open('/path/to/image1.png', 'b');
const img2 = open('/Users/segun/Pictures/subcategories/Hotel.png', 'logo');
// const txt = open('/path/to/text.txt');

export default function () {
//   const fd = new FormData();
//   fd.append('company_name', 'someValue');
//   fd.append('phone', 'anotherValue');
//   fd.append('email', 'anotherValue@gmail.com');
//   fd.append('address', 'anotherValue');
//   fd.append('logistics', 'Gege23456');
//   fd.append('city_id', 1);
//   fd.append('state_id', 1);
//   fd.append('category_id', '5e9eef96-e1f5-47e3-9db3-2bc3cda631aa');
//   fd.append('delivery_status', "dev status");
//   fd.append('logo', http.file(img2, 'Hotel.png', 'image/png'));


//   fd.append('name', 'Cloudinary34');
//   fd.append('brand', 'Claoud and Nat Server45');
//   fd.append('category', 'e9eef96-e1f5-47e3-9db3-2bc3cda631aa');
//   fd.append('shop', 'b79bbfca-1c21-4563-ad7f-c1bead285c92');
//   fd.append('subcategory', '00e8ef16-2ea5-4518-8063-0b7a961b7d5b');
//   fd.append('description', 'CloudService34');
//   fd.append('price', '820000.00');
//   fd.append('quantity', 34);
//   fd.append('currency', "NG");
//   fd.append('colors', ["#000000"]);
//   fd.append('sizes',['S'])

const ty={
    "name":"Cloudinary",
    "brand":"Claoud and Nat Server",
    "category":"5e9eef96-e1f5-47e3-9db3-2bc3cda631aa",
    "shop":"b79bbfca-1c21-4563-ad7f-c1bead285c92",
    "subcategory":"00e8ef16-2ea5-4518-8063-0b7a961b7d5b",
    "description":"CloudService",
    "price":"820000.00",
    "quantity":34,
    "currency":"NG",
    "colors":["#000000"],
    "sizes":["S","M","L","XL","XXL","XXXL"]
}

  const res = http.post('http://app.edekee.io:3000/v1/api/product/create', fd.body(), {
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI4MDQwMzE0LTA1NDMtNGIwMS1iYjcxLWI5ZDM0YTE4ZDM1ZiIsImVtYWlsIjoid2l6a2lkQGdtYWlsLmNvbSIsInBob25lIjoiMDgxMTI4MDAwMTYiLCJpYXQiOjE2NTg3NjAyMjh9.leF6EoJWXFrFLDMKHqb8kbvp4OjKzKS_G39f2t0qoMc',
        'Portal':'web'
    },
  });

  console.log(res,"RESPONSE FROM K6")
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  sleep(1);
}