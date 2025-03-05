import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DetailView from "@/views/DetailView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import CartView from "@/views/CartView.vue";
import ProfileView from "@/views/ProfileView.vue";
import ProductView from "@/views/admin/ProductView.vue";
import RecommendView from "@/views/RecommendView.vue";
import OrderView from "@/views/OrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "홈페이지", description: "홈페이지" },
    },
    {
      path: "/book/detail/:id",
      name: "detail",
      component: DetailView,
      meta: { title: "디테일", description: "상품별 디테일 페이지" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { title: "로그인", description: "로그인 페이지" },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { title: "회원가입", description: "회원가입 페이지" },
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: ProfileView,
      meta: { title: "프로필", description: "프로필 페이지" },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      meta: { title: "장바구니", description: "장바구니 페이지" },
    },
    {
      path: "/order",
      name: "order",
      component: OrderView,
      meta: { title: "주문", description: "주문 페이지" },
    },
    {
      path: "/recommend",
      name: "recommend",
      component: RecommendView,
      meta: { title: "추천", description: "추천 페이지" },
    },
    {
      path: "/admin/product",
      name: "adminProduct",
      component: ProductView,
      meta: { title: "관리자", description: "관리자 상품 설정 페이지" },
    },
  ],
});

export default router;
