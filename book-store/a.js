const obj = {
  a: "obj",
  arr: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
};

const obj2 = { ...obj, arr: [...obj.arr] };
obj2.arr[0] = [...obj2.arr[0]];
// obj2[0] = [...obj2[0]];
// console.log(obj2 === obj);
// false

// console.log(obj2.a === obj.a);
// true -> 이거는 고려할 대상이 아님 왜? js의 원시 타입은 불변성을 지니기 때문에

obj.arr[0].push(10);
console.log(obj2.arr === obj.arr);
// true

console.log("obj : ", obj);
console.log("obj2 : ", obj2);
