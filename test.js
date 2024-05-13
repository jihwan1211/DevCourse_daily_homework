let original = {
  pages: [1, 2, 3],
  title: "Original",
};

// 원본 객체의 얕은 복사본을 생성합니다.
let shallowCopy = { ...original };

let a = shallowCopy.pages[0];

original.pages = [...original.pages]; // 이제 'shallowCopy.pages'는 원본의 'pages'와는 다른 독립된 배열입니다.
shallowCopy.pages[0] = 99;

let b = shallowCopy.pages[0];
console.log(a === b);
