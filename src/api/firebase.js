import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { v4 as uuid } from "uuid";
import { envVars } from "../vars";
const firebaseConfig = {
  apiKey: envVars.REACT_APP_FIREBASE_API_KEY,
  authDomain: envVars.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: envVars.REACT_APP_FIREBASE_FIREBASE_DB_URL,
  projectId: envVars.REACT_APP_FIREBASE_FIREBASE_PROJEXT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

//로그인
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

//로그아웃
export function logout() {
  signOut(auth).catch(console.error);
}

//사용자의 로그인아웃 정보 요청
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    // 1. 사용자가 있는 경우에 (로그인한경우)
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
}

//사용자 권한확인
async function adminUser(user) {
  // 2. 사용자가 어드민 권한을 가지고 있는지 확인!
  // 3. {...user, isAdmin: true/false}
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

//관리자 상품등록
export async function addNewProduct(product, image) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image,
    options: product.options.split(","),
  });
}

//등록된 상품가져오기
export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

//카트에 담긴 상품정보 가져오기
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}
// 카트에 상품 추가및수정
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}
//카트에서 상품 삭제
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
